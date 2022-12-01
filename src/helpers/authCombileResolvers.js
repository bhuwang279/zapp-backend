import { AuthenticationError, AuthrorizationError, AUTH_ERROR } from "./errors";
import { combineResolvers, skip } from "graphql-resolvers";
import { USER_ROLES } from "./consts";

export const isAuthenticated = (parent, args, { user }) =>
  user ? skip : new AuthenticationError(AUTH_ERROR.AUTH_REQUIRED);

export const managementResolver = combineResolvers(
  isAuthenticated,
  (parent, args, { user: { role } }) =>
    role === USER_ROLES.MANAGEMENT
      ? skip
      : new AuthrorizationError(AUTH_ERROR.AUTHORIZATION_REQUIRED)
);

export const superAdminResolver = combineResolvers(
  isAuthenticated,
  (parent, args, { user: { role } }) =>
    role === USER_ROLES.SUPER_ADMIN
      ? skip
      : new AuthrorizationError(AUTH_ERROR.AUTHORIZATION_REQUIRED)
);
