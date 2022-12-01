import { allBankingApps, BANKING_APPS } from "../../helpers/consts";
import { defaultScopeOptions, SCOPE } from "../../helpers/permission-scopes";
import { DataTypes, pg } from "../../helpers/sequelize";

const Transaction = pg.define(
  "transaction",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    bankingApp: {
      type: DataTypes.ENUM(allBankingApps()),
      allowNull: false,
      defaultValue: BANKING_APPS.MBOB,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    refrenceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    customerPhoneNumber: {
      type: DataTypes.BIGINT,
    },
    customerName: {
      type: DataTypes.STRING,
    },
    customerAccountNumber: {
      type: DataTypes.STRING,
    },
    receiverBank: {
      type: DataTypes.STRING,
    },
    receiverAccountNumber: {
      type: DataTypes.STRING,
    },
    receiverName: {
      type: DataTypes.STRING,
    },
    transactionDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    customerRemark: {
      type: DataTypes.STRING,
    },
    merchantRemark: {
      type: DataTypes.STRING,
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: null,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn("now"),
    },

    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    tableName: "transaction",
    defaultScope: defaultScopeOptions(),
  }
);

Transaction.associate = function (Model) {
  Transaction.belongsTo(Model.User, {
    foreignKey: "ownerId",
    as: "owner",
  });
};

Transaction.scopes = (Model) => {
  return {
    [SCOPE.READ]: (context) => ({
      where: {
        $or: {
          ownerId: { $eq: context.user.id },
        },
      },
    }),
    [SCOPE.WRITE]: (context) => ({
      where: {
        $or: {
          ownerId: { $eq: context.user.id },
        },
      },
    }),
    [SCOPE.PLATFORM]: () => ({
      include: [],
    }),
  };
};
module.exports = { Transaction };
