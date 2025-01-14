function nameIsString(req, res, next) {
    if (!req.body.name || typeof req.body.name !== 'string') {
        return res
            .status(400)
            .json({ message: 'body.name must be of type string' })
    }
    next()
}

function colorIsHexadecimal(req, res, next) {
    if (!req.body.color || typeof req.body.color !== 'string') {
        return res
            .status(400)
            .json({ message: 'body.color must be of type string' })
    }
    const reg = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$')
    if (!reg.test(req.body.color)) {
        return res.status(400).json({
            message: 'body.color must be an hexadecimal',
        })
    }
    next()
}

module.exports = { nameIsString, colorIsHexadecimal }
