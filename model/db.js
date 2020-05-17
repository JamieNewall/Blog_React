const mongoose = require('mongoose')

//TODO env variable
mongoose.connect('mongodb+srv://admin:Tiger-DB@cluster0-efnvb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,
useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', () => console.log('Connection Error'))
db.once('open', function() {
    console.log('Connection Successful')
})

module.exports = db


