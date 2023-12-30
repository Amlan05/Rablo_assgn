
const express = require('express')
const userRouter = express.Router()

const user = require('../Controllers/userController')

userRouter
 .post('/login', user.userLogin)
 .get('/', user.getAllUsers)
 .post('/signup', user.userRegister)

 exports.userRouter = userRouter 