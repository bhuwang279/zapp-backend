import { GraphQLString } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import { GraphQLNonNull } from "graphql";
import { GraphQLObjectType } from "graphql";
import { UserType } from "../users/types.graphql";

export const SessionType = new GraphQLObjectType({
  name: "Session",
  description: "Represents Session",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
  }),
});

export const SessionInputType = new GraphQLInputObjectType({
  name: "SessionInput",
  description: "Represents Session Input",
  fields: () => ({
    phoneNumber: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});
