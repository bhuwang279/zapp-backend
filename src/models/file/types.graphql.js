import { GraphQLList } from "graphql";
import { GraphQLInt } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { GraphQLNonNull } from "graphql";
import { PageInfoType } from "../../helpers/ZappGraphQLTypes";
import { metaFieldOptions } from "../../helpers/graphql";
const { GraphQLUpload } = require("graphql-upload");

const COMMON_UPDATE_FIELDS = {
  mimetype: { type: new GraphQLNonNull(GraphQLString) },
  caption: { type: GraphQLString },
  type: { type: GraphQLString },
};

const COMMON_CREATE_FIELDS = {
  ...COMMON_UPDATE_FIELDS,
  path: { type: GraphQLString },
  userId: { type: GraphQLID },
};

export const FileType = new GraphQLObjectType({
  name: "File",
  description: "This represent an File",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    path: { type: GraphQLString },
    caption: { type: GraphQLString },
    type: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    ...metaFieldOptions(),
  }),
});

export const FileConnectionType = new GraphQLObjectType({
  name: "FileConnection",
  description: "This represents file connection type",
  fields: () => ({
    edges: { type: new GraphQLList(FileType) },
    count: { type: GraphQLInt },
    pageInfo: { type: PageInfoType },
  }),
});

export const FileInputType = new GraphQLInputObjectType({
  name: "FileInput",
  fields: () => ({
    ...COMMON_CREATE_FIELDS,
  }),
});
