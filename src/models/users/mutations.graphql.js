import {
  isAuthenticated,
  superAdminResolver,
} from "../../helpers/authCombileResolvers";
import {
  SelfUpdateUserPasswordInputType,
  UpdateUserInputType,
  UpdateUserPasswordInputType,
  UserInputType,
  UserType,
} from "./types.graphql";
import { validate as validateEmail } from "email-validator";
import {
  AuthenticationError,
  saveError,
  ValidationError,
} from "../../helpers/errors";
import { GraphQLID, GraphQLNonNull } from "graphql";
import { logExceptions } from "../../helpers/debug";
import { combineResolvers } from "graphql-resolvers";
import models from "../index";
import { setPassword } from "../../helpers/auth";
import _ from "lodash";
import { User } from "./model";
import UserService from "./userService";
import {
  CustomSuccessResponse,
  GraphQLRemoveEntityInput,
} from "../../helpers/ZappGraphQLTypes";
import { USER_ROLES } from "../../helpers/consts";
const mutations = {
  createUser: {
    type: UserType,
    description: "Create New User.",
    args: {
      user: { type: new GraphQLNonNull(UserInputType) },
    },
    resolve: logExceptions(
      combineResolvers(superAdminResolver, async (parent, args, context) => {
        const { name, email, password, phoneNumber } = args.user;
        const user = await models.User.build({
          name,
          email,
          password,
          phoneNumber,
          role: USER_ROLES.USER,
        });
        await setPassword(user, password);
        try {
          await user.save({ returning: true });
        } catch (err) {
          console.log(err);
          throw saveError(err);
        }

        return user;
      })
    ),
  },

  updateUser: {
    type: UserType,
    description: "Update user",
    args: {
      user: {
        type: new GraphQLNonNull(UpdateUserInputType),
      },
    },
    resolve: logExceptions(
      combineResolvers(superAdminResolver, async (info, args, context) => {
        try {
          // Lets remove any property which has empty or null value
          _.forOwn(args.user, (value, key) => {
            if (_.isUndefined(value) || _.isNull(value)) {
              delete args.user[key];
            }
          });
          const { id } = args.user;
          const user = await User.findOne({
            where: { id },
          });

          let userUpdate = await UserService.update(args.user);

          return userUpdate.reload();
        } catch (e) {
          console.log(e);
          throw new ValidationError(e);
        }
      })
    ),
  },

  changeUserPassword: {
    type: UserType,
    description: "Update user Password",
    args: {
      user: {
        type: new GraphQLNonNull(UpdateUserPasswordInputType),
      },
    },
    resolve: logExceptions(
      combineResolvers(
        superAdminResolver,
        async (
          info,
          { user: { id, newPassword, confirmNewPassword } },
          context
        ) => {
          try {
            if (newPassword !== confirmNewPassword) {
              throw new ValidationError(
                "New Password and Confirm Password should match"
              );
            }
            let userUpdate = await UserService.updateUserPassword(
              id,
              newPassword
            );

            return userUpdate;
          } catch (e) {
            console.log(e);

            throw new ValidationError(e);
          }
        }
      )
    ),
  },
  selfChangeUserPassword: {
    type: UserType,
    description: "Update user Password",
    args: {
      user: {
        type: new GraphQLNonNull(SelfUpdateUserPasswordInputType),
      },
    },
    resolve: logExceptions(
      combineResolvers(
        isAuthenticated,
        async (
          info,
          { user: { newPassword, confirmNewPassword } },
          context
        ) => {
          try {
            if (newPassword !== confirmNewPassword) {
              throw new ValidationError(
                "New Password and Confirm Password should match"
              );
            }
            let userUpdate = await UserService.updateUserPassword(
              context.user.id,
              newPassword
            );

            return userUpdate;
          } catch (e) {
            console.log(e);

            throw new ValidationError(e);
          }
        }
      )
    ),
  },
  deleteUser: {
    type: CustomSuccessResponse,
    description: "Delete User",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (_, args, context) => {
        const { id } = args;
        if (!id) {
          throw new ValidationError("User id is required");
        }
        try {
          await UserService.delete({ id });
        } catch (e) {
          throw new Error(e);
        }

        return { success: true };
      })
    ),
  },
};

export default mutations;
