"use strict";
const PATH = require("path");
const _ = require("lodash");
const USER_ROLES = {
  SUPER_ADMIN: "superAdmin",
  MERCHANT_ADMIN: "merchantAdmin",
  USER: "user",
};

const BANKING_APPS = {
  MBOB: "MBoB",
  GBOB: "GBoB",
  MPAY: "MPay",
  TPAYL: "TPay",
  DRUKPAY: "DrukPay",
  BDBEPAY: "BDB_ePay",
};

const FILE_TYPE = {
  DOCUMENT_ATTACHMENT: "document_attachment",
  AVATAR: "avatar",
};

const EMAIL_ADDRESSES = {
  SYSTEM: "bhuwangurung@protonmail.com",
};
const allUserRoles = () => {
  return _.values(USER_ROLES);
};
const allBankingApps = () => {
  return _.values(BANKING_APPS);
};
module.exports = {
  USER_ROLES,
  allUserRoles,
  allBankingApps,
  FILE_TYPE,
  EMAIL_ADDRESSES,
  BANKING_APPS,
};
