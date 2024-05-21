const router = require("express").Router();

const { getColById } = require("../controllers/controllerUser");
const { generateToken } = require("../controller/token");


router
    
    .post("/collaborator/nivel2", async (req, res) => {
        try {
        
          const email = req.body.email;
          const senha = req.body.senha;
    
          let resultado = await getColById(
            email,
            senha
            
          );
          switch (resultado) {
            case 200:
            
              res.status(200).json(" usuario criado com sucesso")
              break;

            case 401:
              res.status(400).json('erro ao criar')
              break;

            case 404:
                res.status(400).json('usuario incorreto')
                break; 
            default:
              res.status(500).json('Erro interno do servidor')
          }
    
        } catch (error) {
          console.log(error)
        }
      })
module.exports = router;
