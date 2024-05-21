const router = require("express").Router();

// Importa as funções do controlador relacionadas aos certificados de calibração
const {
  registerOrder,
  getCertificateOrders,
  getOrdersById,
  updateOrders,
  ordemConcluida,
  ordemEmEspera,
} = require("../controllers/controllerOrdens");
const validacaoOrdens = require("../validation/ordensVal");

router
  // Rota para registrar um novo certificado de calibração
  .post("/registerOrders", async (req, res) => {
    try {
      // Extrai os dados do corpo da requisição
      const {
        pk_idOs,
        fk_idCliente,
        fk_idUsuario,
        titulo,
        tipo,
        descricao,
        dataInicio,
        dataTermino,
        contratante,
        email,
        telefone,
        status,
      } = req.body;

      const ordensVal = {
        titulo,
        tipo,
        descricao,
        dataInicio,
        dataTermino,
        contratante,
        email,
        telefone,
        status,
      };

      try {
        const ordensValidadas = validacaoOrdens.parse(ordensVal);

        // Chama a função para registrar um novo certificado de calibração
        let register = await registerOrder(
          pk_idOs,
          fk_idCliente,
          fk_idUsuario,
          ordensValidadas.titulo,
          ordensValidadas.tipo,
          ordensValidadas.descricao,
          dataInicio,
          dataTermino,
          ordensValidadas.contratante,
          ordensValidadas.email,
          ordensValidadas.telefone,
          ordensValidadas.status
        );

        // Verifica o resultado do registro e retorna a resposta adequada
        switch (register) {
          case 200:
            res.status(200).json("Ordem de calibração cadastrada com sucesso");
            break;
          case 400:
            res.status(400).json("Erro ao cadastrar ordem de calibração");
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

    } catch (error) {
      console.log(error); // Registra o erro no console
    }
  })

  // Rota para obter todos os certificados de calibração
  .get("/getAllOrders", async (req, res) => {
    try {
      // Chama a função para obter todos os certificados de calibração
      const ordens = await getCertificateOrders();
      res.status(200).json(ordens);
    } catch (error) {
      console.log(error); // Registra o erro no console
      res.status(500).json("Erro interno do servidor");
    }
  })

  // Rota para obter um certificado de calibração pelo seu ID
  .get("/order/:id", async (req, res) => {
    const id_order = req.params.id;

    try {
      // Chama a função para obter um certificado de calibração pelo ID
      const report = await getOrdersById(id_order);
      res.status(200).json(report);
    } catch (error) {
      console.log(error); // Registra o erro no console
      res.status(500).json("Erro interno do servidor");
    }
  })

  .put("/updateOrders", async (req, res) => {
    try {
      const {
        id_antigo,
        id_order,
        fk_idCliente,
        fk_idUsuario,
        titulo,
        tipo,
        descricao,
        dataTermino,
        contratante,
        email,
        telefone,
      } = req.body;

      const ordensVal = {
        titulo,
        tipo,
        descricao,
        dataTermino,
        contratante,
        email,
        telefone,
      };

      try{ 
        const ordensValidadas = validacaoOrdens.parse(ordensVal);

        let resultUpdate = await updateOrders(
          id_antigo,
          id_order,
          fk_idCliente,
          fk_idUsuario,
          ordensValidadas.titulo,
          ordensValidadas.tipo,
          ordensValidadas.descricao,
          dataTermino,
          ordensValidadas.contratante,
          ordensValidadas.email,
          ordensValidadas.telefone
        );

        if (resultUpdate) {
          res.status(200).json("Ordem atualizada");
        } else {
          res.status(500).json("Erro interno do servidor");
        }
      } catch (validationError) {
        // Captura os erros de validação e envia como resposta
        return res.status(400).json({ error: validationError.errors });
      }
      
    } catch (error) {
      console.log(error);
    }
  })

  .put("/completedOrders/:id", async (req, res) => {
    const id_order = req.params.id;
    try {
      const ordemConc = await ordemConcluida(id_order);

      switch (ordemConc) {
        case 200:
          res.status(200).json("Ordem marcada como concluida");
          break;
        case 400:
          res.status(400).json("Não foi possivel alterar status");
          break;
        default:
          res.status(500).json("Erro interno do servidor");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Erro interno no servidor");
    }
  })

  .put("/uncheckOrders/:id", async (req, res) => {
    const id_order = req.params.id;
    try {
      const ordemUncheck = await ordemEmEspera(id_order);

      switch (ordemUncheck) {
        case 200:
          res.status(200).json("Ordem colocada em espera");
          break;
        case 400:
          res.status(400).json("Não foi possivel alterar status");
          break;
        default:
          res.status(500).json("Erro interno do servidor");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Erro interno no servidor");
    }
  });

module.exports = router;
