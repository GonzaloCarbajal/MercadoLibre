const boom = require('@hapi/boom');

function validation(schema, property) {
    //Retorna middleware
    return (req, res, next) => {
        const data = req[property];
        console.log(data)

        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error)); //Quiere decir que el request esta mal, error 400
        }
        next();
    }
}

module.exports = validation;