"use strict";

const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const { GraphQLJSONObject } = require("graphql-type-json");
const { UserType } = require("../users/types.graphql");
const { read } = require("../../helpers/permission-scopes");
const { User } = require("../users/model");

export const EventType = new GraphQLObjectType({
  name: "Event",
  description: "This represent an Event",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },

    userId: { type: GraphQLString },
    meta: { type: GraphQLJSONObject },

    user: {
      type: UserType,
      resolve: async (event, args, context) => {
        let user = {};
        // user = await event.getUser({ scope: read(context) });
        if (event.meta && event.meta.requestedBy) {
          user = await User.findByPk(event.meta.requestedBy);
        }
        return user;
      },
    },
  }),
});

export const EventInputType = new GraphQLInputObjectType({
  name: "EventInput",
  fields: () => ({
    slug: { type: GraphQLString },
  }),
});
