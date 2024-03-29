const express = require('express')
const companyRouter = express.Router()
const cors = require('cors')
const {companyRegister, companyEdit , createJobPost} = require('../controllers/companyController')

//Handling Company Creation and Editing Routes
companyRouter.post('/onboarding',companyRegister)
companyRouter.patch('/profile', companyEdit)

//Handling Create JobPost
companyRouter.post('/createJobPost',createJobPost)


module.exports = companyRouter
