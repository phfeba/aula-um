const fs = require('fs');
const mysql = require('mysql2')
const dotenv = require("dotenv");

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.BANCO_STRING,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port:process.env.DATAPORT,
    // ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}

})

async function conexao() {
    try {
        await connection.connect();
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.log("Erro ao conectar com o banco de dados", error)
        
    }
}

conexao();
module.exports = connection;