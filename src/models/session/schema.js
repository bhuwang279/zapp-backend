import {gql} from "apollo-server-express";

export default gql`


    extend type Mutation {

        tokenCreate(input:SessionInput!): Session!
        tokenVerify(token: String!): Session!
    }

  

    type Session {
        user: User!
        token: String!
        errors: [Error!]
    }
    input SessionInput {
        email: String!
        password: String!
    }

`