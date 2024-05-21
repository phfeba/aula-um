const { media, desvpad, arredondarParaCima } = require("./funcoesCalculos");
const jStat = require('jstat');


function calculoTendenciaExterna(valorIndicado, valorNominalMedExterna) {
  
  let tendencias = []
  let medias = []
  let desvioPadrao = []

  
  for (let i = 0; i < valorIndicado.length; i++) {
    for (let y = 0; y < 3; y++) {

      const  mediaValor = media(valorIndicado[i]);
      medias.push(mediaValor)

    } 

    const desvPad = desvpad(valorIndicado[i])
    desvioPadrao.push(desvPad)
  }

  for(let index = 0; index < valorNominalMedExterna.length; index++){
    const tendencia = medias[index] - valorNominalMedExterna[index]
    tendencias.push(tendencia.toFixed(4))
      
  }

  const response = {};

  for (let index = 0; index < tendencias.length; index++) {

    response[`resultado${index + 1}`] = { "tendencia" : parseFloat(tendencias[index]), "desvpad": parseFloat(desvioPadrao[index])}
   
  }

  return response
}

function calculoParalelismoOrelhas(valorIndicadoProxOrelhas, valorIndicadoAfasOrelhas, valorNominalPara) {

  let mediasProx = []
  let mediasAfast = []
  let tendenciasProx = 0
  let tendenciasAfast = 0
  let desvioPadraoAfast = 0
  let desvioPadraoProx = 0

  for (let i = 0; i < valorIndicadoProxOrelhas.length; i++) {
  
      const mediaProx = media(valorIndicadoProxOrelhas[i]);
      mediasProx.push(mediaProx)

      const mediaAfast = media(valorIndicadoAfasOrelhas[i]);
      mediasAfast.push(mediaAfast)

      const desvPadAfast = desvpad(valorIndicadoAfasOrelhas[i])
      desvioPadraoAfast += desvPadAfast

      const desvPadProx = desvpad(valorIndicadoProxOrelhas[i])
      desvioPadraoProx += desvPadProx
  
    
    for (let index = 0; index < valorIndicadoAfasOrelhas.length; index++) {
        
      const tendenciaProx = mediasProx[index] - valorNominalPara[0];
      tendenciasProx += tendenciaProx

      const tendenciaAfast = mediasAfast[index] - valorNominalPara[0];
      tendenciasAfast += tendenciaAfast
    }
  }
  const paralelismoOrelhas = Math.max(tendenciasProx, tendenciasAfast) - Math.min(tendenciasProx, tendenciasAfast)
  const paralelismoOrelhasT = paralelismoOrelhas.toFixed(2)

  const tendenciaAfastT = tendenciasAfast.toFixed(2)
  const tendenciaProxT = tendenciasProx.toFixed(2)

  const response = {};

  response[`resultado_Orelhas`] = {"tendencia_proximo": parseFloat(tendenciaProxT) , "tendencia_afastado" : parseFloat(tendenciaAfastT), "paralelismo_Orelhas": parseFloat(paralelismoOrelhasT), "despad_Afast": parseFloat(desvioPadraoAfast), "desvpad_Prox": parseFloat(desvioPadraoProx)}

  return response
}

function calculoParalelismoBicos(valorIndicadoProxBicos, valorIndicadoAfasBicos, valorNominalPara) {
 
  let mediasProx = []
  let mediasAfast = []
  let tendenciasProx = 0
  let tendenciasAfast = 0
  let desvioPadraoAfast = 0
  let desvioPadraoProx = 0

  for (let i = 0; i < valorIndicadoProxBicos.length; i++) {
  
      const mediaProx = media(valorIndicadoProxBicos[i]);
      mediasProx.push(mediaProx)

      const mediaAfast = media(valorIndicadoAfasBicos[i]);
      mediasAfast.push(mediaAfast)

      const desvpadAfast = desvpad(valorIndicadoAfasBicos[i])
      desvioPadraoAfast += desvpadAfast
      
      const desvpadProx = desvpad(valorIndicadoProxBicos[i])
      desvioPadraoProx += desvpadProx
    
    for (let index = 0; index < valorIndicadoAfasBicos.length; index++) {
        
      const tendenciaProx = mediasProx[index] - valorNominalPara[1];
      tendenciasProx += tendenciaProx

      const tendenciaAfast = mediasAfast[index] - valorNominalPara[1];
      tendenciasAfast += tendenciaAfast
    }
  }
  const paralelismoOrelhas = Math.max(tendenciasProx, tendenciasAfast) - Math.min(tendenciasProx, tendenciasAfast)
  const paralelismoOrelhasT = paralelismoOrelhas.toFixed(2)

  const tendenciaAfastT = tendenciasAfast.toFixed(2)
  const tendenciaProxT = tendenciasProx.toFixed(2)

  const response = {};

  response[`resultado_Bicos`] = {"tendencia_proximo": parseFloat(tendenciaProxT) , "tendencia_afastado" : parseFloat(tendenciaAfastT), "paralelismo_Orelhas": parseFloat(paralelismoOrelhasT), "desvpad_Afast": parseFloat(desvioPadraoAfast), "desvpad_Prox": parseFloat(desvioPadraoProx)}
  
 

  return response
}

function calculoMedInterna(valorNominalMedInterna, valorIndicadoMedInterna) {

  let tendencias = []
  let medias = []
  let desvPads = []

  for (let i = 0; i < valorIndicadoMedInterna.length; i++) {
    for (let y = 0; y < 3; y++) {

      const  mediaValor = media(valorIndicadoMedInterna[i]);
      medias.push(mediaValor)
           
    }
    
    const desvioPadrao = desvpad(valorIndicadoMedInterna[i])
    desvPads.push(desvioPadrao)
  }

  for(let index = 0; index < valorNominalMedInterna.length; index++){
    const tendencia = medias[index] - valorNominalMedInterna[index]
    tendencias.push(tendencia.toFixed(4))
     
  }

  const response = {};

  for (let index = 0; index < tendencias.length; index++) {

    response[`resultado${index + 1}`] = { "tendencia" : parseFloat(tendencias[index]), "desvpad": parseFloat(desvPads[index])}

  }
  return response
}

function calculoMedRessalto( valorNominalMedRessalto, valorIndicadoMedRessalto) {

  let tendencias = []
  let medias = []
  let desvpads = []
  
  for (let i = 0; i < valorIndicadoMedRessalto.length; i++) {

    const  mediaValor = media(valorIndicadoMedRessalto[i]);
    medias.push(mediaValor)
           
    const desvioPadrao = desvpad(valorIndicadoMedRessalto[i])
    desvpads.push(desvioPadrao)
  }
  
  for(let index = 0; index < valorNominalMedRessalto.length; index++){
    const tendencia = medias[index] - valorNominalMedRessalto[index]
    tendencias.push(tendencia.toFixed(4))
      
  }

  const response = {};

  for (let index = 0; index < tendencias.length; index++) {

    response[`resultado${index + 1}`] = { "tendencia" : parseFloat(tendencias[index]), "desvpad": parseFloat(desvpads[index])}

  }


  return response
}

function calculoMedProfundidade(valorIndicadoMedProf, valorNominalMedProf) {

  let tendencias = []
  let medias = []
  let desvpads = []
  
  for (let i = 0; i < valorIndicadoMedProf.length; i++) {
   
      const  mediaValor = media(valorIndicadoMedProf[i]);
      medias.push(mediaValor)

      const desvioPadrao = desvpad(valorIndicadoMedProf[i])
      desvpads.push(desvioPadrao)

  }

  for(let index = 0; index < valorNominalMedProf.length; index++){
    const tendencia = medias[index] - valorNominalMedProf[index]
    tendencias.push(tendencia.toFixed(4))
  }

  const response = {};

  for (let index = 0; index < tendencias.length; index++) {

    response[`resultado${index + 1}`] = { "tendencia" : parseFloat(tendencias[index]), "desvpad": parseFloat(desvpads[index])}

  }
  return response
}

// calculos de incerteza paquimetro

let contriIn_UA_global = 0
let veff_global = 0
let contriIn_UC_global = 0

function incertezaUA(resolucao, desvpad,req){

  //  lista de contexto global
  const listaIncerteza = req.incertezas
    
  let resultado = 0

  const maximo = Math.max(desvpad) 
 
  if (maximo > resolucao){
    resultado +=  maximo / Math.sqrt(3).toFixed(5)
  } else {
    resultado += ((resolucao /4)/ Math.sqrt(3)).toFixed(5)
  }

  const contriIn = (resultado / 1).toFixed(5)
  contriIn_UA_global += contriIn

  listaIncerteza.push(parseFloat(contriIn))
  req.incertezas = listaIncerteza

  const response = {"estimativa_UA": parseFloat(resolucao), "incerteza_Padrao": parseFloat(resultado), "contribuiçao_Incerteza": parseFloat(contriIn)}

  return response
}

function incertezaUP(faixaNominal, req){

//  lista de contexto global
  const listaIncerteza = req.incertezas

  let resultado = 0
  let incertezaEA = 0

  switch(faixaNominal){
    case 150: 
    case 200:
    case 250: 
    case 300:
      resultado += (2 / 1000).toFixed(5)
      incertezaEA =+ resultado + (2 * 0.00007)
      break;
    case 450: 
    case 500:
      resultado += (3/1000).toFixed(5)
      incertezaEA =+ resultado + (2 * 0.00007)
      break;
    default:
      return "Faixa Incorreta"
  }

  const contriIn = (resultado / 2).toFixed(4)
  const contriInEA = (incertezaEA / Math.sqrt(3)).toFixed(4)

  listaIncerteza.push(parseFloat(contriIn), parseFloat(contriInEA))
  req.incertezas = listaIncerteza

  const response = {"Estimativa_UP_EA": parseFloat(faixaNominal), "incerteza_Padrao": parseFloat(resultado), "contribuiçao_Incertezao_UP": parseFloat(contriIn), "incerteza_EA": parseFloat(incertezaEA), "contribuiçao_Incertezao_EA": parseFloat(contriInEA)}

  return response
}

function incertezaERES(resolucao, req){

  //  lista de contexto global
  const listaIncerteza = req.incertezas

  const incerteza = resolucao/2
  const contriIn = (incerteza / Math.sqrt(3)).toFixed(4)

  listaIncerteza.push(parseFloat(contriIn))
  req.incertezas = listaIncerteza
  
  const response = {"Estimativa_ERES": parseFloat(resolucao), "incerteza_ERES": parseFloat(incerteza), "contribuiçao_Incerteza": parseFloat(contriIn)}

  return response
}

function incertezaL1(faixaNominal,req){

   //  lista de contexto global
  const listaIncerteza = req.incertezas

  let incerteza = 0

  switch(faixaNominal){
    case 150: 
    case 200:
    case 250: 
    case 300:
    case 450: 
    case 500:
      (incerteza += faixaNominal * 0.000001 * 2).toFixed(5)
      break;
    default:
      return "Faixa Incorreta"
  }

  const contriIn = (incerteza / Math.sqrt(3)).toFixed(4)

  listaIncerteza.push(parseFloat(contriIn))
  req.incertezas = listaIncerteza
 
  const response = {"Estimativa_L1": parseFloat(faixaNominal), "incerteza_L1": parseFloat(incerteza), "contribuiçao_Incerteza": parseFloat(contriIn)}

  return response
}

function incertezaL2(faixaNominal, req){

 //  lista de contexto global
  const listaIncerteza = req.incertezas
  
  let incerteza = 0

  switch(faixaNominal){
    case 150: 
    case 200:
    case 250: 
    case 300:
    case 450: 
    case 500:
      // (incerteza += faixaNominal * ((0.0000115 + 0.0000115) / 2) * 1).toFixed(5)
      (incerteza += faixaNominal * 0.0000115).toFixed(5)
      break;
    default:
      return "Faixa Incorreta"
  }

  const contriIn = (incerteza / Math.sqrt(3)).toFixed(4 )

  listaIncerteza.push(parseFloat(contriIn))
  req.incertezas = listaIncerteza

  const response = {"Estimativa_L2": parseFloat(faixaNominal), "incerteza_L2": parseFloat(incerteza), "contribuiçao_Incerteza": parseFloat(contriIn)}

  return response
}

function incertezaUC(req){

  // console.log("funciona por favor", req.incertezas)

  const somaQuadrados = req.incertezas.reduce((acc, val) => acc + Math.pow(val, 2), 0);

  const raiz = Math.sqrt(somaQuadrados).toFixed(4)

  contriIn_UC_global += raiz

  const veff = Math.round(Math.pow(raiz, 4) /(Math.pow(contriIn_UA_global, 4)/ 2))
  veff_global += veff

  const response = {"UC": parseFloat(raiz), "veff": veff}

  return response
  
}

function incertezaUE(){
 

  const K = (jStat.studentt.inv(1 - 0.0455 / 2, veff_global));
  const K_Resposta = K.toFixed(2)


  const UE = (contriIn_UC_global * K)
  const UE_Arredondado = arredondarParaCima(UE)
 

  const response = {"K": parseFloat(K_Resposta), "UE": parseFloat(UE_Arredondado)}

  return response
  
}

module.exports = {
  calculoTendenciaExterna,
  calculoParalelismoOrelhas,
  calculoParalelismoBicos,
  calculoMedInterna,
  calculoMedRessalto,
  calculoMedProfundidade,
  incertezaUA,
  incertezaUP,
  incertezaERES,
  incertezaL1,
  incertezaL2,
  incertezaUC,
  incertezaUE
};