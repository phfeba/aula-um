const db = require('../connector/conn')

// controller para fazer os insert do recibo 
const registerReceipt = async(idOrdem, idUsuario, setor, nProposta, nNotaFiscal, dataDeRecebimento, recebidoNaPrevisao, previsaoInicio, previsaoTermino, clienteConcorda, dataAssinatura, pessoaContatada, dataContatada) =>{
    try{
        const insert = await new Promise((resolve, reject)=>{ 

            db.query(` CALL inserirRecebimento('${idOrdem}' '${idUsuario}', '${setor}','${nProposta}', '${nNotaFiscal}', '${dataDeRecebimento}', '${recebidoNaPrevisao}', '${previsaoInicio}', '${previsaoTermino}', '${clienteConcorda}, '${dataAssinatura}', '${pessoaContatada}', '${dataContatada}' )`,
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

        if(!insert){
            return 400;
        }else if (insert) {
            return 200;
        } else if (insert.length > 0) {
            return 409;
        }else{
            return 500;
        }

    }catch(error){
        console.log(error)
    }
}


// controller para alteração do recibo 
const updateReceipt = async(idRecebimento, idOrdem, setor, nProposta, nNotaFiscal, dataDeRecebimento, recebidoNaPrevisao, previsaoInicio, previsaoTermino, clienteConcorda, dataAssinatura, pessoaContatada, dataContatada) =>{
    return new Promise((resolve, reject) =>{
        db.query(` CALL modificarRecebimento('${idRecebimento}' '${idOrdem}', '${setor}','${nProposta}', '${nNotaFiscal}', '${dataDeRecebimento}', '${recebidoNaPrevisao}', '${previsaoInicio}', '${previsaoTermino}', '${clienteConcorda}', '${dataAssinatura}','${pessoaContatada}','${dataContatada}')`,
            (error, results) => {
                if (error){
                    reject (error);
                    return;
                } else {
                    resolve (results)
                }
            }     
        );
    });
}


// controller para visualizar o recibo pelo seu ID
const getReceiptById = async(idOrdem, infoTipo,  infoContratante, infoEmail, infoTelefone, infoClient) =>{
    return new Promise((resolve, reject) =>{
        db.query(` CALL infosRecebidos('${idOrdem}','${infoTipo}', '${infoContratante}', '${infoEmail}', '${infoTelefone}', '${infoClient}')`,
            (error, results) => {
                if (error){
                    reject (error);
                    return;
                } else {
                    resolve (results)
                }
            }
        );
    });
}

// controller para visualizar  todos os recibos 
const getAllReceipt = async () => {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM recebidos`,
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

module.exports={
    registerReceipt, 
    updateReceipt,
    getReceiptById,
    getAllReceipt
}
