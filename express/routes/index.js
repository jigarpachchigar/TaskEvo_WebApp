const express = require('express')
const userRouter = require('../src/auth/auth.route')
const projectRouter = require('../src/project/project.route')

const apiRouter = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/project', projectRouter)

module.exports = apiRouter