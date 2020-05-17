const ApolloClient = require('apollo-boost').ApolloClient
const  {gql} = require("apollo-boost")
const HttpLink = require("apollo-link-http").HttpLink
const inMemoryCache = require("apollo-cache-inmemory").InMemoryCache

const cache = new inMemoryCache()
const link = new HttpLink({
    uri: "http://localhost:4000",
    introspection: true,
    playground: true
    // headers: {authorization: localStorage.getItem('AUTH_TOKEN')}
})

const client = new ApolloClient({
    cache, link
})

export default client;




