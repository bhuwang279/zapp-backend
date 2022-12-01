import { logExceptions } from "../../helpers/debug";
import { createToken, parseToken } from "../../helpers/jwt";
import { AuthenticationError, AUTH_ERROR } from "../../helpers/errors";
import jwt from "jsonwebtoken";
import { SessionInputType, SessionType } from "./types.graphql";
import { GraphQLNonNull, GraphQLString } from "graphql";
import models from "../index";
import { authenticate } from "../../helpers/auth";
import { User } from "../users/model";

const mutations = {
  createSession: {
    type: SessionType,
    description: "Creates new session for user",
    args: {
      input: { type: new GraphQLNonNull(SessionInputType) },
    },

    resolve: logExceptions(
      async (_, { input: { phoneNumber, password } }, context) => {
        const user = await User.findByPhoneNumber(phoneNumber);
        if (!user) {
          throw new AuthenticationError(
            AUTH_ERROR.USER_NOT_FOUND,
            "Invalid login credentials."
          );
        }
        try {
          await authenticate(user, password);
        } catch (e) {
          console.log(e);
          throw new Error("Invalid login credentials");
        }

        return { token: createToken(user), user };
      }
    ),
  },
  tokenVerify: {
    type: SessionType,
    description: "Verifies  session of a user",
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },

    resolve: logExceptions(async (parent, { token }) => {
      const user = await parseToken(token);
      return user ? { user, token } : { user: null, token: null };
    }),
  },
};

export default mutations;
