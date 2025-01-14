// backend/routes/tags.js

const express = require('express')
const router = express.Router()
const { colorIsString, nameIsString } = require('../middleware/bodyCheck')
const Tag = require('../models/Tag')

// GET all tags
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find().exec()
        res.json(tags)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create a tag
// middleware to check if body is present and types are corrensponding
router.post('/', colorIsString, nameIsString, async (req, res) => {
    try {
        const { name, color } = req.body
        const isTagExists = await Tag.findOne({ name })
        if (isTagExists) {
            return res.status(409).json({ message: 'Tag already exists' })
        }
        const newTag = new Tag({ name, color })
        await newTag.save()
        res.status(201).json(newTag)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
