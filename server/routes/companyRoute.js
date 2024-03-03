const express = require('express')
const companyRouter = express.Router()
const cors = require('cors')
const {companyRegister,page2,page3} = require('../controllers/companyController')


companyRouter.post('/companyData',companyRegister)
companyRouter.patch('/page2/:id',page2)
companyRouter.patch('/page3/:id',page3)

module.exports = companyRouter
