

const resolvers = {

    Query: {

        async user(parent,args, context, info) {

           let user = await context.dataSources.mongo.getUsers(args.email)

            return user
        },

        async posts(parent, args, context, info) {
            let posts = await context.dataSources.mongo.getPosts(args.userId)
            return posts
        },

        async comments(parent, args, context, info) {
            let comments = await context.dataSources.mongo.getComments(args.postId)
            return comments
        },

        async token(parent, args, context, info){
            return await context.dataSources.mongo.getToken();
        }


    },
    Mutation: {
        async loginNow(parent, args, context, info) {

            const jwt = await context.dataSources.mongo.loginUser(args.input.email, args.input.password)
            return {user:args.input.email ,token: jwt}
        }
    }



}










module.exports = resolvers