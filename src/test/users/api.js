import axios from "axios";

const API_URL = "http://localhost:8000/api/graphql";

export const user = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          name
          email
          role
        }
      }
    `,
      variables,
    },
    {
      headers: {
        "x-token": token,
      },
    }
  );

export const users = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      query ( $cursor: String,$limit: Int) {
        users( cursor: $cursor, limit: $limit) {
          edges{
            id
            name
            email
            role
          }
        }
      }
    `,
      variables,
    },
    {
      headers: {
        "x-token": token,
      },
    }
  );

export const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    {
      headers: {
        "x-token": token,
      },
    }
  );
