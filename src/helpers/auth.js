import { USER_ROLES } from "./consts";
import { AUTH_ERROR } from "./errors";

export const isSuperAdmin = (context) =>
  Boolean(context.user) && context.user.role === USER_ROLES.SUPER_ADMIN;

export const isManager = (context) =>
  Boolean(context.user) && context.user.role === USER_ROLES.MANAGEMENT;

export const isUser = (context) =>
  Boolean(context.user) && context.user.role === USER_ROLES.USER;

export const authenticate = async (user, password) =>
  new Promise((resolve, reject) =>
    user.authenticate(password, (err, user, info) => {
      if (user) {
        resolve(user);
      } else {
        console.log(err);
        reject(
          { ...err, message: AUTH_ERROR.INVALID_PASSWORD } || {
            ...info,
            message: AUTH_ERROR.INVALID_PASSWORD,
          }
        );
      }
    })
  );

export const setPassword = async (user, password) =>
  new Promise((resolve, reject) =>
    user.setPassword(password, (err, user, info) => {
      if (user) {
        resolve(user);
      } else {
        reject(err || info);
      }
    })
  );
