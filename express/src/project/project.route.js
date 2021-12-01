const express = require('express')
// import * as Middleware from '../.././middleware/jwt'
const Middleware = require('../../middleware/jwt')
const ProjectController = require('../project/project.controller')
 const projectRouter = express.Router()
 projectRouter.post('/add-project',Middleware.authenticateToken,ProjectController.createProject)

 projectRouter.post('/add-task',Middleware.authenticateToken,ProjectController.assignProject)

 projectRouter.post('/done-task/:id',Middleware.authenticateToken,ProjectController.movetask)

 projectRouter.post('/add-work/:id',Middleware.authenticateToken,ProjectController.addWork)



 module.exports = projectRouter