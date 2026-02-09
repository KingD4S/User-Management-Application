const Joi = require('joi');

const createUserValidation = (req, res, next) => {
     const schema = Joi.object({
            name: Joi.string().min(1).max(30).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(10).max(10).required(),
            address: Joi.string().min(1).max(30).required()
        });
        const { error } = schema.validate(req.body);
        // console.log(error)
        if (error) {
            return res.status(400).json({
                 message: "Bad request data",
                  error: error.details[0].message 
            });
        }
        next(); 
}

module.exports = {
    createUserValidation,
}