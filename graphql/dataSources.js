const {DataSource} = require('apollo-datasource')
const jwt = require('jsonwebtoken')
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt')

class Mongo extends DataSource {

    constructor(store) {
        super();
        this.store = store
    }



    async getUsers(email) {
        let user;
        user = await this.store.user.find({email: email})

        return user[0]
    }

    async getPosts(userId) {
        let posts = await this.store.post.find({user: userId})
        console.log(posts)
        return posts
    }

    async getComments(post) {

        let comments = await this.store.comment.find({postId: post})
        console.log(comments)
        return comments
    }

    async getToken(payload){

        //TODO move to env
        const SECRET_KEY = '53hdkflfj32435345lk423l4j234'

        const jwtToken = jwt.sign({"payload":payload}, SECRET_KEY, {expiresIn: '1 day'})


        return jwtToken;


    }

    async loginUser(email , password) {

        const user = await this.store.user.findOne({email: email})
        console.log(`user is` )
        console.log(user)
        if(user === null || user.length === 0) {
            return null
        }

        const {hashPass, _id} = user
        const response = await this.comparePass(password, hashPass)

        if (response) {
            const jwt = await this.getToken(email)

            await this.store.token.create({user:_id, token:jwt})
            return {jwt, userId: user._id}
        } else {
            return null
        }


    }

    comparePass = (pass, hash) => {
        return bcrypt.compare(pass, hash)
    }


    async createPost(postContent, postTitle, tags, user) {

        console.log(postContent, postTitle, tags, user)
        let post = {
            user:user,
            postDate: Date.now(),
            postContent : postContent,
            postId: uuid(),
            postTitle : postTitle,
            views: 0,
            likes: 0,
            tags: tags
        }

        let res = await this.store.post.create(post)
        return res;
    }

    async getAllPosts() {
        let res = await this.store.post.find({})
        return res
    }



}


module.exports = Mongo