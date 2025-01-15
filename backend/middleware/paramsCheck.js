const { Types } = require('mongoose')

function assignTagToTodoMiddleware(req, res, next) {
    if (!req.params || !req.params.todoId || !req.params.tagId) {
        return res.status(400).json({ message: 'Params missing' })
    }
    const { todoId, tagId } = req.params
    const objectId = Types.ObjectId
    if (!objectId.isValid(todoId) || !objectId.isValid(tagId)) {
        return res
            .status(400)
            .json({ message: 'Types of params must be type of object id' })
    }
    next()
}

module.exports = { assignTagToTodoMiddleware }
