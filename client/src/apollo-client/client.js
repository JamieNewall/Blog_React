// import {ApolloClient} from ('apollo-boost').ApolloClient
// import React from 'react';
// import ReactDOM from 'react-dom';
// const  {gql} = require("apollo-boost")
// const HttpLink = require("apollo-link-http").HttpLink
// const inMemoryCache = require("apollo-cache-inmemory").InMemoryCache
// const {persistCache} = require('apollo-cache-persist')
// import { ApolloProvider } from '@apollo/react-hooks';
// import App from '../App'
//
//
// const cache = new inMemoryCache()
// const link = new HttpLink({
//     uri: "http://localhost:4000",
//
//     // headers: {authorization: localStorage.getItem('AUTH_TOKEN')}
// })
//
// persistCache({cache, storage:window.localStorage})
//
// const init = async () => {
//     await persistCache({cache, storage:window.localStorage})
//     const client = new ApolloClient({
//         cache, link
//
//     })
//
//     try{
//         cache.writeData({data: {state: 'some local state'}})
//     } catch (error) {
//
//     }
//
//     const ApolloApp = () => (
//         <ApolloProvider>
//             <App/>
//         </ApolloProvider>
//     )
//
//     ReactDOM.render(
//         <ApolloApp/>, document.getElementById('root')
//     )
//
// }
//
//
// init()
//
//
//
//
//
//
//
