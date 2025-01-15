// backend/routes/todos.js

const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
const Tag = require('../models/Tag')
const {
    assignTagToTodoMiddleware,
    filterSearch,
    completedStatusCheck,
} = require('../middleware/paramsCheck')

// GET all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().populate('tags').sort('position').exec()
        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET one todo
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo)
})

// GET search todos
router.get('/search/:filter', filterSearch, async (req, res) => {
    const filter = req.params.filter
    try {
        const todos = await Todo.find({
            title: { $regex: filter, $options: 'i' },
        })
            .populate('tags')
            .sort('position')
            .exec()

        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET filter todos completed
router.get('/completed/:status', completedStatusCheck, async (req, res) => {
    const status = req.params.status
    try {
        const todos = await Todo.find({
            completed: status,
        })
            .populate('tags')
            .sort('position')
            .exec()

        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// CREATE a todo
router.post('/', async (req, res) => {
    try {
        const maxPositionTodo = await Todo.findOne().sort('-position').exec()
        const newPosition = maxPositionTodo ? maxPositionTodo.position + 1 : 1

        const todo = new Todo({
            title: req.body.title,
            position: newPosition,
        })
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// UPDATE a todo
router.patch('/:id', getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title
    }
    if (req.body.completed != null) {
        res.todo.completed = req.body.completed
    }
    try {
        const updatedTodo = await res.todo.save()
        res.json(updatedTodo)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE a todo
router.delete('/:id', getTodo, async (req, res) => {
    try {
        const deletedTodo = await Todo.findById(req.params.id)
        await Todo.deleteOne({ _id: req.params.id })

        // Mettre à jour les positions des todos restants
        await Todo.updateMany(
            { position: { $gt: deletedTodo.position } },
            { $inc: { position: -1 } }
        )

        res.json({ message: 'Deleted Todo' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// REORDER todos
router.put('/reorder', async (req, res) => {
    const { todos } = req.body // Array de todos avec les nouvelles positions

    if (!Array.isArray(todos)) {
        return res.status(400).json({ message: 'Invalid data format' })
    }

    try {
        const bulkOps = todos.map((todo, index) => ({
            updateOne: {
                filter: { _id: todo._id },
                update: { position: index + 1 },
            },
        }))

        await Todo.bulkWrite(bulkOps)
        res.json({ message: 'Order updated successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Assign or Unassign tag to todos
router.put(
    '/:todoId/tags/:tagId',
    assignTagToTodoMiddleware,
    async (req, res) => {
        const { todoId, tagId } = req.params // Array de todos avec les nouvelles positions

        try {
            const todo = await Todo.findById(todoId)?.populate('tags')
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' })
            }
            const tag = await Tag.findById(tagId)
            if (!tag) {
                return res.status(404).json({ message: 'Tag not found' })
            }
            if (
                todo.tags.find((t) => t._id.toString() === tag._id.toString())
            ) {
                todo.tags = todo.tags.filter(
                    (t) => t._id.toString() !== tag._id.toString()
                )
            } else {
                todo.tags.push(tag)
            }
            await todo.save()
            res.json(todo)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
)

// Middleware to get todo by ID
async function getTodo(req, res, next) {
    let todo
    try {
        todo = await Todo.findById(req.params.id)
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.todo = todo
    next()
}

module.exports = router
