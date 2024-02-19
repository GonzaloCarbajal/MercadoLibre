const express = require('express');
const routerApi = require('./routes');
const {swaggerDocs: V1swaggerDocs} = require("./MercadoLibre/Version1/swagger");

// Creamos una aplicacion en express
const app = express();

// Le decimos en que puerto queremos que corra y lo guardamos en una variable
const port = process.env.PORT || 4005;


app.use(express.json());



// Definimos rutas
app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});


routerApi(app);

// Le debemos decir enq ue puerto va a escuchar nuestra aplicacion
app.listen(port, () => {
    console.log('Mi port ' +  port);
    V1swaggerDocs(app, port);
});


