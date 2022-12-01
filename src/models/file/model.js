import { ValidationError } from "../../helpers/errors";
import { defaultScopeOptions } from "../../helpers/permission-scopes";
import { DataTypes, pg } from "../../helpers/sequelize";

export const File = pg.define(
  "file",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    caption: {
      type: DataTypes.STRING,
    },
    mimetype: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.TEXT,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
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
    tableName: "file",
  }
);
