const boom = require('@hapi/boom');

function validation(schema, property) {
    //Retorna middleware (crea middleware de forma dinamica)
    return (req, res, next) => {
        const data = req[property]; //Esto lo saca dinamicamente, digamos si es un post saca la info de body, si es un get de params o query
        console.log(data)

        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error)); //Quiere decir que el request esta mal, error 400
        }
        next();
    }
}

module.exports = validation;