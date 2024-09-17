module.exports.validation=(schema) => {
    return (req, res, next) => {
        const inputData = {...req.body, ...req.query, ...req.params}

        const validationResult = schema.validate(inputData, { abortEarly: false })
        if (validationResult.error?.details) {
            return res.status(400).json({ message: "Validation Err", validationErr: validationResult.error.details})
        }
        return next()
    }
}