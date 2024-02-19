const Joi = require('joi');

const site = Joi.string()
    .min(3)
    .max(3)
    .valid("MLB","MLA","MLM")
    .messages({"any.only": "Site ingresado es incorrecto"});

const offset =  Joi.number().positive();

const sort =  Joi.string()
    .valid("price_asc","price_desc")
    .messages({"any.only": "Solo se puede ordenar la busqueda de forma ascendente (price_asc) ó desdendente (price_desc)"});

const limit =  Joi.number().positive();

const q =  Joi.string().alphanum();

const id =  Joi.string().messages({"any.only": "No puede ser vacío"});

const validaParametroSchema = Joi.object({

    //Definimos validación para cada campo
    site : site.required().messages({"any.required": "Site es requerido"})
});

const validaQuerySchema = Joi.object({

    //Definimos validación para cada campo
    offset : offset.optional(),
    sort : sort.optional(),
    limit : limit.optional(),
    q : q.optional(),
});

const validaHeaderSchema = Joi.object({


    //Definimos validación para cada campo
    'x-auth-token': Joi.required().equal("e962f81a-4d42-4eb3-86cd-a25e7237c8dc").messages({'any.only': 'Token inexistente ó invalido', "any.required": "Token es requerido"}),
    /*'x-auth-token2': Joi.optional().equal("55a4639f-55e8-4e14-a6cc-b79977b20a4e")*/

}).options({ allowUnknown: true });

const validaParametroSchemaItems = Joi.object({

    //Definimos validación para cada campo
    id : id.required().messages({"any.required": "id es requerido"})
});

module.exports = {validaParametroSchema, validaQuerySchema, validaHeaderSchema, validaParametroSchemaItems}