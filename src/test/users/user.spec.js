// import { expect } from "chai";
// const { v1: uuidv1 } = require("uuid");
// import { tokenCreateMutation } from "../utils";
// import { user as testUser, users as userList } from "./fixtures";

// import * as userApi from "./api";
// describe("users", () => {
//   describe("user(id: String!): User", () => {
//     it("returns status 400 with AUTH ERROR if token is invalid", async () => {
//       try {
//         const result = await userApi.user(
//           { id: "334d8470-df09-11eb-88af-cf2e55bb5d07" },
//           ""
//         );
//       } catch (err) {
//         const {
//           data: { errors },
//         } = err.response;
//         expect(err.response.status).to.eql(400);
//         expect(errors[0].state.code).to.eql("INVALID_TOKEN");
//       }
//     });
//   });
//   describe("user(id: String!): User", () => {
//     it("returns a user when user can be found", async () => {
//       const expectedResult = {
//         data: {
//           user: {
//             ...testUser,
//           },
//         },
//       };

//       const token = await tokenCreateMutation(
//         "akbarykhan@gmail.com",
//         "P@ssw0rd"
//       );

//       const result = await userApi.user(
//         { id: "334d8470-df09-11eb-88af-cf2e55bb5d07" },
//         token
//       );
//       expect(result.data).to.eql(expectedResult);
//     });
//     it("returns null when user cannot be found", async () => {
//       const expectedResult = {
//         data: {
//           user: null,
//         },
//       };
//       const token = await tokenCreateMutation(
//         "akbarykhan@gmail.com",
//         "P@ssw0rd"
//       );

//       const result = await userApi.user({ id: uuidv1() }, token);

//       expect(result.data).to.eql(expectedResult);
//     });
//   });

//   describe("users(limit: Int): UserConnection", () => {
//     it("returns list of users", async () => {
//       const expectedResult = {
//         data: {
//           users: {
//             edges: [...userList],
//           },
//         },
//       };
//       const token = await tokenCreateMutation(
//         "akbarykhan@gmail.com",
//         "P@ssw0rd"
//       );

//       let result = null;
//       try {
//         result = await userApi.users({ cursor: null, limit: 1 }, token);
//       } catch (e) {
//         console.log(e);
//       }

//       expect(result.data).to.eql(expectedResult);
//     });
//   });

//   // describe("deleteUser(id: String!): Boolean!", () => {
//   //   it("returns an error because only admins can delete a user", async () => {
//   //     const {
//   //       data: {
//   //         data: {
//   //           signIn: { token },
//   //         },
//   //       },
//   //     } = await userApi.signIn({
//   //       login: "ujpradhan",
//   //       password: "P@ssw0rd",
//   //     });

//   //     const {
//   //       data: { errors },
//   //     } = await userApi.deleteUser(
//   //       { id: "3fc2b4c0-45c9-11eb-b5dd-ed1726aa30f5" },
//   //       token
//   //     );

//   //     expect(errors[0].code).to.eql("AUTHORIZATION_REQUIRED");
//   //   });
//   // });
// });
