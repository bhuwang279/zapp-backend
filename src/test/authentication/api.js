import axios from "axios";

const API_URL = "http://localhost:8000/api/graphql";

export const tokenCreate = async (variables) =>
  await axios.post(API_URL, {
    query: `
      mutation ($email: String!, $password: String!) {
        tokenCreate(input:{email: $email, password: $password}) {
          token
        }
      }
    `,
    variables,
  });
