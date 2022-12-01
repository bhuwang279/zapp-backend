"use strict";

const { logExceptions } = require("../../helpers/debug");
const { SessionType } = require("./types.graphql");
const { isAuthenticated } = require("../../helpers/authCombileResolvers");
const { combineResolvers } = require("graphql-resolvers");

const queries = {
  session: {
    type: SessionType,
    description: "Get the current user session.",
    args: {},
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (_, { id }, context) => ({
        user: context.user,
      }))
    ),
  },
};

export default queries;
