const express = require('express')
const router = express.Router()
const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body
    const hash = await bcrypt.hash(password, 10)
    const userInfo = {
      firstName,
      lastName,
      email,
      password: hash,
      username
    }
    const newUser = await User.create(userInfo)
    const user = await User.find({ email })
    const userId = user[0]._id
    const payload = {
      userId
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET)
    res.json({
      success: true,
      newUser,
      token
    })
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id })
    res.json({
      success: true,
      user
    })
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
