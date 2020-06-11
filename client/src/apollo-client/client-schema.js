import gql from 'graphql-tag'


export const typeDefs = gql`
    extend type Query {
        state: String
        isLoggedIn: Boolean
        loginWarning: Boolean
        anyState: String
    }
    
    extend type Mutation {
        loginWarning(bool:Boolean):Boolean
        isLoggedInMutation:Boolean
            
    }
`