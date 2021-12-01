const express = require('express')

const Middleware = require('../../middleware/jwt')

const AuthController = require('../auth/auth.controller')
 const userRouter = express.Router()
 userRouter.post('/signup',AuthController.signup)
 userRouter.post('/signin',AuthController.signin)
 userRouter.get('/signout',Middleware.authenticateToken,AuthController.signout)
 userRouter.get('/user-list',Middleware.authenticateToken,AuthController.userList)

 userRouter.post('/user-assign-project',Middleware.authenticateToken,AuthController.userAssign)
 userRouter.get('/user-project',Middleware.authenticateToken,AuthController.userProject)

 module.exports = userRouter