const router = require('express').Router();
const { registerPeca, getAllPecas, getPecaById, updatePeca } = require('../controllers/controllerPecas');
const validacaoPecas = require('../validation/pecasVal');

router
    // Rota para cadastrar uma nova peça
    .post("/registerPieces", async(req, res) => {
        try {
            // Extrai os dados do corpo da requisição
            const {idOs, idCliente, nome, material, nDesenho, descricao} = req.body;

            const valPeca = {
                idOs,
                idCliente,
                nome,
                material,
                nDesenho,
                descricao
            }

            try{
                const pecaValidada = validacaoPecas.parse(valPeca);

                // Chama a função para cadastrar uma nova peça
                let resultCad = await registerPeca(
                    pecaValidada.idOs,
                    pecaValidada.idCliente,
                    pecaValidada.nome,
                    pecaValidada.material,
                    pecaValidada.nDesenho,
                    pecaValidada.descricao
                );

                // Verifica o resultado do cadastro e retorna a resposta adequada
                switch (resultCad) { 
                    case 200:
                        res.status(200).json("Peça cadastrada");
                        break;
                    case 400:
                        res.status(400).json("Erro ao cadastrar peça");
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
        }
    })

        // atualizar cadastro peça
    .put("/updatePieces/:id", async(req, res) => {
        try {
            const idPeca = req.params.id;
            const {fk_idOs, fk_idCliente, nome, material, nDesenho, descricao} = req.body;

            const valPeca = {
                fk_idOs,
                fk_idCliente,
                nome,
                material,
                nDesenho,
                descricao
            }

            try{
                const pecaValidada = validacaoPecas.parse(valPeca);

                let resultUpdate = await updatePeca(
                    idPeca,
                    pecaValidada.fk_idOs,
                    pecaValidada.fk_idCliente,
                    pecaValidada.nome,
                    pecaValidada.material,
                    pecaValidada.nDesenho,
                    pecaValidada.descricao
                )

                switch(resultUpdate){
                    case 200:
                        res.status(200).json('Peça atualizada');
                        break;
                    case 400:
                        res.status(400).json('Erro ao atualizar peça');
                        break;
                    default:
                        res.status(500).json('Erro interno do servidor');
                }  
            } catch (validationError) {
                // Captura os erros de validação e envia como resposta
                return res.status(400).json({ error: validationError.errors });
              }
              
        } catch(error) {
            console.log(error);
            res.status(500).json("Erro interno no servidor");
        }
    })

    // Rota para obter todas as peças
    .get("/getAllPieces", async(req, res) => {

        try {
            // Chama a função para obter todas as peças
            const pecas = await getAllPecas();
            res.status(200).json(pecas);

        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })

    // Rota para obter uma peça pelo seu ID
    .get("/piece/:id", async(req, res) => {
        const id_peca = req.params.id;

        try {
            // Chama a função para obter uma peça pelo ID
            const peca = await getPecaById(id_peca);
            res.status(200).json(peca);
        } catch(error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })


module.exports = router;
