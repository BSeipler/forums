const express = require('express')
const router = express.Router()
const User = require('./../models/userModel')
const Post = require('./../models/postModel')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
  try {
    const { title, section, content } = req.body
    const token = req.headers.authorization.split(' ')[1]
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId
    const postInfo = {
      authorId: userId,
      title,
      section,
      content,
      date: new Date()
    }
    const newPost = await Post.create(postInfo)
    res.json({
      success: true,
      newPost
    })
  } catch (error) {
    console.log(error.message)
  }
})

router.post('/comment', async (req, res) => {
  try {
    const { content, postId } = req.body
    const token = req.headers.authorization.split(' ')[1]
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId
    const post = await Post.updateOne(
      { _id: postId },
      { $push: { comments: { content, date: new Date(), userId } } }
    )
    const user = await User.updateOne(
      { _id: userId },
      { $push: { comments: { content, date: new Date(), postId } } }
    )
    res.json({
      success: true,
      post,
      user
    })
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.id })
    res.json({
      success: true,
      post
    })
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
