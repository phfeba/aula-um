const db = require('../connector/conn');

const registerCategoria = async(nome) => {
    
    const save = db.query(`CALL cadastrarCategoria( '${nome}' )`);

    if (!save) {
        return 400;
    } else {
        return 200;
    }
}

const updateCategoria = async(idCategoria, nome) => {

    const verificarCategoria = await new Promise((resolve, reject) => {
        db.query(`SELECT * FROM categorias WHERE pk_idCategoria = '${idCategoria}'`,
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            }
        );
    });
        
    if (verificarCategoria.length == 0) {
        return 404;
    }

    return new Promise((resolve, reject) => {
        db.query(`CALL modificarCategoria('${idCategoria}', '${nome}')`,   
            (error, results) => {
                if (error) {
                    reject (error);
                    return;
                }
                resolve (200); 
            }
        );
    });
}

const getCategorias = async() => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from categorias`,
            (error, results) => {
                if(error) {
                    reject(error); // Rejeita a promessa em caso de erro
                    return;
                }
                resolve(results); // Resolve a promessa com os resultados
            }
        );
    });
}
module.exports = {
    registerCategoria,
    updateCategoria,
    getCategorias
}