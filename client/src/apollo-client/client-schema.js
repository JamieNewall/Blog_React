import gql from 'graphql-tag'


export const typeDefs = gql`
    extend type Query {
        state: String
        isLoggedin: Boolean
        anyState: String
    }
`