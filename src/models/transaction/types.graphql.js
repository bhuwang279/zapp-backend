import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import { BANKING_APPS } from "../../helpers/consts";
import { PageInfoType } from "../../helpers/ZappGraphQLTypes";
import { metaFieldOptions } from "../../helpers/graphql";
import { toGraphQLEnum } from "../../helpers/utils";
import { getAppURL } from "../../helpers/utils";
const BigInt = require("graphql-bigint");
const BankAppEnum = new GraphQLEnumType({
  name: "BankAppEnum",
  values: toGraphQLEnum(BANKING_APPS),
});
export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  description: "This represents transaction type",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    bankingApp: { type: BankAppEnum },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    refrenceNumber: { type: new GraphQLNonNull(GraphQLString) },
    customerPhoneNumber: { type: BigInt },
    customerName: { type: GraphQLString },
    customerAccountNumber: { type: GraphQLString },
    receiverBank: { type: GraphQLString },
    receiverAccountNumber: { type: GraphQLString },
    transactionDate: { type: new GraphQLNonNull(GraphQLDateTime) },
    customerRemark: { type: GraphQLString },
    merchantRemark: { type: GraphQLString },
    bankingAppLogo: {
      type: GraphQLString,
      resolve: async (transaction, args, context) => {
        switch (transaction.bankingApp) {
          case "MBoB":
            return `${getAppURL()}/static/images/mbob.png`;
          case "GBoB":
            return `${getAppURL()}/static/images/mbob.png`;
          case "MPay":
            return `${getAppURL()}/static/images/mpay.jpeg`;
          case "TPay":
            return `${getAppURL()}/static/images/tpay.png`;
          case "BDB_ePay":
            return `${getAppURL()}/static/images/bdbl-logo.png`;
          default:
            return `${getAppURL()}/static/images/cropped-logo-dummy.png`;
        }
      },
    },

    ...metaFieldOptions(),
  }),
});
export const TransactionInputType = new GraphQLInputObjectType({
  name: "TransactionInput",
  fields: () => ({
    bankingApp: { type: BankAppEnum },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    refrenceNumber: { type: new GraphQLNonNull(GraphQLString) },
    customerPhoneNumber: { type: BigInt },
    customerName: { type: GraphQLString },
    customerAccountNumber: { type: GraphQLString },
    receiverBank: { type: GraphQLString },
    receiverAccountNumber: { type: GraphQLString },
    transactionDate: { type: new GraphQLNonNull(GraphQLDateTime) },
    customerRemark: { type: GraphQLString },
    merchantRemark: { type: GraphQLString },
  }),
});
export const TransactionConnectionType = new GraphQLObjectType({
  name: "TransactionConnection",
  description: "This represents transaction connection type",
  fields: () => ({
    edges: { type: new GraphQLList(TransactionType) },
    count: { type: GraphQLInt },
    pageInfo: { type: PageInfoType },
  }),
});
export const TransactionCountableConnectionType = new GraphQLObjectType({
  name: "TransactionCountableConnection",
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(TransactionType))
      ),
    },
    count: { type: GraphQLInt },
    pageInfo: { type: PageInfoType },
  }),
});
