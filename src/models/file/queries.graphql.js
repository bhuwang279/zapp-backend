import { GraphQLInt } from "graphql";
import { GraphQLString } from "graphql";
import { combineResolvers } from "graphql-resolvers";
import Sequelize from "sequelize";
import { superAdminResolver } from "../../helpers/authCombileResolvers";
import { logExceptions } from "../../helpers/debug";
import models from "../../models";
import { FileConnectionType, FileType } from "./types.graphql";
import { fromCursorHash, toCursorHash } from "../../helpers/utils";
import { GraphQLID } from "graphql";
import { GraphQLNonNull } from "graphql";

const queries = {
  files: {
    type: FileConnectionType,
    description: "List of all files",
    args: {
      cursor: {
        type: GraphQLString,
      },
      limit: {
        type: GraphQLInt,
      },
    },

    resolve: logExceptions(
      combineResolvers(
        superAdminResolver,
        async (_, { cursor, limit = 100 }, context) => {
          const cursorOptions = cursor
            ? {
                where: {
                  createdAt: {
                    [Sequelize.Op.lt]: fromCursorHash(cursor),
                  },
                },
              }
            : {};
          console.log(cursorOptions);

          const files = await models.File.findAll({
            order: [["createdAt", "ASC"]],
            limit: limit + 1,
            ...cursorOptions,
          });
          const count = models.File.count();
          const hasNextPage = files.length > limit;
          const edges = hasNextPage ? files.slice(0, -1) : files;
          return {
            edges,
            count,
            pageInfo: {
              hasNextPage,
              endCursor:
                edges.length > 0
                  ? toCursorHash(edges[edges.length - 1].createdAt.toString())
                  : null,
            },
          };
        }
      )
    ),
  },
  file: {
    type: FileType,
    description: "Get file from id",
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: logExceptions(
      combineResolvers(superAdminResolver, async (_, { id }, context) => {
        return models.File.findByPk(id);
      })
    ),
  },
};

export default queries;
