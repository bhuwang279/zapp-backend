import { GraphQLInt } from "graphql";
import { GraphQLString } from "graphql";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../../helpers/authCombileResolvers";
import { logExceptions } from "../../helpers/debug";
import models from "../../models";
import {
  TransactionCountableConnectionType,
  TransactionType,
} from "./types.graphql";
import { fromCursorHash, toCursorHash } from "../../helpers/utils";
import { GraphQLID } from "graphql";
import { GraphQLNonNull } from "graphql";
import {
  extractQueryParams,
  withPaginationFields,
} from "../../helpers/graphql";

import { Transaction } from "./model";
import { Sequelize } from "sequelize";

const queries = {
  transactions: {
    type: TransactionCountableConnectionType,
    description: "List of all Transactions",
    args: withPaginationFields({
      bankingApp: { type: GraphQLString },
    }),

    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (_, args, context) => {
        console.log(context.user);
        const { filter, pagination, sort, searchParam } =
          extractQueryParams(args);

        if (pagination.after) {
          filter.id = {
            [Sequelize.Op.lt]: fromCursorHash(pagination.after),
          };
        }
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
        const transactions = await Transaction.readScope(context).findAll({
          where: filter,
          order: [orderBy],
          limit: pagination.first,
        });
        const count = await Transaction.readScope(context).count({
          where: filter,
        });

        const hasNextPage = count > pagination.first;
        const edges = hasNextPage ? transactions.slice(0, -1) : transactions;
        console.log(edges);
        return {
          edges,
          count,
          pageInfo: {
            hasNextPage,
            startCursor: edges.length > 0 ? toCursorHash(edges[0].id) : null,
            endCursor:
              edges.length > 0
                ? toCursorHash(edges[edges.length - 1].id)
                : null,
          },
        };
      })
    ),
  },
  transaction: {
    type: TransactionType,
    description: "Get transaction from id",
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (_, { id }, context) => {
        const transaction = await Transaction.readScope(context).findByPk(id);
        return transaction;
      })
    ),
  },
};

export default queries;
