const db = require('../connector/conn')

// Função para registrar um novo relatório
const registerReport = async(idRelatorio, idInstrumento, idUsuario, idPeca, inicio, termino, tempoTotal, temperaturaC, umidadeRelativa, observacoes, localDaMedicao, dia, assinatura )  => {
    try{

        const existingReport = await new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM relatorio WHERE pk_idRelatorio = '${idRelatorio}'`,
            (error, results) => {
                if (error) {
                    reject(error); // Rejeita a promessa em caso de er ro
                    return;
                }
                resolve(results); // Resolve a promessa com os resultados
            });
        })

        if (existingReport.length > 0) {
            return 409;
          }   

        const save = await new Promise((resolve, reject) =>{  
            db.query(`CALL criarRelatorio('${idRelatorio}', '${idInstrumento}', '${idUsuario}', '${idPeca}', '${inicio}', '${termino}', '${tempoTotal}', '${temperaturaC}', '${umidadeRelativa}', '${observacoes}', '${localDaMedicao}', '${dia}', '${assinatura}')`,
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
        
      
    // Verifica se a inserção foi bem-sucedida 
        if(!save){
            return 400; // Retorna 400 se não foi bem-sucedida
        } else {
            return 200; // Retorna 200 se foi bem-sucedida
        }

    } catch(error){
        console.log(error)
        return 500; // Retorna 500 em caso de erro

    }
    
}

// Função para obter todos os relatórios
const getAllReports = async() => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM relatorio`,
          (erro, results) => {
            if (erro) {
              reject(erro);
              return;
            }
            resolve(results);
          }
        );
      });
}

    // CALL infosRelatorio (${idPeca}, ${@infoUsuario}, InfoPeca, infoMaterial, InfoDesenho, infoDescricao}
// função para obter as informações de dentro do relatório
const getAllInfos = async(id_report) =>{
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM relatorio WHERE pk_idRelatorio = ${id_report}`,
            (error, results) => {
                if(error){
                    reject(error);
                    return;
                }
                resolve(results);
            }
        )
    });
}

// função para modificar o relatorio
const updateReport = async (id, novoIdRelatorio, idInstrumento, idUsuario, idPeca, Inicio, Termino, TempoTotal, TemperaturaC, UmidadeRelativa, Observacoes, LocalDaMedicao, Dia, Assinatura ) =>{

    const existingReport = await new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM relatorio WHERE pk_idRelatorio = '${id}'`,
        (error, results) => {
            if (error) {
                reject(error); // Rejeita a promessa em caso de er ro
                return;
            }
            resolve(results); // Resolve a promessa com os resultados
        });
    })

    if (existingReport.length == 0) {
        return 404;
      }   

    const update = await new Promise((resolve, reject) => {
        db.query(`CALL modificarRelatorio('${id}', '${novoIdRelatorio}', '${idInstrumento}', '${idUsuario}', '${idPeca}', '${Inicio}', '${Termino}', '${TempoTotal}', '${TemperaturaC}', '${UmidadeRelativa}', '${Observacoes}', '${LocalDaMedicao}', '${Dia}', '${Assinatura}')`,
            (error, results) => {
                if(error){
                reject(error);
                return;
                }
                resolve(results);
            }
        );
    });

    if(!update){
        return 400
    } else {
        return 200
    }
} 

module.exports = {
    registerReport,
    getAllReports,
    getAllInfos,
    updateReport
}