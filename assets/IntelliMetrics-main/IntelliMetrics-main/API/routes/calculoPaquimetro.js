const router = require("express").Router();

// Importa a função de cálculo de tendência externa do paquímetro
const { calculoTendenciaExterna, calculoParalelismoOrelhas, calculoParalelismoBicos, calculoMedInterna, calculoMedRessalto, calculoMedProfundidade, incertezaUA, incertezaUP, incertezaERES, incertezaL1, incertezaL2, incertezaUC, incertezaUE } = require("../util/calculosPaquimetro");

router
  // Rota para calcular a tendência externa do paquímetro
  .post("/caliperCalculation", async (req, res) => {
    const { valorNominalMedExterna, valorIndicado, valorIndicadoProxOrelhas, valorIndicadoAfasOrelhas, valorNominalPara, valorIndicadoProxBicos, valorIndicadoAfasBicos, valorNominalMedInterna, valorIndicadoMedInterna, valorNominalMedRessalto, valorIndicadoMedRessalto, valorNominalMedProf, valorIndicadoMedProf} = req.body;

    try {
      const response = {};

      !!valorNominalMedExterna == true && !!valorIndicado == true ? response.medicaoExterna = calculoTendenciaExterna( valorIndicado, valorNominalMedExterna) : response.medicaoExterna = "Sem dados";


      !!valorIndicadoAfasOrelhas == true && !!valorIndicadoProxOrelhas == true ? response.calculos_Pararelismo_Orelhas = calculoParalelismoOrelhas(valorIndicadoProxOrelhas, valorIndicadoAfasOrelhas, valorNominalPara) : response.calculos_Pararelismo_Orelhas = "Sem dados"

      !!valorIndicadoAfasBicos == true && !!valorIndicadoProxBicos == true ? response.calculos_Pararelismo_Bicos = calculoParalelismoBicos(valorIndicadoProxBicos, valorIndicadoAfasBicos, valorNominalPara ) : response.calculo_Paralelismo_Bicos = "Sem dados"

      !!valorNominalMedInterna == true && !!valorIndicadoMedInterna == true ? response.tendencias_Medicao_Interna = calculoMedInterna(valorNominalMedInterna, valorIndicadoMedInterna) : response.tendencias_Medicao_Interna = "Sem dados"

      !!valorNominalMedRessalto == true && !!valorIndicadoMedRessalto == true ? response.tendencias_Medicao_Ressalto = calculoMedRessalto(valorNominalMedRessalto, valorIndicadoMedRessalto ) : response.tendencias_Medicao_Ressalto = "Sem dados"

      !!valorNominalMedProf == true && !!valorIndicadoMedProf ==  true ? response.tendencias_Medicao_Profundidade = calculoMedProfundidade(valorIndicadoMedProf, valorNominalMedProf) : response.tendencias_Medicao_Profundidade = "Sem dados"
      
      return res.status(200).json(response)

    } catch (error) {
      console.log(error); // Registra o erro no console
    }
  })

  .post("/caliperUncertainty", async(req, res) =>{
    
    const {resolucao, desvpad, faixaNominal} = req.body
    
    try{

      const response = {}

      req.incertezas = []

      !! desvpad == true && !!resolucao == true ? response.incerteza_UA = incertezaUA(resolucao, desvpad, req) : response.incerteza_UA = "Sem dados"

      !!faixaNominal == true ? response.incerteza_UP_EA = incertezaUP(faixaNominal, req) : response.incerteza_UP_EA = "Sem dados"

      !!resolucao == true ? response.inceteza_ERES = incertezaERES(resolucao,req) : response.inceteza_ERES = "Sem dados"

      !!faixaNominal == true ? response.incerteza_L1 = incertezaL1(faixaNominal,req) : response.incerteza_L1 = "Sem dados"

      !!faixaNominal == true ? response.incerteza_L2 = incertezaL2(faixaNominal, req) : response.incerteza_L2 = "Sem dados"

      !!faixaNominal == true ? response.incerteza_UC = incertezaUC(req) : response.incerteza_UC = "Sem dados" 
      
      !!faixaNominal == true ? response.incertezaUE = incertezaUE() : response.incertezaUE = "Sem dados"

      return res.status(200).json(response)

    } catch (error) {
      console.log(error); // Registra o erro no console
    } 
  })

// rota para inserir o paralelismo do paquimetro
.post("/caliperParallelismo", async (req, res) =>{
  
})

module.exports = router;