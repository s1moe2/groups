const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');
const pino = require("pino-http");
const app = express();
const groups = require("./groups/routes");

app.use(express.json());
app.use(pino());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Groups API',
        version: '1.0.0',
      },
    },
    apis: ['./groups/*.js'],
})));

app.use("/groups", groups);

app.use("*", (req, res) => res.status(404).json({ error: "route not found" }));

app.use((err, req, res, next) => {
    pino.error(err);
    res.status(500).json({ error: "internal error" });
});

app.listen(process.env.PORT ?? 3000)