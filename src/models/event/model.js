"use strict";

import { DOCUMENT_ACTIONS } from "../../helpers/consts";

const { Sequelize, DataTypes, pg } = require("../../helpers/sequelize");
const {
  SCOPE,
  defaultScopeOptions,
} = require("../../helpers/permission-scopes");

export const Event = pg.define(
  "event",
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
    slug: {
      type: DataTypes.STRING,
    },
    meta: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    userId: {
      type: DataTypes.UUID,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn("now"),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn("now"),
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    // defaultScope: defaultScopeOptions(),
  }
);

Event.associate = (Model) => {
  Event.belongsTo(Model.User, {
    foreignKey: "userId",
  });
};

Event.scopes = (Model) => ({
  // TODO: Define permissions for Events
  [SCOPE.PLATFORM]: () => ({}),
  [SCOPE.READ]: (context) => ({}),
  [SCOPE.WRITE]: (context) => ({}),
});
