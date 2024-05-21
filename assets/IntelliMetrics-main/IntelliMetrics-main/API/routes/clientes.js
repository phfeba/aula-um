const router = require('express').Router();
const  validacaoCliente  = require("../validation/clientesVal")

// Importa as funções do controlador relacionadas aos clientes
const { registerCliente, getClientes, getClienteById, deleteCliente, updateCliente, activateclient } = require('../controllers/controllerCliente');
const { middlewareValidarJWT } = require("../middleware/authMiddleware");

router
    // Rota para cadastrar um novo cliente
    .post("/registerClient", async(req, res) => {
        try {
            // Extrai os dados do corpo da requisição
            const {nomeEmpresa, representante, email, telefone, endereco , cnpj, status} = req.body
            
            const cliente = {
                nomeEmpresa,
                representante,
                email,
                telefone,
                endereco,
                cnpj,
                status: "ativo"
            }

            try {
                const clienteValidado = validacaoCliente.parse(cliente);

                  // Chama a função para registrar um novo cliente
                let resultCad = await registerCliente(
                    clienteValidado.nomeEmpresa,
                    clienteValidado.representante,
                    clienteValidado.email,
                    clienteValidado.telefone,
                    clienteValidado.endereco,
                    clienteValidado.cnpj,
                    clienteValidado.status
                );

                // Verifica o resultado do cadastro e retorna a resposta adequada
                switch (resultCad) { 
                    case 200:
                        res.status(200).json("Cliente cadastrado");
                        break;
                    case 400:
                        res.status(400).json("Erro ao cadastrar cliente");
                        break;
                    case 409:
                        res.status(409).json("Este cliente já está cadastrado");
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
 
    // Rota para obter todos os clientes
    .get("/getAllClients", async(req, res) => {
        try {
            // Chama a função para obter todos os clientes
            const clientes = await getClientes();
            res.status(200).json(clientes);

        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno do servidor");
        }
    })

    // Rota para obter um cliente pelo seu ID
    .get("/client/:id", async(req, res) => {
        const id_cliente = req.params.id;

        try {
            // Chama a função para obter um cliente pelo ID
            const cliente = await getClienteById(id_cliente);
          
            res.status(200).json(cliente);

        } catch (error) {
            console.log(error); // Registra o erro no console
            res.status(500).json("Erro interno no servidor");
        }
    })

    // Rota para desativar um cliente pelo seu ID
    .put("/clients/disable/:id", async(req, res) => {
        const id = req.params.id

        try {
            // Chama a função para deletar um cliente pelo ID
            const cliente = await deleteCliente(id);

            switch (cliente) { 
                case 200:
                    res.status(200).json("Cliente desativado");
                    break;
                case 400:
                    res.status(400).json("Erro ao desativar cliente");
                    break;
                case 409:
                    res.status(409).json("Este cliente já está desativado");
                    break;
                default:
                    res.status(500).json("Erro interno do servidor");
            }

        } catch (error) {
            console.log(error); // Registra o erro no console
        }
    })

    
// rota para ativar o cliente pelo seu email
    .put("/client/active/:id", async(req,res) =>{
        const id_cliente = req.params.id

        try{
            const cliente = await activateclient(id_cliente);
            
            switch (cliente) { 
                case 200:
                    res.status(200).json("Cliente ativado");
                    break;
                case 400:
                    res.status(400).json("Erro ao ativar cliente");
                    break;
                case 409:
                    res.status(409).json("Este cliente já está ativo");
                    break;
                default:
                    res.status(500).json("Erro interno do servidor");
            }
        }catch(error){
            console.log(error);
            res.status(500).json("Erro interno no servidor")
        }
    })

    // Rota para atualizar um cliente pelo seu ID
    .put("/updateClient/:id", async (req, res) => {
        try {
            const id_cliente = req.params.id;
            const { nomeEmpresa, representante, email, telefone, endereco, cnpj, status} = req.body;

            const cliente = {
                nomeEmpresa,
                representante,
                email,
                telefone,
                endereco,
                cnpj,
                status
            }
            
            try {
                const clienteValidado = validacaoCliente.parse(cliente);

                // Chama a função para atualizar um cliente pelo ID
                let resultUpdate = await updateCliente(
                    id_cliente,
                    clienteValidado.nomeEmpresa,
                    clienteValidado.representante,
                    clienteValidado.email,
                    clienteValidado.telefone,
                    clienteValidado.endereco,
                    clienteValidado.cnpj,
                    clienteValidado.status
                )
                console.log(resultUpdate)
                // Verifica o resultado da atualização e retorna a resposta adequada
                if(resultUpdate){
                    res.status(200).json("Cliente atualizado");
                } else{
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


module.exports = router;
