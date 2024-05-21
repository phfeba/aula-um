const router = require('express').Router();
// Importa as funções do controlador relacionadas aos relatórios de calibração
const { registerReport, getAllReports, getAllInfos, updateReport  } = require("../controllers/controllerRelatorioCali");
const validacaoRelatorios = require('../validation/relatoriosVal');
router
    // Rota para registrar um relatório de calibração
    .post("/registerReport", async(req, res) => {
        try{
            const {idRelatorio, idInstrumento, idUsuario, idPeca, inicio, termino, tempoTotal, temperaturaC, umidadeRelativa, observacoes, localDaMedicao, dia, assinatura} = req.body

            const valRelatorio = {
                idInstrumento, 
                idUsuario, 
                idPeca, 
                inicio, 
                termino,
                tempoTotal, 
                temperaturaC, 
                umidadeRelativa, 
                observacoes, 
                localDaMedicao, 
                dia, 
                assinatura
            }
            
            try{
                const relatorioValidado = validacaoRelatorios.parse(valRelatorio);

                // Chama a função para registrar um relatório de calibração
                let register = await registerReport(
                    idRelatorio, 
                    relatorioValidado.idInstrumento, 
                    relatorioValidado.idUsuario, 
                    relatorioValidado.idPeca, 
                    relatorioValidado.inicio, 
                    relatorioValidado.termino,
                    relatorioValidado.tempoTotal, 
                    relatorioValidado.temperaturaC, 
                    relatorioValidado.umidadeRelativa, 
                    relatorioValidado.observacoes, 
                    relatorioValidado.localDaMedicao, 
                    relatorioValidado.dia, 
                    relatorioValidado.assinatura
                );

                // Verifica o resultado do registro e retorna a resposta adequada
                switch(register){
                    case 200:
                        res.status(200).json("Relatorio cadastrado com sucesso");
                        break;
                    case 400:
                        res.status(400).json("Erro ao cadastrar relatorio");
                        break;
                    case 409:
                        res.status(409).json("ID ja cadastrada");
                        break;
                    default:
                        res.status(500).json("Erro interno do servidor");
                }

            } catch (validationError) {
                // Captura os erros de validação e envia como resposta
                return res.status(400).json({ error: validationError.errors });
              }

        } catch(error) {
            console.log(error); // Registra o erro no console
        }
    })

    // Rota para obter todos os relatórios de calibração
    .get("/getAllReports", async(req,res) => {
        try {
            // Chama a função para obter todos os relatórios de calibração
            const reports = await getAllReports();
            res.status(200).json(reports);
        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json('Erro interno do servidor');
        }
    })
    // rota que recupera as informações de dentro do relatório
    .get("/infoReport/:id", async(req, res)=>{
        const id = req.params.id
        try{
            const infos = await getAllInfos(id);
            res.status(200).json(infos);
        }catch(error){
            console.log(error);
            res.status(500).json('erro interno do servidor');
        }
    })

    //rota para atualizar o relatório 
    .put("/updateReports/:id", async(req,res)=> {
        const id = req.params.id;

        try {
            const {novoIdRelatorio, idInstrumento, idUsuario, idPeca, inicio, termino, tempoTotal, temperaturaC, umidadeRelativa, observacoes, localDaMedicao, dia, assinatura} = req.body;

            const valRelatorio = {
                idInstrumento, 
                idUsuario, 
                idPeca, 
                inicio, 
                termino,
                tempoTotal, 
                temperaturaC, 
                umidadeRelativa, 
                observacoes, 
                localDaMedicao, 
                dia, 
                assinatura
            }
       
            const relatorioValidado = validacaoRelatorios.parse(valRelatorio);

            // Chama a função para atualizar  o relatorio
            let resultUpdate = await updateReport(
                id,
                novoIdRelatorio,
                relatorioValidado.idInstrumento,
                relatorioValidado.idUsuario,
                relatorioValidado.idPeca,
                relatorioValidado.inicio,  
                relatorioValidado.termino,
                relatorioValidado.tempoTotal,
                relatorioValidado.temperaturaC, 
                relatorioValidado.umidadeRelativa,
                relatorioValidado.observacoes,
                relatorioValidado.localDaMedicao, 
                relatorioValidado.dia, 
                relatorioValidado.assinatura
            );

            switch(resultUpdate){
                case 200:
                    res.status(200).json('Relatório atualizado');
                    break;
                case 400:
                    res.status(400).json('Erro ao atualizar relatório');
                    break;
                case 404:
                    res.status(404).json('Relatório não encontrado');
                    break;
                default:
                    res.status(500).json('Erro interno do servidor');
            }

        } catch (error) {
            console.log(error); // Registra o erro no console
        }
    })

module.exports = router;
