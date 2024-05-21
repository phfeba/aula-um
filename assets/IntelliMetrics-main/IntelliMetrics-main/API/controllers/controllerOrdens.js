const db = require('../connector/conn')

// Função para registrar uma nova ordem de calibração
const registerOrder = async(pk_idOs, fk_idCliente, fk_idUsuario, titulo, tipo, descricao, dataInicio, dataTermino, contratante, email, telefone, status)  => {
    try{
        const save =  await new Promise((resolve, reject) =>{ 
            db.query(`CALL criarOrdens( '${pk_idOs}', '${fk_idCliente}', '${fk_idUsuario}', '${titulo}', '${tipo}', '${descricao}', '${dataInicio}', '${dataTermino}', '${contratante}', '${email}', '${telefone}', '${status}' )`,
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

// Função para obter todas as ordens de calibração
const getCertificateOrders = async() => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ordensServico`,
          (erro, results) => {
            if (erro) {
              reject(erro); // Rejeita a promessa em caso de erro
              return;
            }
            resolve(results); // Resolve a promessa com os resultados
          }
        );
      });
}

// CALL infosOrdens (${id_certificate}
// Função para obter uma ordem de calibração pelo seu ID 
const getOrdersById = async(id_order) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ordensServico WHERE pk_idOs = '${id_order}'`,
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

const updateOrders = async(id_antigo, pk_idOs, fk_idCliente, fk_idUsuario, titulo, tipo, descricao, dataTermino, contratante, email, telefone) =>{
    return new Promise((resolve, reject) => {
        db.query(`CALL modificarOrdem( '${id_antigo}','${pk_idOs}', '${fk_idCliente}', '${fk_idUsuario}', '${titulo}', '${tipo}', '${descricao}', '${dataTermino}', '${contratante}', '${email}', '${telefone}' )`,
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

const ordemConcluida = async(id_order) => {
    return new Promise((resolve, reject) => {
        db.query(`call concluirOrdem('${id_order}')`,
            (erro, results) => {
                if (erro) {
                    reject(500);
                    return;
                }
                else if (results.affectedRows === 0) {
                    resolve(400)
                }
                resolve(200)
            }
        );
    });
}

const ordemEmEspera = async(id_order) => {
    return new Promise((resolve, reject) => {
        db.query(`call desmarcarOrdemComoConcluida('${id_order}')`,
            (erro, results) => {
                if (erro) {
                    reject(500);
                    return;
                }
                else if (results.affectedRows === 0) {
                    resolve(400)
                }
                resolve(200)
            }
        );
    });
}

module.exports = { 
   registerOrder,
   getCertificateOrders,
   getOrdersById,
   updateOrders,
   ordemConcluida,
   ordemEmEspera
  };