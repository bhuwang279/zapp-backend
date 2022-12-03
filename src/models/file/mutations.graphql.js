import {
  isAuthenticated,
  superAdminResolver,
} from "../../helpers/authCombileResolvers";
import { FileInputType, FileType } from "./types.graphql";
import { saveError, ValidationError } from "../../helpers/errors";
import { GraphQLNonNull } from "graphql";
import { logExceptions } from "../../helpers/debug";
import { combineResolvers } from "graphql-resolvers";
import FileService from "./fileService";
import {
  CustomSuccessResponse,
  GraphQLRemoveEntityInput,
} from "../../helpers/ZappGraphQLTypes";
const mutations = {
  createFile: {
    type: FileType,
    description: "Create New File.",
    args: {
      file: { type: new GraphQLNonNull(FileInputType) },
    },
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (parent, args, context) => {
        let file = {};
        try {
          file = await FileService.create(args.file);
        } catch (err) {
          throw saveError(err);
        }

        return file;
      })
    ),
  },
  removeFile: {
    type: CustomSuccessResponse,
    description: "Remove File",
    args: {
      file: {
        type: GraphQLRemoveEntityInput,
      },
    },
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (_, args, context) => {
        const { id } = args.file;
        if (!id) {
          throw new ValidationError("File id is required");
        }
        try {
          await FileService.delete(args.file);
        } catch (e) {
          throw new Error(e);
        }

        return { success: true };
      })
    ),
  },
};

export default mutations;
