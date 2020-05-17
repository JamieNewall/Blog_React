const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')


const resolverMap = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',

        parseValue(value) {
            return new Date(value) // value from client
        },
        serialize(value) {
            return value.getTime() //value sent to client

        },
        parseLiteral(ast) {
            if(ast.kind === Kind.INT) {
                return new Date(ast.value) // ast value always a string format
            }
        }
    })

}

module.exports = resolverMap