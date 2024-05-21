const router = require('express').Router();

const { registerPeca } = require('../controllers/controllerPecas');
const {registerReceipt, updateReceipt,getReceiptById,getAllReceipt} = require("../controllers/controllerRecibos");

const validacaoRecebimentos = require("../validation/recebimentoVal")
router
    //rota para cadastrar uma novo recibo
    .post("/registerReceipt", async(req, res) =>{
        try{
            const {idOrdem, idUsuario, setor, nProposta, nNotaFiscal, dataDeRecebimento, recebidoNaPrevisao, previsaoInicio, previsaoTermino, clienteConcorda, dataAssinatura, pessoaContatada, dataContatada} = req.body;

            const valRecebidos = {
                idOrdem,
                idUsuario,
                setor,
                nProposta,
                nNotaFiscal,
                dataDeRecebimento,
                recebidoNaPrevisao,
                previsaoInicio,
                previsaoTermino,
                clienteConcorda,
                dataAssinatura,
                pessoaContatada,
                dataContatada
            }

            try{

                const reciboValidado = validacaoRecebimentos.parse(valRecebidos)
                
                let resultCad = await registerReceipt(
                    reciboValidado.idOrdem,
                    reciboValidado.idUsuario,
                    reciboValidado.setor,
                    reciboValidado.nProposta,
                    reciboValidado.nNotaFiscal,
                    reciboValidado.dataDeRecebimento,
                    reciboValidado.recebidoNaPrevisao,
                    reciboValidado.previsaoInicio,
                    reciboValidado.previsaoTermino,
                    reciboValidado.clienteConcorda,
                    reciboValidado.dataAssinatura,
                    reciboValidado.pessoaContatada,
                    reciboValidado.dataContatada
                );

                switch(resultCad){
                    case 200:
                        res.status(200).json("Recibo cadastrado com sucesso");
                        break;
                    case 400:
                        res.status(400).json("Erro ao cadastrar recibo");
                        break;
                    case 409:
                        res.status(409).json("ID ja cadastrado");
                        break;
                    default:
                        res.status(500).json("Erro interno do servidor");
                }
            } catch (validationError) {
                // Captura os erros de validação e envia como resposta
                return res.status(400).json({ error: validationError.errors });
              }
              
        }catch(error){
            console.log(error);
        }
    })

    .put("/updateReceipt/:id", async(req, res) =>{
        try {
            // const idOrdem = req.params.id;
            const idRecibo = req.params.id
            const {idOrdem, setor, nProposta, nNotaFiscal, dataDeRecebimento, recebidoNaPrevisao, previsaoInicio, previsaoTermino, clienteConcorda, dataAssinatura, pessoaContatada, dataContatada} = req.body;

            const valRecebidos = {
                idOrdem,
                idUsuario,
                setor,
                nProposta,
                nNotaFiscal,
                dataDeRecebimento,
                recebidoNaPrevisao,
                previsaoInicio,
                previsaoTermino,
                clienteConcorda,
                dataAssinatura,
                pessoaContatada,
                dataContatada
            }

            const reciboValidado = validacaoRecebimentos.parse(valRecebidos)
             
            let resultUpdate = await updateReceipt(
                idRecibo,
                reciboValidado.idOrdem,
                reciboValidado.setor,
                reciboValidado.nProposta,
                reciboValidado.nNotaFiscal,
                reciboValidado.dataDeRecebimento,
                reciboValidado.recebidoNaPrevisao,
                reciboValidado.previsaoInicio,
                reciboValidado.previsaoTermino,
                reciboValidado.clienteConcorda,
                reciboValidado.dataAssinatura,
                reciboValidado.pessoaContatada,
                reciboValidado.dataContatada
            );

            switch(resultUpdate){
                case 200:
                    res.status(200).json('Recibo atualizado');
                    break;
                case 400:
                    res.status(400).json('Erro ao atualizar recibo');
                    break;
                default:
                    res.status(500).json('Erro interno do servidor');
            }

        } catch (error) {
            console.log(error);
            res.status(500).json("Erro interno no servidor");
        }
    })


    .get("/getAllReceipts", async(req, res) => {
        try {
            const recibos = await getAllReceipt();
            res.status(200).json(recibos);

        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })

    .get("/receipts/:id", async(req,res) => {
        const idRecibo = req.params.id;

        try {
            const recibo = await getPecaById(idRecibo);
            res.status(200).json(recibo);
        } catch(error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })

module.exports = router;