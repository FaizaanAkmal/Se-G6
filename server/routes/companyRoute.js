const express = require('express')
const companyRouter = express.Router()
const cors = require('cors')
const companyRegister = require('../controllers/companyController')


companyRouter.post('/companyData',companyRegister)

module.exports = companyRouter