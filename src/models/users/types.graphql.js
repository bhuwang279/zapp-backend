import { GraphQLList } from "graphql";
import { GraphQLInt } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { GraphQLNonNull } from "graphql";
import { FILE_TYPE } from "../../helpers/consts";
import { PageInfoType } from "../../helpers/customGraphqlTypes";
import { metaFieldOptions } from "../../helpers/graphql";
import { read } from "../../helpers/permission-scopes";

import { FileType } from "../file/types.graphql";
export const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents user type",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLString },
    phoneNumber: { type: GraphQLInt },

    ...metaFieldOptions(),

    avatar: {
      type: FileType,
      resolve: async (user, args, context) => {
        const files = await user.getFiles();
        const latest = (files || []).find(
          (file) => file.type === FILE_TYPE.AVATAR
        );
        return latest;
      },
    },
  }),
});

export const UserConnectionType = new GraphQLObjectType({
  name: "UserConnection",
  description: "This represents user connection type",
  fields: () => ({
    edges: { type: new GraphQLList(UserType) },
    count: { type: GraphQLInt },
    pageInfo: { type: PageInfoType },
  }),
});

export const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const UpdateUserInputType = new GraphQLInputObjectType({
  name: "UpdateUserInput",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

export const UpdateUserPasswordInputType = new GraphQLInputObjectType({
  name: "UpdateUserPasswordInput",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    newPassword: { type: GraphQLString },
    confirmNewPassword: { type: GraphQLString },
  }),
});

export const SelfUpdateUserPasswordInputType = new GraphQLInputObjectType({
  name: "SelfUpdateUserPasswordInput",
  fields: () => ({
    newPassword: { type: GraphQLString },
    confirmNewPassword: { type: GraphQLString },
  }),
});
