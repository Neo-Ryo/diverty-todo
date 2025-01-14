function nameIsString(req, res, next) {
    if (!req.body.name || typeof req.body.name !== 'string') {
        return res
            .status(400)
            .json({ message: 'body.name must be of type string' })
    }
    next()
}

function colorIsString(req, res, next) {
    if (!req.body.color || typeof req.body.color !== 'string') {
        return res
            .status(400)
            .json({ message: 'body.color must be of type string' })
    }
    const reg = new RegExp(
        '(red|green|blue|orange|purple|gray|yellow|pink)',
        'g'
    )
    if (!reg.test(req.body.color)) {
        return res.status(400).json({
            message:
                'body.color must be one of the following colors: red, green, blue, orange, purple, gray, yellow, pink.',
        })
    }
    next()
}

module.exports = { nameIsString, colorIsString }
