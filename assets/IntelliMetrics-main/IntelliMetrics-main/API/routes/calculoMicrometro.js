const router = require("express").Router();

// Importa as funções de cálculo da planicidade e paralelismo do micrômetro
const { calculoPlaneza, calculoParalelismo, controleDimensional, incerteza_medAU, incerteza_UP, incerteza_medERES, incertez_medl1, incertez_medl2, incerteza_medPAR, incertez_medEader, incertezaUC, incetPara0_25, incertplaneza0_25 } = require("../util/calculosMicrometro");

router
     // Rota para calcular a planicidade do micrômetro
    .post("/calculateMicrometro", async (req, res) => {

        const {cMovel, cFixo, dadosParalelismo, dadosControle, faixaCalibrada, valorDivResolucao, dig_anal} = req.body

        try {
  
           const response =  {} 
           req.desvpadMedio = 0
           req.ultimoValor = 0
           req.incerteza = []
           req.desvpadPara3Ult = 0
           req.valParaMM = 0
           req.CFixo = 0 
           req.CMovel = 0


            !!dadosParalelismo == true ? response.calculoParalelismo =  calculoParalelismo(dadosParalelismo, req) : response.calculoParalelismo = "Sem dados" 

            !!cMovel == true && !!cFixo == true ? response.calculoPlaneza = calculoPlaneza(cFixo, cMovel, req) : response.calculoParalelismo = "Sem dados"

            !!dadosControle == true && !!faixaCalibrada == true ? response.controleDimensional = controleDimensional(dadosControle, faixaCalibrada, req) : response.controleDimensional = "Sem dados"


            // calculo incerteza micromico 
            !!faixaCalibrada == true ? response.incertez_medAU = incerteza_medAU(req) : response.incertez_medAU = "Sem dados"

            !!valorDivResolucao == true ? response.incerteza_UP = incerteza_UP(req) :  response.incerteza_UP ="semm dados"

            !!valorDivResolucao == true ? response.incerteza_medEres = incerteza_medERES(valorDivResolucao, dig_anal, req) : response.incerteza_medERES = "Sem dados"

            !!valorDivResolucao == true ? response.incertez_medl1 = incertez_medl1(req) : response.incertez_medl1 = "Sem dados"
            
            !!valorDivResolucao == true ? response.incertez_medl2 = incertez_medl2(req) : response.incertez_medl2 = "Sem dados"

            !!valorDivResolucao == true ? response.incerteza_medPAR = incerteza_medPAR(valorDivResolucao, dig_anal, req) : response.incerteza_medPAR = "Sem dados"

            !!valorDivResolucao == true ? response.incertez_medEader = incertez_medEader(req) : response.incertez_medEader =  "Sem dados"
            
            !!valorDivResolucao == true ? response.incertezaUC = incertezaUC(req) : response.incertezaUC = "Sem dados"

            !!valorDivResolucao == true ? response.incetPara0_25 = incetPara0_25(req) : response.incetPara0_25 = "Sem dados"

            !!valorDivResolucao == true ? response.incertplaneza0_25 = incertplaneza0_25(req) : response.incertplaneza0_25 = "Sem dados"

            return res.status(200).json(response)
            
        } catch (error) {
            console.log(error); // Registra o erro no console
        }
    })

   // .post("/incertezaMicrometro", async(req, res) =>{
    //     const {faixaCalibrada} = req.body



    //     try{
    //         const response =  {}

           



    //         return res.status(200).json(response)

    //     } catch (error) {
    //         console.log(error); // Registra o erro no console
    //     }
    // })

module.exports = router;
