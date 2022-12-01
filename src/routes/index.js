"use strict";
import authRoute from "./auth";
import graphqlRoute from "./graphql";
import fileRoute from "./file";

const routes = (app) => {
  authRoute(app);
  graphqlRoute(app);
  fileRoute(app);
};

export default routes;
