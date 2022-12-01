"use strict";

import { graphqlHTTP } from "express-graphql";
import { isDevelopment } from "../helpers/env";
import AppSchema from "../models/schema.graphql";
import expressPlayground from "graphql-playground-middleware-express";

const graphql = (app) => {
  app.use(
    "/api/graphql",
    (req, res, next) => {
      if (req.method === "OPTIONS") {
        return res.status(200).send();
      } else {
        next();
      }
    },
    graphqlHTTP({
      schema: AppSchema,
      graphiql: false,
      customFormatErrorFn: (error) => ({
        message: error.message,
        state: error.originalError && error.originalError.state,
        locations: error.locations,
        path: error.path,
      }),
    })
  );
  app.get("/playground", expressPlayground({ endpoint: "/api/graphql" }));
};

export default graphql;
