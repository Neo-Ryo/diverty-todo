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

function filterSearch(req, res, next) {
    if (!req.params || !req.params.filter) {
        return res.status(400).json({ message: 'Params missing' })
    }
    next()
}

function completedStatusCheck(req, res, next) {
    if (!req.params || !req.params.status) {
        return res.status(400).json({ message: 'Params status missing' })
    }
    const { status } = req.params
    if (status !== 'true' && status !== 'false') {
        return res
            .status(400)
            .json({ message: 'Invalid status. Must be true or false' })
    }
    next()
}

module.exports = {
    assignTagToTodoMiddleware,
    filterSearch,
    completedStatusCheck,
}
