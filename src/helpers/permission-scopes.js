"use strict";

const { isSuperAdmin, isManager } = require("./auth");

const DEFAULT_SCOPE = "defaultScope";
const PLATFORM_SCOPE = "platform";
const MANAGER_SCOPE = "manager";
const WRITE_SCOPE = "write";
const READ_SCOPE = "read";

export const platform = () => [DEFAULT_SCOPE, { method: [PLATFORM_SCOPE] }];

export const manager = () => [DEFAULT_SCOPE, { method: [MANAGER_SCOPE] }];

export const read = (context, override = false) => {
  if (override) {
    return platform();
  }
  if (isSuperAdmin(context)) {
    return platform();
  }
  return [DEFAULT_SCOPE, { method: [READ_SCOPE, context] }];
};

export const write = (context) => {
  if (isSuperAdmin(context)) {
    return platform();
  }
  return [DEFAULT_SCOPE, { method: [WRITE_SCOPE, context] }];
};

export const defaultScopeOptions = () => ({
  where: {
    deletedAt: { $eq: null },
  },
  order: [["createdAt", "DESC"]],
});

export const SCOPE = {
  DEFAULT: DEFAULT_SCOPE,
  PLATFORM: PLATFORM_SCOPE,
  WRITE: WRITE_SCOPE,
  READ: READ_SCOPE,
};
