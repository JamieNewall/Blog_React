const mongoose = require('mongoose')
const db = require('./db')


const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    hashPass: String,
    userName: String,
    isVerified: Boolean,

})

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    postDate: mongoose.Schema.Types.Date,
    postContent: {type: String},
    postTitle: {type: String},
    views: Number,
    likes: Number,
    PostId: Number,
    tags: Array
})

// const commentSchema = new mongoose.Schema({
//     postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
//     commentDate: mongoose.Schema.Types.Date,
//     comment: String
// })

const tokenSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    token: mongoose.Schema.Types.Mixed
})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
// const Comment = mongoose.model('Comment', commentSchema)
const Token = mongoose.model('Token', tokenSchema)

const mongoDB = {}
mongoDB.user = User;
mongoDB.post = Post;
// mongoDB.comment = Comment;
mongoDB.token = Token;



module.exports = mongoDB