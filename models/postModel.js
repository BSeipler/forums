const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true
}

const postSchema = mongoose.Schema({
  authorId: reqString,
  title: reqString,
  date: Date,
  section: reqString,
  comments: [
    {
      content: reqString,
      date: Date,
      userId: reqString
    }
  ]
})

module.exports = mongoose.model('Post', postSchema)
