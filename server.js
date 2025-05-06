const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userSchema')
const Cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()

app.use(Cors())
app.use(express.json())

mongoose
  .connect(
    'mongodb+srv://rijokj199:qa1234@cluster0.gpqq2gm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('mogoose is connected')
  })

app.post('/', async (req, res) => {
  try {
    const password = req.body.password
    // const hashedPassword = await bcrypt.hash(password, 10)
    const userData = await User.create({
      name: req.body.name,
      password: password,
    })

    if (userData) {
      res.status(200).json({ message: 'Signup Completed' })
    } else {
      res.status(404).json({ message: 'Something went Wrong' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error during signUp', error: error.message })
  }
})

app.post('/login', async (req, res) => {
  try {
    const password = req.body.password

    const loginUser = await User.findOne({ name: req.body.name })
    if (!loginUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // const isMatch = await bcrypt.compare(password, loginUser.password)
    
 
    if (password !== loginUser.password ) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(3077, () => {
  console.log('server is running')
})
