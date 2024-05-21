const db = require('../connector/conn');


// controller para inserir o paralelismo micrômetro 

const insertMicrometro = async( novovalorNominal1,novovalorNominal2,novovalorNominal3,novovalorNominal4,novocMovelcFixo1, novocMovelcFixo2,novocMovelcFixo3,novocMovelcFixo4,novocMovelcFixo5, novocMovelcFixo6 ) =>{

    try{
      const insert = await new Promise(( resolve, reject ) => {
        db.query(` CALL criarParalelismoMicro('${ novovalorNominal1}', '${ novovalorNominal2}', '${ novovalorNominal3}', '${novovalorNominal4}', '${novocMovelcFixo1}', '${novocMovelcFixo2}', '${novocMovelcFixo3}', '${novocMovelcFixo4}', '${novocMovelcFixo5}', '${novocMovelcFixo6}')`,
        
        (error, results) =>{
          if(error){
          reject(error);
          return;
        }else{
          resolve(results);
        
        }
      }
    );
  });
  
  if(!insert){
    return 400;
  }else{
    return 200;
  }
    }catch(error){
      console.log(error);
      return 500;
    }
  
  }

// controller para atualizar o paralelismo micrometro

const upMicroParalelismo = async(idParalelismo,  novovalorNominal1,  novovalorNominal2, novovalorNominal3,  novovalorNominal4,  novocMovelcFixo1,  novocMovelcFixo2,  novocMovelcFixo3,  novocMovelcFixo4,  novocMovelcFixo5,  novocMovelcFixo6 )=>{

    const existing = await new Promise((resolve, reject) =>{
      db.query(`SELECT * FROM paralelismoMicro WHERE  idParalelismo = '${idParalelismo}'`,
      (error, results) =>{
        if(error){
          reject(error);
          return;
        }
        resolve(results);
      });
    });
    if(existing.length == 0){
      return 404;
    }
  
  
    return new Promise((resolve, reject) =>{
      db.query(` CALL modificarParalelismoMicro('${idParalelismo}', '${novovalorNominal1}', '${novovalorNominal2}', '${ novovalorNominal3}', '${ novovalorNominal4}', '${ novocMovelcFixo1}', '${ novocMovelcFixo2}', '${ novocMovelcFixo3}' , '${ novocMovelcFixo4}' ,'${ novocMovelcFixo5}' ,'${ novocMovelcFixo6}' )`,
        (error, results) =>{
          if(error){
            reject(400, error);
            return;
          }
          results(200);
        }
      );
    });
  }

// controller para  inserir o controle dimencional 

const insertDimensionalMicro = async(novoVp1,novoVp1_1,novoVp1_2, novoVp1_3,novoVp2,novoVp2_1,novoVp2_2,novoVp2_3,novoVp3,novoVp3_1,novoVp3_2, novoVp3_3,novoVp4,novoVp4_1, novoVp4_2, novoVp4_3,novoVp5, novoVp5_1, novoVp5_2,novoVp5_3, novoVp6,novoVp6_1, novoVp6_2,novoVp6_3, novoVp7,novoVp7_1, novoVp7_2, novoVp7_3,novoVp8,novoVp8_1, novoVp8_2, novoVp8_3,novoVp9, novoVp9_1, novoVp9_2, novoVp9_3,novoVp10,novoVp10_1, novoVp10_2, novoVp10_3, novoVp11, novoVp11_1, novoVp11_2, novoVp11_3 )=>{

    try{
        const insert = await new Promise(( resolve, reject ) => {
          db.query(` CALL criarControleDimensional('${novoVp1 }', '${novoVp1_1 }', '${novoVp1_2}', '${novoVp1_3}', '${novoVp2}', '${novoVp2_1}', '${novoVp2_2}', '${novoVp2_3 }', '${novoVp3}', '${novoVp3_1}','${novoVp3_2}','${novoVp3_3}','${novoVp4}','${novoVp4_1}','${novoVp4_2}','${novoVp4_3}','${novoVp5}','${novoVp5_1}','${novoVp5_2}','${novoVp5_3}','${novoVp6}','${novoVp6_1}','${novoVp6_2}','${novoVp6_3}','${ novoVp7}','${novoVp7_1}','${novoVp7_2}','${novoVp7_3}','${novoVp8}','${novoVp8_1}','${novoVp8_2}','${novoVp8_3}','${novoVp9}','${novoVp9_1}','${novoVp9_2}','${novoVp9_3}','${novoVp10}','${novoVp10_1}','${novoVp10_2}','${novoVp10_3}','${ novoVp11}','${novoVp11_1}','${novoVp11_2}','${novoVp11_3}',)`,
          
          (error, results) =>{
            if(error){
            reject(error);
            return;
          }else{
            resolve(results);
          
          }
        }
      );
    });
    
    if(!insert){
      return 400;
    }else{
      return 200;
    }
      }catch(error){
        console.log(error);
        return 500;
      }
    

}

//controller para alterar o controle dimencional

const upDimencionalMicro = async(idControle, alterarVp1,alterarVp1_1, alterarVp1_2, alterarVp1_3, alterarVp2,alterarVp2_1,alterarVp2_2, alterarVp2_3,alterarVp3,alterarVp3_1, alterarVp3_2, alterarVp3_3, alterarVp4,alterarVp4_1, alterarVp4_2, alterarVp4_3, alterarVp4,alterarVp4_1, alterarVp4_2,alterarVp4_3, alterarVp5, alterarVp5_1, alterarVp5_2, alterarVp5_3, alterarVp6,alterarVp6_1, alterarVp6_2, alterarVp6_3,alterarVp7, alterarVp7_1, alterarVp7_2, alterarVp7_3,  alterarVp8,alterarVp8_1, alterarVp8_2, alterarVp8_3, alterarVp9, alterarVp9_1, alterarVp9_2, alterarVp9_3, alterarVp10, alterarVp10_1, alterarVp10_2, alterarVp10_3,  alterarVp11, alterarVp11_1, alterarVp11_2, alterarVp11_3 )=>{

    const existing = await new Promise((resolve, reject) =>{
      db.query(`SELECT * FROM paralelismoMicro WHERE  idControle = '${idControle}'`,
      (error, results) =>{
        if(error){
          reject(error);
          return;
        }
        resolve(results);
      });
    });
    if(existing.length == 0){
      return 404;
    }
    return new Promise((resolve, reject) =>{
      db.query(` CALL modificarControleDimensional('${idControle}','${alterarVp1}','${alterarVp1_1}','${alterarVp1_2}','${alterarVp1_3}','${alterarVp2}','${alterarVp2_1}','${alterarVp2_2}','${alterarVp2_3}','${alterarVp3}','${alterarVp3_1}','${alterarVp3_2}','${alterarVp3_3}','${alterarVp4}','${alterarVp4_1}','${alterarVp4_2}','${alterarVp4_3}','${alterarVp4}','${alterarVp4_1}','${alterarVp4_2}','${alterarVp4_3}','${alterarVp5}','${alterarVp5_1}','${alterarVp5_2}','${alterarVp5_3}','${alterarVp6}','${alterarVp6_1}','${alterarVp6_2}','${alterarVp6_3}','${alterarVp7}','${alterarVp7_1}','${alterarVp7_2}','${alterarVp7_3}','${ alterarVp8}','${alterarVp8_1}','${alterarVp8_2}','${alterarVp8_3}','${alterarVp9}','${alterarVp9_1}','${alterarVp9_2}','${alterarVp9_3}','${alterarVp10}','${alterarVp10_1}','${alterarVp10_2}','${alterarVp10_3}','${alterarVp11}','${alterarVp11_1}','${alterarVp11_2}','${alterarVp11_3}'  )`,
        (error, results) =>{
          if(error){
            reject(400, error);
            return;
          }
         resolve(results);
        }
      );
    });
  }

// controller para inserir o resultado do micrometro
const insertResult = async(nrCertificado,idControle,idPlaneza,idParalelismoMicro,idInstrumento,novoTecnico,novoResponsável,novaFaixaCalibradaNum,novaFaixaCalibradaUni, novaDataCalibracao,novaInspecao, novoTipoEscala, novaVersaoMetodo,novoTempInicial, novoTempFinal)  => {
    try{
        const save =  await new Promise((resolve, reject) =>{ 
            db.query(`CALL criarOrdens('${nrCertificado}', '${idControle}', '${idPlaneza}','${idParalelismoMicro}','${idInstrumento}','${novoTecnico}','${novoResponsável}','${novaFaixaCalibradaNum}','${novaFaixaCalibradaUni}','${novaDataCalibracao}','${novaInspecao}','${novoTipoEscala}','${novaVersaoMetodo}','${novoTempInicial}','${novoTempFinal}') )`,
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    } else {
                        resolve(results);
                    }
                }
            );
      });

     // Verificar se a inserção foi bem-sucedida
        if(!save){
            return 400; // Retorna status 400 se não foi bem-sucedido
        } else {
            return 200; // Retorna status 200 se foi bem-sucedido
        }

    } catch(error){
        console.log(error)
        return 500; // Retorna status 500 em caso de erro
    }   
}

// controller para alterar o resultado do micrometro
const upResultMicro = async(antigoNrCertificad,alterarNrCertificado,idControle, idPlaneza, idParalelismoMicro,  idInstrumento, alterarTecnico,  alterarResponsável, alterarFaixaCalibradaNum, alterarFaixaCalibradaUni, alterarDataCalibracao, alterarInspecao, alterarTipoEscala, alterarVersaoMetodo, alterarTempInicia, alterarTempFinal)=>{

    const existing = await new Promise((resolve, reject) =>{
      db.query(`SELECT * FROM paralelismoPaq WHERE antigoNrCertificad = '${antigoNrCertificad}'`,
      (error, results) =>{
        if(error){
          reject(error);
          return;
        }
        resolve(results);
      });
    });
    if(existing.length == 0){
      return 404;
    }
  
  
    return new Promise((resolve, reject) =>{
      db.query(` CALL alterarParalelismoPaq('${antigoNrCertificad}','${alterarNrCertificado}','${idControle}','${idPlaneza}','${idParalelismoMicro}','${ idInstrumento}','${alterarTecnico}','${ alterarResponsável}','${alterarFaixaCalibradaNum}','${alterarFaixaCalibradaUni}','${alterarDataCalibracao}','${alterarInspecao}','${alterarTipoEscala}','${alterarVersaoMetodo}','${alterarTempInicia}','${alterarTempFinal}' )`,
        (error, results) =>{
          if(error){
            reject(400, error);
            return;
          }
          results(200);
        }
      );
    });
  }

//





  module.exports ={
    insertMicrometro,
    upMicroParalelismo, 
    insertDimensionalMicro,
    upDimencionalMicro, 
    insertResult, 
    upResultMicro

  }


