import { GraphQLObjectType, GraphQLSchema } from "graphql";
import fs from "fs";

let queries = {};
let mutations = {};

fs.readdirSync(__dirname)
  .filter((e) => {
    return !~e.indexOf("index.js");
  })
  .filter((e) => {
    return !~e.indexOf("graphql.js");
  })
  .map((e) => {
    return e.split(".")[0];
  })
  .sort()
  .map((file) => {
    const types = require(`./${file}/types.graphql`);
    if (typeof types === "function") {
      types();
    }

    return file;
  })
  .map((file) => {
    Object.assign(queries, require(`./${file}/queries.graphql`).default);
    Object.assign(mutations, require(`./${file}/mutations.graphql`).default);
  });
const AppQueryRootType = new GraphQLObjectType({
  name: "AppQuerySchema",
  description: "App Query Schema Root",
  fields: () => queries,
});

const AppMutationRootType = new GraphQLObjectType({
  name: "AppMutationSchema",
  description: "App Mutation Schema Root",
  fields: () => mutations,
});

const AppSchema = new GraphQLSchema({
  query: AppQueryRootType,
  mutation: AppMutationRootType,
});

export default AppSchema;
