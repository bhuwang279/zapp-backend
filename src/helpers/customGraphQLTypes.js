import { GraphQLInt } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import { GraphQLList } from "graphql";
import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { removeEntityFields, successResponse } from "./graphql";
const PageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  description: "Represents Page Info Type",
  fields: () => ({
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    // hasPreviousPage : {type: new GraphQLNonNull(GraphQLBoolean)},
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString },
  }),
});

const NameKeyType = new GraphQLObjectType({
  name: "NameKey",
  description: "Represents Name Key Type",
  fields: () => ({
    name: { type: GraphQLString },
    key: { type: GraphQLString },
  }),
});

const ListConnectionType = new GraphQLObjectType({
  name: "ListConnection",
  description: "Represents List Connection",
  fields: () => ({
    edges: { type: new GraphQLList(NameKeyType) },
    count: { type: GraphQLInt },
  }),
});

const CustomSuccessResponse = new GraphQLObjectType({
  name: "Success",
  fields: successResponse,
});

const GraphQLRemoveEntityInput = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "RemoveEntity",
    fields: removeEntityFields,
  })
);
module.exports = {
  PageInfoType,
  NameKeyType,
  ListConnectionType,
  CustomSuccessResponse,
  GraphQLRemoveEntityInput,
};
