const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true
}

const userSchema = mongoose.Schema({
  firstName: reqString,
  lastName: reqString,
  email: reqString,
  password: reqString,
  username: reqString,
  comments: [
    {
      content: reqString,
      date: Date,
      postId: reqString
    }
  ]
})

module.exports = mongoose.model('User', userSchema)
