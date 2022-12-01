import bcrypt from "bcrypt";
import { allUserRoles, USER_ROLES } from "../../helpers/consts";
import { defaultScopeOptions, SCOPE } from "../../helpers/permission-scopes";
import { ValidationError } from "../../helpers/errors";
import { attachToUser } from "passport-local-sequelize";
import { setPassword } from "../../helpers/auth";
import { DataTypes, pg } from "../../helpers/sequelize";

export const User = pg.define(
  "user",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be null.",
        },
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone Number cannot be null.",
        },
      },
    },
    salt: {
      type: DataTypes.STRING(64),
    },
    hash: {
      type: DataTypes.STRING(1024),
    },
    role: {
      type: DataTypes.ENUM(allUserRoles()),
      allowNull: false,
      defaultValue: USER_ROLES.USER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    tableName: "user",
    defaultScope: defaultScopeOptions(),
  }
);

User.associate = function (Model) {
  User.hasMany(Model.File, {
    foreignKey: "userId",
    as: "files",
  });
};

User.prototype.generatePasswordHash = async function () {
  return await setPassword(this, this.password);
};
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
User.findByEmail = async (email) => {
  if (!email) {
    throw new ValidationError([
      {
        key: "email",
        message: "Email is not valid.",
      },
    ]);
  }
  const where = {
    email: email.toLowerCase(),
  };
  const user = await User.findOne({
    where,
  });

  return user;
};

User.findByPhoneNumber = async (phoneNumber) => {
  if (!phoneNumber) {
    throw new ValidationError([
      {
        key: "phoneNumber",
        message: "Phone Number is not valid.",
      },
    ]);
  }
  let user = await User.findOne({
    where: { phoneNumber },
  });

  return user;
};

User.scopes = (Model) => ({
  [SCOPE.READ]: () => ({}),
  [SCOPE.WRITE]: () => ({}),
  [SCOPE.SUPER_ADMIN_SCOPE]: () => ({}),
});

attachToUser(User, {
  usernameField: "phoneNumber",
  hashField: "hash",
  saltField: "salt",
  iterations: 25000,
});
