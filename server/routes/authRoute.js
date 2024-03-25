const express = require('express')
const router = express.Router()
const cors = require('cors')
const {registerUser, loginUser, submitForm, jobpost} = require('../controllers/userController')


// All the routes Defined
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/jobpost', jobpost)

module.exports = router
