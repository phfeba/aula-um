const cors =  require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Midlewares da API
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Rotas
const rotas_usuario = require('./routes/usuarios');
const rotas_ordemCertificado = require('./routes/Ordens')
const rotas_clientes = require('./routes/clientes'); 
const rotas_pecas = require('./routes/pecas');
const rotas_relatorios = require('./routes/relatorios')
const rotas_instrumentos = require('./routes/instrumentos');
const certificado_paquimetro = require('./routes/calculoPaquimetro')
const certificado_micrometro =  require('./routes/calculoMicrometro')
const rotas_categorias = require('./routes/categorias')


app.use("", rotas_pecas); 
app.use("", rotas_clientes);
app.use("", rotas_usuario); 
app.use("", rotas_ordemCertificado)
app.use("", rotas_relatorios)
app.use("", rotas_instrumentos); 
app.use("", certificado_paquimetro)
app.use("", certificado_micrometro)
app.use("", rotas_categorias)


// Defina as opções do Swagger JSDoc

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Intelli",
      version: "1.0.0",
      description:
        "A api",
    },
  },
  apis: ["./docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// Use o Swagger UI Express para servir a documentação Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use("/", (req, res) => {
    res.json("Ta rodando a API, está é a /home");
  });

app.listen(port, () => {

    console.log(`Conectado na porta ${port}`)
});

