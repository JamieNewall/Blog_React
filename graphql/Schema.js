const {gql} = require('apollo-server')

const typeDefs = gql`

    type Query{
        
        user(email: String): User   
        posts(userId: String): [Post]
        comments(postId: ID! ):[Comment],
        token: String
        getAllPosts: [Post]
        getSpecificPost(postId: String): Post
    }
    
    type Mutation {
        addPost(post: newPost): Post
        addUser(user: ID): User
        addComment(comment: String): Comment
        loginNow(input: credentials): token
        deletePost(postId: String): String
        amendPost(postId: String, post: newPost): Post
        createUserAccount(user: createUser): email
    }
    
  
    input credentials {
    email: String,
    password: String
    }
    
    input createUser {
        email: String,
        password: String
    }
    
    type email {
        email: String
    }
    
    scalar Date

    input newPost {
        postContent: String
        postTitle: String
        tags: [String]
        user: String
    }
    
   
    
    type Post {
        userId: String
        postDate: Date
        postContent: String
        postTitle: String
        tags: [String]
        views: Int
        likes: Int
        _id: String
    }
    
    type User {
        firstName: String,
        lastName: String,
        email: String,
        hashPass: String,
        userName: String!,
       
    }
    
    type Comment {
        user: String
        commentDate: Date
        comment: String
    } 
    
    type token{
        user:  String 
        token: String
        userId: String
    }

`

module.exports = typeDefs