"use strict";
import { GraphQLError } from "graphql";

export const AUTH_ERROR = {
  AUTH_REQUIRED: "AUTH_REQUIRED",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  UN_AUTHORIZED_ACCESS: "UN_AUHTORIZED_ACCESS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  AUTHORIZATION_REQUIRED: "AUTHORIZATION_REQUIRED",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_PASSWORD: "INVALID_PASSWORD",
};

export const USER_ERROR = {
  EMAIL_EXISTS: "EMAIL_EXISTS",
  USERNAME_EXISTS: "USERNAME_EXISTS",
};
export const DATA_VALIDATION_FAILED = "INVALID_DATA";

export const saveError = (error) => {
  return error.errors ? new ValidationError(error.errors) : error;
};

export class ValidationError extends GraphQLError {
  constructor(error) {
    super(error.message || error);
    this.state = {
      code: DATA_VALIDATION_FAILED,
      message: error.message || error,
    };
  }
}

export class AuthenticationError extends GraphQLError {
  constructor(
    code = AUTH_ERROR.AUTH_REQUIRED,
    message = "Authentication is required for this resource."
  ) {
    super();
    this.state = {
      message,
      code,
    };
  }
}

export class UserCreateError extends GraphQLError {
  constructor(
    code = USER_ERROR.EMAIL_EXISTS,
    message = "User exists with provided email."
  ) {
    super(message, code);
    this.state = {
      message,
      code,
    };
  }
}

export class AuthrorizationError extends GraphQLError {
  constructor(code = AUTH_ERROR.AUTHORIZATION_REQUIRED) {
    let message = "Authorization is required for this resource.";
    super(message, code);
    this.state = {
      message,
      code,
    };
  }
}
