// backend/routes/tags.js

const express = require('express')
const router = express.Router()
const Tag = require('../models/Tag')

// GET all tags
router.get('/', async (req, res) => {
    try {
        console.log('TAG REQUEST')

        const tags = await Tag.find().exec()
        res.json(tags)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
