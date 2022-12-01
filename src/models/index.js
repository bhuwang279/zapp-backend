import { sequelize, Sequelize } from "../helpers/sequelize";
import _ from "underscore";
const Model = {
  ...require("./users/model"),
  ...require("./file/model"),
  ...require("./transaction/model"),
};
_.each(Model, (model) => {
  if (model.associate) {
    model.associate(Model);
  }
});
_.each(Model, (model) => {
  const scopes = model.scopes ? model.scopes(Model) : [];

  _.each(scopes || {}, (scope, key) => {
    model.addScope(key, scope);
  });
});
export { sequelize };

export default Model;
