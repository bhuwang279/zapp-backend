import { GraphQLNonNull } from "graphql";
import { combineResolvers } from "graphql-resolvers";
import { Transaction } from "./model";
import { isAuthenticated } from "../../helpers/authCombileResolvers";
import { logExceptions } from "../../helpers/debug";
import { saveError } from "../../helpers/errors";
import { TransactionInputType, TransactionType } from "./types.graphql";

const mutations = {
  createTransaction: {
    type: TransactionType,
    description: "Create New Transaction.",
    args: {
      transaction: { type: new GraphQLNonNull(TransactionInputType) },
    },
    resolve: logExceptions(
      combineResolvers(isAuthenticated, async (parent, args, context) => {
        let transaction;
        try {
          console.log(Transaction);
          transaction = await Transaction.writeScope(context).build({
            ...args.transaction,
            ownerId: context.user.id,
          });

          await transaction.save({ returning: true });
        } catch (err) {
          throw saveError(err);
        }

        return transaction;
      })
    ),
  },
};

export default mutations;
