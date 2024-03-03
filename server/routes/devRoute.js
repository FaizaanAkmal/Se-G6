const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test} = require('../controllers/devController')

router.post('/test', async (req, res) =>{
    res.json({mssg:"Success"})
})

module.exports = router