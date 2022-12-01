"use strict";

// System imports
const _ = require("lodash");

import { USER_ROLES } from "../../helpers/consts";
// Local imports
import { User } from "./model";

const { setPassword, ROLES_MAP, ROLE } = require("../../helpers/auth");

class UserService {
  static async update(input) {
    const where = UserService._buildUpdateCriteria(input);
    return User.update(input, { returning: true, where })
      .then((self) => User.findByPk(where.id))
      .catch((e) => {
        throw new Error(e);
      });
  }

  static _buildUpdateCriteria(user) {
    const errors = [];
    const where = {};
    // Either id required.
    if (!user.id) {
      errors.push({ key: "id", message: "'id' is required" });
    }
    if (errors.length) {
      throw errors;
    }
    where["id"] = user.id;
    // Delete the id from main input
    delete user.id;
    return where;
  }

  static async findUser(id) {
    const user = await User.findOne({
      raw: true,
      attributes: ["name", "email", "role"],
      where: {
        id,
      },
    });

    return user;
  }

  static async updateUserPassword(userId, password) {
    const user = await User.findOne({
      where: { id: userId },
    });
    await setPassword(user, password);
    await user.save({ returning: true });
    return user;
  }

  static async getSuperUsersEmails() {
    const users = await User.findAll({
      raw: true,
      attributes: ["name", "email"],
      where: {
        role: USER_ROLES.SUPER_ADMIN,
        locked: false,
      },
    });

    return (users || []).map((user) => user.email);
  }

  static delete(user) {
    const where = UserService._buildUpdateCriteria(user);
    return User.update(
      { deletedAt: new Date() },
      {
        where,
      }
    );
  }
}

module.exports = UserService;
