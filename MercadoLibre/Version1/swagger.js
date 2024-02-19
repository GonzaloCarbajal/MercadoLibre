const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

//Metadata info about uoi API

const options = {
    definition:{
        openapi: "3.1.0",
        info: {title: "Mercado Libre", version: "1.0.0"},
        servers: [
            {
                url: "http://localhost:4005"
            }
        ]
    },
    apis: ["routes/index.js", "MercadoLibre/Version1/index.js", `${path.join(__dirname, "./MercadoLibre/Version1/index.js")}`],

};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port)=> {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/v1/docs.json" , (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec)
    })

    console.log(
        `📄 Version 1 documento en http://localhost:${port}/api/v1/docs`
    )
}

module.exports = {swaggerDocs};