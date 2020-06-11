const {ApolloServer} = require("apollo-server");
const typeDefs = require('../graphql/Schema')
const resolvers = require('../graphql/resolvers')
const Mongo = require('../graphql/dataSources')
const gql = require ("graphql-tag");


const { createTestClient } = require('apollo-server-testing');
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const mocha = require("mocha");
const store = require('../model/Schema')

const dataSources = () => ({
    mongo: new Mongo(store)
})


const server = new ApolloServer({
    typeDefs , resolvers, dataSources, context: () => {}
})



const {query, mutate} = createTestClient(server)


describe('resolvers tests', function() {

    it('add post resolver', async function() {
        let mut = gql`
            mutation addPost($newPost:newPost) {
                addPost(post:$newPost) {
                    postTitle
                }
            }
        `
        const res = await mutate({mutation: mut, variables: {newPost:{postContent:'fdfd', postTitle:'fdf', tags:['html']}}})
        console.log(res)
    })


})