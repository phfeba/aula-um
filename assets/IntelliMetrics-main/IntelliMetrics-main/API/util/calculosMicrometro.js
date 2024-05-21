const { media, desvpad, arredondarParaCima } = require("./funcoesCalculos");
const jStat = require("jstat");

function calculoPlaneza(CMovel, CFixo, req) {
  // Desvio padrao do CMovel
  // Calcula a média dos valores de CMovel
  const mediaCM = media(CMovel);

  // Calcula o desvio padrãzo da amostra CMovel
  const desvioPadraoCM = desvpad(CMovel) * 0.0003;

  //Desvio padrao do CFixo
  // Calcula a média dos valores CFixo
  const mediaCF = media(CFixo);

  // Calcula o desvio padrão da amostra CFixo
  const desvioPadraoCF = desvpad(CFixo) * 0.0003;

  // Calcula a planeza média das amostras
  const planezaMedia = ((mediaCM + mediaCF) / 2) * 0.0003;
  const planezaMediaTratada = parseFloat(planezaMedia.toFixed(4));

  req.CMovel = desvioPadraoCM
  req.CFixo = desvioPadraoCF
  req.planezaMedia = planezaMedia

  const resultados = {
    media_CMovel: mediaCM,
    media_CFixo: mediaCF,
    desvioPadraoCMovel: desvioPadraoCM,
    desvioPadraoCFixo: desvioPadraoCF,
    planezaMedia: planezaMediaTratada,
  };
  
  return resultados;
}

function calculoParalelismo(dadosParalelismo, req) {

  const ultmos3 = [
    dadosParalelismo[3],
    dadosParalelismo[4],
    dadosParalelismo[5],
  ];

  const mediaParalelismo = media(ultmos3);

  const resultadoMedicao = [
    dadosParalelismo[0],
    dadosParalelismo[1],
    dadosParalelismo[2],
    mediaParalelismo,
  ];

  const NFranjas = Math.max(...resultadoMedicao);

  const valormm = NFranjas * 0.0003;
  const valormmTratado = parseFloat(valormm.toFixed(4));

  const resultados = {
    resultado1: dadosParalelismo[0],
    resultado2: dadosParalelismo[1],
    resultaod3: dadosParalelismo[2],
    resultado4: mediaParalelismo,
    nFranjas: NFranjas,
    valorEmMilimetro: valormmTratado,
  };


  const desvPadparalelismo = desvpad(ultmos3);

  req.desvpadPara3Ult = desvPadparalelismo;
  req.valParaMM = valormm;

  return resultados;
}

function controleDimensional(dadosControle, faixaCalibrada, req) {
  const list0_25 = [
    0.0, 2.5, 5.1, 7.7, 10.3, 12.9, 15.0, 17.6, 20.2, 22.8, 25.0,
  ];
  const list1_25 = [
    1.0, 3.5, 6.1, 8.7, 11.3, 13.9, 16.0, 18.6, 21.2, 23.8, 25.0,
  ];
  const list25_50 = [
    25.0, 27.5, 30.1, 32.7, 35.3, 37.9, 40.0, 42.6, 45.2, 47.8, 50.0,
  ];
  const list50_75 = [
    50.0, 52.5, 55.1, 57.7, 60.3, 62.9, 65.0, 67.6, 70.2, 72.8, 75.0,
  ];
  const list75_100 = [
    75.0, 77.5, 80.1, 82.7, 85.3, 87.9, 90.0, 92.6, 95.2, 97.8, 100.0,
  ];
  const list100_125 = [
    100.0, 102.5, 105.1, 107.7, 110.3, 112.9, 115.0, 117.6, 120.2, 122.8, 125.0,
  ];
  const list125_150 = [
    125.0, 127.5, 130.1, 132.7, 135.3, 137.9, 140.0, 142.6, 145.2, 147.8, 150.0,
  ];
  const list150_175 = [
    150.0, 152.5, 155.1, 157.7, 160.3, 162.9, 165.0, 167.6, 170.2, 172.8, 175.0,
  ];
  const list175_200 = [
    175.0, 177.5, 180.1, 182.7, 185.3, 187.9, 190.0, 192.6, 195.2, 197.8, 120.0,
  ];
  const mediaValor = [];
  const desvioP = [];
  const tendencias = [];
  let tendencia = 0;
  let soma = 0;
  let ultimoValor = req.ultimoValor;

  for (let i = 0; i < dadosControle.length; i++) {
    for (let y = 0; y < 3; y++) {
      switch (y) {
        case 1:
          switch (faixaCalibrada) {
            case 0:
              // tendencia
              tendencia = (mediaValor[i] - list0_25[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list0_25[10];
              req.ultimoValor = ultimoValor;
              break;
            case 1:
              tendencia = (mediaValor[i] - list1_25[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list1_25[10];
              req.ultimoValor = ultimoValor;
              break;

            case 25:
              tendencia = (mediaValor[i] - list25_50[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list25_50[10];
              req.ultimoValor = ultimoValor;
              break;

            case 50:
              tendencia = (mediaValor[i] - list50_75[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list50_75[10];
              req.ultimoValor = ultimoValor;
              break;

            case 75:
              tendencia = (mediaValor[i] - list75_100[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list75_100[10];
              req.ultimoValor = ultimoValor;
              break;

            case 100:
              tendencia = (mediaValor[i] - list100_125[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list100_125[10];
              req.ultimoValor = ultimoValor;
              break;

            case 125:
              tendencia = (mediaValor[i] - list125_150[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list125_150[10];
              req.ultimoValor = ultimoValor;
              break;

            case 150:
              tendencia = (mediaValor[i] - list150_175[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list150_175[10];
              req.ultimoValor = ultimoValor;
              break;

            case 175:
              tendencia = (mediaValor[i] - list175_200[i]).toFixed(3);
              tendencias.push(parseFloat(tendencia));
              ultimoValor = list175_200[10];
              req.ultimoValor = ultimoValor;
              break;
            default:
              return "Não consta faixa calibrada";
          }
          break;

        case 2:
          // desvio padrao
          const desvioPadrao = desvpad(dadosControle[i]);
          desvioP.push(desvioPadrao);
          break;
        default:
          // media
          const mediaV = media(dadosControle[i]);
          mediaValor.push(mediaV);
      }
    }
    soma += Math.pow(desvioP[i], 2);
  }

  let desvioPadraoMedio = Math.sqrt(soma / 22);
  req.desvpadMedio += desvioPadraoMedio;

  const response = {};

  for (let index = 0; index < mediaValor.length; index++) {
    response[`resultado${index + 1}`] = {
      "media do valor": mediaValor[index],
      "desvio padrao": desvioP[index],
      "tendência ": tendencias[index],
    };
  }
  response.desvioPadraoMedio = parseFloat(desvioPadraoMedio.toFixed(4));

  return response;
}

// Calculos incerteza

function incerteza_medAU(req) {
  const listaIncerteza = req.incerteza;

  const incertezaPD = (req.desvpadMedio / Math.sqrt(3)).toFixed(5);

  const contriIncerteza = (incertezaPD / 1) * 1;

  listaIncerteza.push(parseFloat(contriIncerteza));
  req.incerteza = listaIncerteza;

  const response = {
    incerteza_AU: parseFloat(incertezaPD),
    contribuiçao_Incerteza: contriIncerteza,
  };

  return response;
}

function incerteza_UP(req) {
  const incertezaPD = (0.07 + req.ultimoValor / 1500) / 1000;

  const contriIncerteza = (incertezaPD / 2) * 1;

  const response = {
    incertezaPD: parseFloat(incertezaPD.toFixed(5)),
    contribuiçao_Incerteza: parseFloat(contriIncerteza.toFixed(5)),
  };

  return response;
}

function incerteza_medERES(valorDivResolucao, dig_anal, req) {
  const listaIncerteza = req.incerteza;

  let incertezaEres = 0;

  switch (dig_anal) {
    case 0:
      incertezaEres = valorDivResolucao / 10;
      break;
    case 1:
      incertezaEres = valorDivResolucao / 2;
      break;
  }

  const contriIncerteza = incertezaEres / Math.sqrt(3);

  listaIncerteza.push(parseFloat(contriIncerteza));
  req.incerteza = listaIncerteza;

  const response = {
    incerteza_medERES: parseFloat(incertezaEres.toFixed(5)),
    contribuição_Incerteza: parseFloat(contriIncerteza.toFixed(5)),
  };

  return response;
}

function incertez_medl1(req) {
  const listaIncerteza = req.incerteza;

  const incertezamedl1 = req.ultimoValor * 0.00001 * 2;

  const contriIncerteza = incertezamedl1 / Math.sqrt(3);

  listaIncerteza.push(parseFloat(contriIncerteza));
  req.incerteza = listaIncerteza;

  const response = {
    incertez_medl1: parseFloat(incertezamedl1.toFixed(5)),
    contribuição_Incerteza: parseFloat(contriIncerteza.toFixed(5)),
  };

  return response;
}

function incertez_medl2(req) {
  const listaIncerteza = req.incerteza;

  const incertezamedl2 = req.ultimoValor * ((0.0000115 + 0.00001) / 2) * 2;

  const contriIncerteza = incertezamedl2 / Math.sqrt(3);

  listaIncerteza.push(parseFloat(contriIncerteza));
  req.incerteza = listaIncerteza;

  const response = {
    incertez_medl2: parseFloat(incertezamedl2.toFixed(5)),
    contribuição_Incerteza: parseFloat(contriIncerteza.toFixed(5)),
  };

  return response;
}

function incerteza_medPAR(valorDivResolucao, dig_anal, req) {
  const listaIncerteza = req.incerteza;

  let incertezaPar = 0;

  switch (dig_anal) {
    case 0:
      incertezaPar = valorDivResolucao / 4;
      break;
    case 1:
      incertezaPar = 0;
      break;
  }

  const contriIncerteza = incertezaPar / (Math.sqrt(3) * 1);

  listaIncerteza.push(parseFloat(contriIncerteza));
  req.incerteza = listaIncerteza;

  const response = {
    incerteza_medPAR: parseFloat(incertezaPar.toFixed(5)),
    contribuoção_incereteza: parseFloat(contriIncerteza.toFixed(5)),
  };

  return response;
}

function incertez_medEader(req) {
  const listaIncerteza = req.incerteza;

  let incertezaPD = 0;

  switch (req.ultimoValor) {
    case 50:
      incertezaPD = 0.00019;
      break;
    case 75:
      incertezaPD = 0.00021;
      break;
    case 100:
      incertezaPD = 0.00023;
      break;
    case 125:
      incertezaPD = 0.00024;
      break;
    case 150:
      incertezaPD = 0.00034;
      break;
    case 175:
      incertezaPD = 0.00036;
      break;
    case 200:
      incertezaPD = 0.00037;
      break;
    default:
      return "Fora de faixa";
  }

  const contriIncerteza = (incertezaPD / Math.sqrt(3)) * 1;

  listaIncerteza.push(parseFloat(contriIncerteza));
  req.incerteza = listaIncerteza;

  const response = {
    incertezaPD: parseFloat(incertezaPD.toFixed(5)),
    contribuoção_incereteza: parseFloat(contriIncerteza.toFixed(5)),
  };

  return response;
}

function incertezaUC(req) {
  const somaQuadrados = req.incerteza.reduce(
    (acc, val) => acc + Math.pow(val, 2),
    0
  );

  const raiz = Math.sqrt(somaQuadrados).toFixed(4);

  let veff = Math.pow(raiz, 4) / (Math.pow(req.incerteza[0], 4) / 2);

  veff = veff > 50 ? 50 : veff;

  const K = jStat.studentt.inv(1 - 0.0455 / 2, veff);
  const K_Resposta = K.toFixed(2);

  const U = raiz * K;
  const U_Arredondado = arredondarParaCima(U);

  const response = {
    UC: parseFloat(raiz),
    veff: parseFloat(veff),
    "K=": parseFloat(K_Resposta),
    "U=": parseFloat(U_Arredondado.toFixed(3)),
  };

  return response;
}

// incerteza pararelismo 0-25

function incetPara0_25(req) {
  let incertezaAU = (req.desvpadPara3Ult * 0.0003) / Math.sqrt(3);

  incertezaAU = incertezaAU == 0 ? 0.0001 : incertezaAU;

  const contriIncertezaAU = incertezaAU / 1 * 1

  const contriIncertezaUp = 0.00005 / 2 * 1

  const contriIncertezaEres = 0.00036 / Math.sqrt(3) * 1

  const lista25 = [contriIncertezaAU, contriIncertezaUp, contriIncertezaEres]

  const somaQuadrados = lista25.reduce((acc, val) => acc + Math.pow(val, 2),0);

  const raizUC = Math.sqrt(somaQuadrados).toFixed(4);  

  let veff = Math.pow(raizUC, 4) / ((Math.pow(contriIncertezaAU, 4)) / 2); 

 
  const K = jStat.studentt.inv(1 - 0.0455 / 2, veff);
  const K_Resposta = K.toFixed(2);

  const U = raizUC * K;
  const U_Arredondado = arredondarParaCima(U);

  const response = { incertezaAU: parseFloat(incertezaAU.toFixed(5)), contribuoção_incereteza: parseFloat(contriIncertezaAU.toFixed(5)), contribuoção_incereteza_Up: parseFloat(contriIncertezaUp.toFixed(5)), contribuoção_incereteza_Eres: parseFloat(contriIncertezaEres.toFixed(5)), Uc: parseFloat(raizUC), veff: parseFloat(veff),"k=": parseFloat(K_Resposta), "U=":parseFloat(U_Arredondado.toFixed(3))};

  return response;
}

function incertplaneza0_25(req){
  let incertezaAU = (Math.pow(req.CMovel, 2) + Math.pow(req.CFixo, 2)) / 4;

  console.log(incertezaAU)
  incertezaAU = incertezaAU == 0 ? 0.0001 : incertezaAU;

  const contriIncertezaAU = incertezaAU / 1 * 1;
  
  const contriIncertezaUp = 0.00005 / 2 * 1;

  const contriIncertezaEres  = 0.00012 / Math.sqrt(3) * 1;

  const lista25 = [contriIncertezaAU, contriIncertezaUp, contriIncertezaEres];

  const somaQuadrados = lista25.reduce((acc, val) => acc + Math.pow(val, 2),0);

  const raizUC = Math.sqrt(somaQuadrados).toFixed(4);  

  let veff = Math.pow(raizUC, 4) / ((Math.pow(contriIncertezaAU, 4)) / 2); 

  const K = jStat.studentt.inv(1 - 0.0455 / 2, veff);
  const K_Resposta = K.toFixed(2);

  const U = raizUC * K;
  const U_Arredondado = arredondarParaCima(U);

  const response = { incertezaAU: parseFloat(incertezaAU.toFixed(5)), contribuoção_incereteza: parseFloat(contriIncertezaAU.toFixed(5)), contribuoção_incereteza_Up: parseFloat(contriIncertezaUp.toFixed(5)), contribuoção_incereteza_Eres: parseFloat(contriIncertezaEres.toFixed(5)), Uc: parseFloat(raizUC), veff: parseFloat(veff),"k=": parseFloat(K_Resposta), "U=":parseFloat(U_Arredondado.toFixed(3))}

  return response
}

module.exports = {
  calculoPlaneza,
  calculoParalelismo,
  controleDimensional,
  incerteza_medAU,
  incerteza_UP,
  incerteza_medERES,
  incertez_medl1,
  incertez_medl2,
  incerteza_medPAR,
  incertez_medEader,
  incertezaUC,
  incetPara0_25,
  incertplaneza0_25
};
