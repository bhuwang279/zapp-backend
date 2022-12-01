"use strict";

const {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");
const {
  extractQueryParams,
  withPaginationFields,
} = require("../../helpers/graphql");
const { protectedGraph } = require("../../helpers/auth");
const { logExceptions } = require("../../helpers/debug");
const { EventType } = require("./types.graphql");
const { Event } = require("./model");
const { combineResolvers } = require("graphql-resolvers");
const {
  superAdminResolver,
  isAuthenticated,
} = require("../../helpers/authCombileResolvers");

const queries = {
  events: {
    type: new GraphQLObjectType({
      name: "Events",
      fields: () => ({
        items: { type: new GraphQLList(EventType) },
        total: { type: GraphQLInt },
      }),
    }),
    description: "List of all Events for the particular entity",
    args: withPaginationFields({
      userId: { type: GraphQLID },
    }),
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (parent, args, context, info) => {
        const { filter: where, pagination } = extractQueryParams(args);
        const items = await Event.findAll({
          where,
          limit: pagination.first,
          offset: pagination.after,
        });

        const total = await Event.count({
          where,
        });

        return {
          items,
          total,
        };
      })
    ),
  },
};
export default queries;
