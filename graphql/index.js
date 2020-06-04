const { ApolloServer } = require("apollo-server");
const typeDefs = require("./Schema");
const resolvers = require("./resolvers");
const Mongo = require("../graphql/dataSources");
const store = require("../model/Schema");


const dataSources = () => ({
  mongo: new Mongo(store),
});

const context = async ({ req }) => {
  const auth = req.headers || "";
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL Server Running on ${url}`);
});

module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  server,
  Mongo,
  store,
};
