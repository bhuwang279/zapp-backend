import { GraphQLInt } from "graphql";
import { GraphQLString } from "graphql";
import { combineResolvers } from "graphql-resolvers";
import Sequelize from "sequelize";
import {
  isAuthenticated,
  superAdminResolver,
} from "../../helpers/authCombileResolvers";
import { logExceptions } from "../../helpers/debug";
import models from "../../models";
import { UserConnectionType, UserType } from "./types.graphql";
import { fromCursorHash, toCursorHash } from "../../helpers/utils";
import { GraphQLID } from "graphql";
import { GraphQLNonNull } from "graphql";
import {
  extractQueryParams,
  withPaginationFields,
} from "../../helpers/graphql";
import { User } from "./model";
import { GraphQLObjectType } from "graphql";
import { GraphQLList } from "graphql";

const queries = {
  users: {
    type: new GraphQLObjectType({
      name: "users",
      fields: () => ({
        items: { type: new GraphQLList(UserType) },
        total: { type: GraphQLInt },
      }),
    }),
    description: "List of all Invoices",
    args: withPaginationFields({
      name: { type: GraphQLID },
      email: { type: GraphQLID },
    }),

    resolve: logExceptions(
      combineResolvers(superAdminResolver, async (_, args, context) => {
        const { filter, pagination, sort, searchParam } =
          extractQueryParams(args);
        const orderBy = [];
        if (sort.sortField) {
          orderBy.push(sort.sortField);
        } else {
          orderBy.push("createdAt");
        }
        if (sort.sortDirection) {
          orderBy.push(sort.sortDirection);
        } else {
          orderBy.push("DESC");
        }
        const items = await User.findAll({
          where: filter,
          order: [orderBy],
          limit: pagination.first,
          offset: pagination.after,
        });
        const total = await User.count({
          where: filter,
        });

        return {
          items,
          total,
        };
      })
    ),
  },
  user: {
    type: UserType,
    description: "Get user from id",
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (_, { id }, context) => {
        return models.User.findByPk(id);
      })
    ),
  },
};

export default queries;
