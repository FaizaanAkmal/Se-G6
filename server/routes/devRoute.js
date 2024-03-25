const express = require('express')
const router = express.Router()
const cors = require('cors')
const {page1, page2, page3} = require('../controllers/devController')

router.post('/page1',page1)
router.patch('/page2/:id',page2)
router.patch('/page3/:id',page3)

module.exports = router