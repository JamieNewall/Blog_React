const { DataSource } = require("apollo-datasource");
const jwt = require("jsonwebtoken");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

class Mongo extends DataSource {
  constructor(store) {
    super();
    this.store = store;
  }

  async getUsers(email) {
    let user;
    user = await this.store.user.find({ email: email });

    return user[0];
  }

  async getPosts(userId) {
    let posts = await this.store.post.find({ user: userId });
    console.log(posts);
    return posts;
  }

  async getComments(post) {
    let comments = await this.store.comment.find({ postId: post });
    return comments;
  }

  async getToken(payload) {
    const jwtToken = jwt.sign({ payload: payload }, process.env.REACT_APP_SECRET_KEY, {
      expiresIn: "1 day",
    });

    return jwtToken;
  }

  async loginUser(email, password) {
    const user = await this.store.user.findOne({ email: email });

    if (user === null || user.length === 0) {
      return null;
    }

    const { hashPass, _id } = user;
    const response = await this.comparePass(password, hashPass);

    if (response) {
      const jwt = await this.getToken(email);
      await this.store.token.create({ user: _id, token: jwt });
      return { jwt, userId: user._id };
    } else {
      return null;
    }
  }

  comparePass = (pass, hash) => {
    return bcrypt.compare(pass, hash);
  };

  async createPost(postContent, postTitle, tags, user) {
    console.log(postContent, postTitle, tags, user);
    let post = {
      user: user,
      postDate: Date.now(),
      postContent: postContent,
      postId: uuid(),
      postTitle: postTitle,
      views: 0,
      likes: 0,
      tags: tags,
    };

    let res = await this.store.post.create(post);
    return res;
  }

  async getAllPosts() {
    let res = await this.store.post.find({});

    return res;
  }

  async deletePost(postId) {
    let res = await this.store.post.deleteOne({ _id: postId }, function (err) {
      if (err) {
        console.log("error");
        throw err;
      }
    });
    return "deleted post successfully";
  }

  async getSpecificPost(postId) {
    console.log(postId);
    let res = await this.store.post.find({ _id: postId });

    return res;
  }

  async amendPost(postId, post) {
    let { postContent, postTitle, user, tags } = post;
    let res = await this.store.post.update(
      { _id: postId },
      { postContent, postTitle, tags, user }
    );
    return res;
  }

  async createUserAccount(user) {
    let checkUnique = await this.store.user.find({email: user.email})


    if (checkUnique.length > 1) {
      return {email: 'already exists'}
    }

    let {email, password} = user
    const salt = 10

    await bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return {email: 'error'}
      }

      const hashPass = hash
      await this.store.user.create({email, hashPass})

    })



    // const res = await this.store.user.findOne({email})
    // let {hashPass} = res
    // let rEmail = res.email
    // return {email: rEmail, hashPass}

    return {email}

  }



}

module.exports = Mongo;
