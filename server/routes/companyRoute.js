const express = require('express')
const companyRouter = express.Router()
const cors = require('cors')
const {companyRegister,page2,page3} = require('../controllers/companyController')


companyRouter.post('/companyData',companyRegister)
router.patch('/page2/:id',page2)
router.patch('/page3/:id',page3)

module.exports = companyRouter
