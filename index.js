require('dotenv').config()

const express = require('express')
const mongoDB = require('./utils/database')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')

const app = express()

app.use(express.json())
app.use('/users', userRoute)
app.use('/posts', postRoute)

const port = process.env.PORT || 6318

app.listen(port, () => {
  mongoDB()
  console.log(`Listening on port ${port}`)
})
