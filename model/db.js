const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.URI, {useNewUrlParser: true,
useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', () => console.log('Connection Error'))
db.once('open', function() {
    console.log('Connection Successful')


})

module.exports = db


