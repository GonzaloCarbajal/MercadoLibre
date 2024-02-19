const express = require("express");
const router = express.Router();
const request = require('request-promise');
const validation = require('../../Middlewares/Validacion');
const {
    validaParametroSchema,
    validaQuerySchema,
    validaHeaderSchema,
    validaParametroSchemaItems,
} = require('../../Validaciones/ParametroSchema');

/** GET Methods */
/**
 * @swagger
 * '/ml/v1/items/{id}':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Búsqueda por ID
 *     parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *        description: id
 *        required: true
 *        examples:
 *          zero:
 *              value: MLM2576319084
 *              summary: Ejemplo 1
 *          max:
 *              value: MLM864419767
 *              summary: Ejemplo 2
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *        example: e962f81a-4d42-4eb3-86cd-a25e7237c8dc
 *        format: uuid
 *        required: true
 *      - in: header
 *        name: x-auth-token2
 *        schema:
 *          type: string
 *        example: 55a4639f-55e8-4e14-a6cc-b79977b20a4e
 *        format: uuid
 *        required: false
 *     responses:
 *      200:
 *        description: Éxito
 *      404:
 *        description: Not Found
 *      500:
 *        description: Parárametros inválidos o requeridos.
 */


router.get('/items/:id',
    validation(validaParametroSchemaItems, 'params'),
    validation(validaHeaderSchema, 'headers'),
    async (req, res) => {
        try {

            /*let myHeaders = request.headers;*/

            let Token2 = req.headers["x-auth-token2"]; //No hago nada con este token


            //Inicializo Variables
            let jsonItem;
            let jsonItemDesc;
            let picture;

            //Obtengo parametros
            const id = req.params.id;



            //Guardo URL para consumir luego
            let urlItem = "https://api.mercadolibre.com/items/" + id;
            let urlItemDesc = "https://api.mercadolibre.com/items/" + id + "/description";


            //Consumo URL https://api.mercadolibre.com/items/:id
            const optionsItem = {
                url: urlItem,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            };


            await request(optionsItem, function (err, res2, body) {

                const reqJsonItem = JSON.parse(body);


                jsonItem = reqJsonItem;

            });

            //Consumo URL https://api.mercadolibre.com/items/:id/description
            const optionsItemDesc = {
                url: urlItemDesc,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            };


            await request(optionsItemDesc, function (err, res2, body) {

                const reqJsonItemDesc = JSON.parse(body);
                jsonItemDesc = reqJsonItemDesc;



            });



            //Obtengo valor absoulto por si viene negativo
            let amount = Math.abs(jsonItem.price);

            //Obtengo decimal, con 2 digitos
            let amountDecimal = (amount - Math.floor(jsonItem.price)).toFixed(2) * 100;


            //Valido si está vacio, y obtengo picture si corresponde
            if (jsonItem.pictures.length === 0) {
                picture = ""
            } else {
                //Busco el primer picture que encuentro
                picture = jsonItem.pictures[0].id
            }


            //Creo array para retornar
            const items = {
                author: {
                    name: "Gonzalo",
                    lastname: "Carbajal"
                },
                item: {
                    id: jsonItem.id,
                    title: jsonItem.title,
                    price: {
                        currency: jsonItem.currency_id,
                        amount: Math.floor(jsonItem.price),
                        decimals: amountDecimal,
                    },
                    picture: picture,
                    condition: jsonItem.condition,
                    free_shipping: jsonItem.shipping.free_shipping,
                    sold_quantity: jsonItem.initial_quantity,
                    description: jsonItemDesc.plain_text
                }
            }

            res.send(items);
        } catch (error) {

            res.send("Sin resultados: " + error).status(204);
        }
    });



/** GET Methods */
/**
 * @swagger
 * '/ml/v1/{site}':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Búsqueda por ID
 *     parameters:
 *      - name: site
 *        in: path
 *        schema:
 *          type: string
 *        description: sitio
 *        required: true
 *        examples:
 *          zero:
 *              value: MLA
 *              summary: MLA
 *          max:
 *              value: MLM
 *              summary: MLM
 *      - name: offset
 *        in: query
 *        schema:
 *          type: integer
 *        description: La cantidad de elementos que se deben omitir antes de obtener los resultados.
 *        required: false
 *        example: 10
 *      - name: limit
 *        in: query
 *        schema:
 *          type: integer
 *        description: El número a devolver.
 *        required: false
 *        example: 10
 *      - name: sort
 *        in: query
 *        schema:
 *          type: string
 *        description: Orden.
 *        required: false
 *        examples:
 *          zero:
 *              value: price_asc
 *              summary: Ascendente
 *          max:
 *              value: price_desc
 *              summary: Descendente
 *      - name: q
 *        in: query
 *        schema:
 *          type: string
 *        description: Cadena de búsqueda.
 *        required: false
 *        example: MercadoLibre
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *        example: e962f81a-4d42-4eb3-86cd-a25e7237c8dc
 *        format: uuid
 *        required: true
 *      - in: header
 *        name: x-auth-token2
 *        schema:
 *          type: string
 *        example: 55a4639f-55e8-4e14-a6cc-b79977b20a4e
 *        format: uuid
 *        required: false
 *     responses:
 *      200:
 *        description: Éxito
 *      404:
 *        description: Not Found
 *      500:
 *        description: Parárametros inválidos o requeridos.
 */
router.get('/:site',
    validation(validaParametroSchema, 'params'),
    validation(validaQuerySchema, 'query'),
    validation(validaHeaderSchema, 'headers'),
    async (req, res) => {

        try {

            let Token2 = req.headers["x-auth-token2"]; //No hago nada con este token

            const site = req.params.site;



            const obj = {
                paggins: {
                    total: 2,
                    offset: 2,
                    limit: 2
                },
                categories: [],
                items: []

            };

            var sort = req.query.sort;
            var offset = req.query.offset;
            var limit = req.query.limit;
            var q = req.query.q;


            if (sort === undefined) {
                sort = ""
            }

            if (offset === undefined) {
                offset = ""
            }

            if (limit === undefined) {
                limit = ""
            }

            if (q === undefined) {
                q = ""
            }

            var urlQuery = "sort=" + sort + "&offset=" + offset + "&limit=" + limit + "&q=" + q;

            var url = "https://api.mercadolibre.com/sites/" + site + "/search?" + urlQuery;



            const options = {
                url: url,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8',
                    'User-Agent': 'my-reddit-client'
                }
            };

            request(options, function (err, res2, body) {
                const json = JSON.parse(body);

                const crearResponse = (arr) => arr.map((value, key) => {


                    //Guardo en array, las categorias distintas, no las repito
                    if (!obj.categories.includes(value.category_id)) {
                        obj.categories.push(value.category_id);
                    }


                    //Obtengo valor absoulto por si viene negativo
                    var amount = Math.abs(value.price);

                    //Obtengo decimal, con 2 digitos
                    var amountDecimal = (amount - Math.floor(value.price)).toFixed(2) * 100;



                    const items = {
                        id: value.id,
                        title: value.title,
                        price:
                            {
                                currency: value.currency_id,
                                amount: Math.floor(value.price),
                                decimals: amountDecimal
                            },
                        picture: "String",
                        condition: value.condition,
                        free_shopping: value.shipping.free_shipping
                    }

                    obj.items.push(items)

                })

                //Inicializo objeto items, para luego llenarlo en la funcion crearResponse
                const obj = {
                    paggins: {
                        "total": json.paging.total,
                        "primary_results": json.paging.primary_results,
                        "offset": json.paging.offset,
                        "limit": json.paging.limit
                    },
                    categories: [],
                    items: []

                };

                crearResponse(json.results);

                //Retorno objeto ya formateado en la funcion crearResponse
                res.send(obj);
            });
        } catch (error) {
            res.send("Sin resultados").status(204);
        }
    });

module.exports = router;