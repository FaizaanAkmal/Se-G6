const express = require('express')
const devRouter = express.Router()
const cors = require('cors')
const {devRegister, devEdit} = require('../controllers/devController')

devRouter.post('/profile',devRegister)
devRouter.patch('/profile', devEdit)

module.exports = router