"use strict";

const { pipe, invertObj, mapObjIndexed } = require("ramda");
const {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const GraphQLFields = require("graphql-fields");

const extractFields = GraphQLFields;

const extractQueryParams = (args = {}) => {
  const { first, after, sortField, sortDirection, searchParam, ...filter } =
    args;
  return {
    filter,
    pagination: { first, after },
    sort: { sortField, sortDirection },
    searchParam,
  };
};

const paginationFields = () => ({
  first: { type: GraphQLInt },
  after: { type: GraphQLString },
});
const sortFields = () => ({
  sortField: { type: GraphQLString },
  sortDirection: { type: GraphQLString },
});

const metaFieldOptions = () => ({
  createdAt: { type: GraphQLDateTime },
  updatedAt: { type: GraphQLDateTime },
  deletedAt: { type: GraphQLDateTime },
});

const withmetaFieldOptions = (args = {}) => ({
  ...metaFieldOptions(),
  ...args,
});

const withPaginationFields = (args = {}) => ({
  ...paginationFields(),
  ...sortFields(),
  ...args,
  searchParam: { type: GraphQLString },
});

const successResponse = () => ({
  success: { type: GraphQLBoolean },
});

const paginatedResponse = (args = {}) => ({
  ...args,
  count: { type: GraphQLInt },
});

const removeEntityFields = () => ({
  id: { type: GraphQLString },
  slug: { type: GraphQLString },
});

const toGraphQLEnum = (ENUM) =>
  pipe(
    invertObj,
    mapObjIndexed((val, key) => ({ value: key }))
  )(ENUM);

module.exports = {
  extractQueryParams,
  metaFieldOptions,
  paginationFields,
  toGraphQLEnum,
  extractFields,
  withmetaFieldOptions,
  withPaginationFields,
  successResponse,
  removeEntityFields,
  paginatedResponse,
  successResponse,
};
