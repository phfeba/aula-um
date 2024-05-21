const router = require('express').Router();

const { registerCategoria, updateCategoria, getCategorias } = require("../controllers/controllerCategorias")
const validacaoCategoria = require("../validation/categoriasVal")

router

    .post("/registerCategory", async(req, res) => {
        try {
            const nome = req.body.nome;

            const valCategoria = {
                nome
            };

            try{

                const categoriaValidada = validacaoCategoria.parse(valCategoria);

                let resultCad = await registerCategoria(
                    categoriaValidada.nome
                );

                switch (resultCad) { 
                    case 200:
                        res.status(200).json("Categoria cadastrada");
                        break;
                    case 400:
                        res.status(400).json("Erro ao cadastrar categoria");
                        break;
                    default:
                        res.status(500).json("Erro interno do servidor");
                }
            } catch (validationError) {
                // Captura os erros de validação e envia como resposta
                return res.status(400).json({ error: validationError.errors });
              }

        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })

    .put("/updateCategory/:id", async(req, res) => {

        const idCategoria = req.params.id;
        const nome = req.body.nome;

        try {
           
            const valCategoria = {
                nome
            }

            try{

                const categoriaValidada = validacaoCategoria.parse(valCategoria);

                let resultUpdate = await updateCategoria(
                    idCategoria,
                    categoriaValidada.nome
                )
                
                switch(resultUpdate){
                    case 200:
                        res.status(200).json('Categoria atualizado');
                        break;
                    case 404:
                        res.status(400).json('Categoria não encontrada');
                        break;
                    default:
                        res.status(500).json('Erro interno do servidor');
                }
            } catch (validationError) {
                // Captura os erros de validação e envia como resposta
                return res.status(400).json({ error: validationError.errors });
              }

        } catch (error) {
            console.log(error);
            res.status(500).json("Erro interno do servidor");
        }
    })

    .get("/allCategorys", async(req, res) =>{
        try {
            // Chama a função para obter todos os clientes
            const categorys = await getCategorias();
            res.status(200).json(categorys);

        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })

module.exports = router; 
