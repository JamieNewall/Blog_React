const {gql} = require('apollo-server')
const resolverMap = require('./DateResolver')

const typeDefs = gql`

    type Query{
        
        user(email: String): User   
        posts(userId: String): [Post]
        comments(postId: ID! ):[Comment],
        token: String
        getAllPosts: [Post]
    }
    
    type Mutation {
        addPost(post: newPost): Post
        addUser(user: ID): User
        addComment(comment: String): Comment
        loginNow(input: credentials): token
    }
    
  
    input credentials {
    email: String,
    password: String
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
        postContent: String!
        postTitle: String!
        tags: [String]
        views: Int
        likes: Int
        postId: Int
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
    }

`

//TODO figure out how fits into server
const resolverFunctions = {
    Date: resolverMap
}

module.exports = typeDefs