const express = require('express')
const companyRouter = express.Router()
const cors = require('cors')
const { companyRegister, companyEdit } = require('../controllers/companyController')

companyRouter.post('/profile',companyRegister)
companyRouter.patch('/profile', companyEdit)

module.exports = companyRouter
