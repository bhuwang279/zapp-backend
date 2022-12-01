// const { expect } = require("chai");
// import { loginMutation } from "../utils";
// import * as authAPi from "./api";
// describe("Authentication", () => {
//   it("Should return token", async () => {
//     const {
//       data: {
//         data: {
//           tokenCreate: { token },
//         },
//       },
//     } = await authAPi.tokenCreate({
//       email: "akbarykhan@gmail.com",
//       password: "P@ssw0rd",
//     });

//     expect(token).to.be.a("string");
//   });

//   it("Should return invalid password code if password is wrong", async () => {
//     const {
//       data: { errors },
//     } = await authAPi.tokenCreate({
//       email: "akbarykhan@gmail.com",
//       password: "invalidpass",
//     });
//     expect(errors[0].state.code).to.eql("INVALID_PASSWORD");
//   });

//   it("Should return user not found error if wrong username provided", async () => {
//     const {
//       data: { errors },
//     } = await authAPi.tokenCreate({ email: "akbar", password: "dosntmatter" });
//     expect(errors[0].state.code).to.eql("USER_NOT_FOUND");
//   });
// });
