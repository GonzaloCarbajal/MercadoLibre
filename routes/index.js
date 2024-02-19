const express = require("express");
const mlaVersion1 = require('../MercadoLibre/Version1');


/*parameters:
    - name: username
in: path
description: The username of the user
required: true*/

function routerApi(app) {
    const router = express.Router();
    app.use('/ml/v1', router); //Creamos una ruta maestra, para luego usarlo abajo
    router.use('/', mlaVersion1);

}

module.exports = routerApi;