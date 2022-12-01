"use strict";
const { v1: uuidv1 } = require("uuid");
const { USER_ROLES } = require("../src/helpers/consts");
const auth = require("passport-local-authenticate");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        id: uuidv1(),
        name: "Bhuwan Gurung",
        email: "bhuwan@mybhutan.com",
        phoneNumber: "77880794",
        role: USER_ROLES.SUPER_ADMIN,
        hash: "52bb2e53ad31a6c49d327616854d0c30cf9832f70a0136e9999190d5738f056e09d520606fa6ae26d82dde6d89711b6b3637a02374f7c488b9400fd02a419fdf83c717cf77c53a3e15b413bde1a22be8115a000a929059203b7d8414c70460b4c72858ecb8a0b0904a0714279d6d0775ecc7a0a19cd00c16a65a306dabb79bbef073672743feb19c71b3da88243593e2bc047a39febd6f7d8b525937e874e10252a5ad6e534d419904eaba62f187150ed919e94c3e28a9f3b2bf461b1fee1e9de4d2d8396a84c3ae6ea469beebc41ca88379e68457b8a67e7f7143045671d8f7f5f24e929ce1d8fd4fdfb2be5893175909e637b81b1071997cfdfa197704b955ae8f6e6e00357403195ca7c2b78f53df3d64a377a5b86faffd02ddb45d3ef738d67bf73ed1fd6ce2e83be35ccebbd21e27cb4c5c7b887aebbad9534b46fe3787c1e9040cad4c226808f79688654d3583112f995721a328e851fa8d80854ed1f04260228a7941abf59cef8bde7a646cbb8ba3762a0b37ad23e9cc4f3d3a405cbc4427bf9bdd1a9cc7172a2e0fab6f7108168aaac410c7a35a810fef764a9a99c3f700f75a181be199af380b93082d1aa6e68133aa36721269b1daaf64cab7159c8ae3b8a8d5222ea59aac36f06ec3831e6395523ccdc12c084a4cc6c032c54573802e1efa586128abed31684137d9b42bbfbf012efafcebf748b85f628e4e7284",
        salt: "f57b673ba908ad106be7ad059f40f104ca6f8147398f7fb55e3d1e870e3ea65e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
