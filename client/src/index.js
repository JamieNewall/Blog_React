import { ApolloClient } from 'apollo-client'
import App from './App'
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import {typeDefs} from './apollo-client/client-schema'
const  {gql} = require("apollo-boost")
const HttpLink = require("apollo-link-http").HttpLink
const inMemoryCache = require("apollo-cache-inmemory").InMemoryCache
const {persistCache} = require('apollo-cache-persist')


const cache = new inMemoryCache()
const link = new HttpLink({
    uri: "http://localhost:4000",

    // headers: {authorization: localStorage.getItem('AUTH_TOKEN')}
})

const resolvers = {
    Query: {
        async anyState(parent, args, {cache}, info){
            console.log('it was hit')

            const queryResult = await cache.readQuery({
                query: gql`
            query getState {
                state @client
            }
            `
            })
            return queryResult
        }


    }
}

const init = async () => {
    await persistCache({cache, storage:window.localStorage})
    const client = new ApolloClient({
        cache, link,typeDefs,resolvers

    })

    try{
        cache.writeData({data: {state: 'some local state'}})
    } catch (error) {

    }

    const ApolloApp = () => (
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    )

    ReactDOM.render(
        <ApolloApp/>, document.getElementById('root')
    )

}


init()







