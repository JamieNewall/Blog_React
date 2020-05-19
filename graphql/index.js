const {ApolloServer} = require('apollo-server')
const typeDefs = require('./Schema')
const resolvers = require('./resolvers')
const Mongo = require('../graphql/dataSources')
const store = require('../model/Schema')




//import data sources
const dataSources = () => ({
    mongo: new Mongo(store)
})

const context = async ({req}) => {


    //TODO add backend auth to routes
    const auth = req.headers || '';

    // const email = new Buffer(auth, 'base64').toString('ascii')

    // if(! isEmail.validate(email)) return {user: null}




}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    introspection: true,
    playground: true,
})

server.listen({port: process.env.PORT || 4000})
    .then( ({url}) => {
    console.log(`GraphQL Server Running on ${url}`)}
)

module.exports = {
    dataSources,
    context,
    typeDefs,
    resolvers,
    ApolloServer,
    server,
    Mongo,
    store
}