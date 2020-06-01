const db = require('./db')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const mongo = require('./Schema')

const UsersDb = mongo.user
const PostsDb = mongo.post
const CommentDb = mongo.comment
const TokenDb = mongo.token


const createUser = async (firstName, lastName, email, hashPass, userName) => {
        const user = new UsersDb({
            firstName,
            lastName,
            email,
            hashPass,
            userName
        })

        const result = await user.save()
        console.log(result)

}

const getUser = async (email) => {
    const res = await UsersDb.find({email})
    console.log(res)
}


const createPost = async ( postContent, postTitle, user, tags) => {
    const post = await new PostsDb({
        user,
        postDate: Date.now(),
        postContent,
        postTitle,
        views: 0,
        likes: 0,
        tags: tags
    })
    await post.save()

}

const createComment = async (postId, comment) => {
    const newComment = await new CommentDb({
        postId: postId,
        commentDate: Date.now(),
        comment
    })
    await newComment.save()
}

const createToken = async (user, token) => {
    const newToken = new TokenDb({
        user, token
    })

    newToken.save()
}


const getPost = async () => {
    const post = await PostsDb.find().populate('user')
    console.log(post)
}

const getComment = async () => {
    const comment = await CommentDb.find().populate('user')
    console.log(comment)
}

const removeTokens = () => {
    TokenDb.deleteMany({})
    console.log('all tokens deleted')
}

const removePosts = async () => {
    await PostsDb.deleteMany({})
    console.log('all posts deleted')
}



const hashPass = (pass) => {
    const salt = 10
   return bcrypt.hash(pass, salt)
}

const comparePass = (pass, hash) => {
    bcrypt.compare(pass, hash).then(res => {
        console.log(res)
    })
}


const hash = hashPass('mypassword').then(res => {

    return res
})


// removeTokens()

// const ahash = '$2b$10$dDvsmCCxQiHNu7cbcoTaC.k21Ma0zmpWJEaHL9Mb7MZ8.CzQUGZ7a'

// comparePass('mypassword', ahash)

// createUser('Jamie', 'Newall', 'jnewall93@outlook.com', '44ffdfdfd', 'JamesP123')
// createUser('Jamie','Newall','jnewall93@outlook.com','$2b$10$dDvsmCCxQiHNu7cbcoTaC.k21Ma0zmpWJEaHL9Mb7MZ8.CzQUGZ7a','jamesp')
createPost('test content', 'test-1', '5ebc0ce9ac118441684943bd')
createPost('test content', 'test-2', '5ebc0ce9ac118441684943bd')
createPost('test content', 'test-3', '5ebc0ce9ac118441684943bd')
// createComment('5ebc1a3013234b054c6f7809', 'this is the comment')
// createToken('5ebc0ce9ac118441684943bd','TOKEN2299')
// getUser( 'jnewall93@outlook.com')
// removePosts()



