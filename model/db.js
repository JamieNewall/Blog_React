const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'../.env')})

const mongoose = require('mongoose')
const URI = process.env.REACT_APP_URI

mongoose.connect(URI, {useNewUrlParser: true,
useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', () => console.log('Connection Error'))
db.once('open', function() {
    console.log('Connection Successful')


})

module.exports = db


