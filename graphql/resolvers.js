

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
        },

        async getAllPosts(parent, args, context, info) {
            const res = await context.dataSources.mongo.getAllPosts()
            console.log(res)
            return res
        },
        async getSpecificPost(parent, args, context, info){
            const res = await context.dataSources.mongo.getSpecificPost(args.postId)
            return res[0]
        }


    },
    Mutation: {
        async loginNow(parent, args, context, info) {

            const {jwt, userId} = await context.dataSources.mongo.loginUser(args.input.email, args.input.password)
            return {user:args.input.email ,token: jwt, userId:userId}
        },

        async addPost(parent, args, context, info) {
            console.log(`args in resolver: ${args.post}`)
            let post = await context.dataSources.mongo.createPost(args.post.postContent, args.post.postTitle, args.post.tags, args.post.user)

            return post;
        },

        async deletePost(parent,args, context, info){

            let message = await context.dataSources.mongo.deletePost(args.postId)
            console.log(message)
            return message
        },

        async amendPost(parent, args, context, info){
            let res = await context.dataSources.mongo.amendPost(args.postId, args.post)
            return res
        }




}}










module.exports = resolvers