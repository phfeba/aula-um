const db = require("../connector/conn");

//cria um novo usuario
const createUser = async (nome, email, cargo) => {
  try {
    if (!nome || !email || !cargo) {
      return 400;
    }

    // Verificar se um usuário com o e-mail fornecido já existe
    const verificarUser = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM usuarios WHERE email = '${email}'`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
    if (verificarUser.length > 0) {
      return 409;
    }

    //Se não existir nenhum usuario com esse email cadastrado, inserir os dados do novo usuario
    const inserir = db.query(`call criarUsuario('${nome}', '${email}', '${cargo}')`
    );

    if (inserir) {
      return 200;
    } else {
      return 400;
    }
  } catch (error) {
    return 500;
  }
};

// busca o user no banco
const login = async (email, senha) => {
  try {
    if (!email || !senha) {
      return 400;
    }

    return await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM usuarios WHERE email = '${email}' and senha = '${senha}'`,
        (erro, results) => {
          if (erro) {
            reject(401);
            return;
          } else if (results.length == 0) {
            resolve(404);
            return;
          }
          resolve(results);
        }
      );
    });
  } catch (error) {
    return 500;
  }
};

// busca todos os colaboradores
const getCol = async () => {
  return await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM usuarios`, (erro, results) => {
      if (erro) {
        reject(erro);
        return;
      }
      resolve(results);
    });
  });
};
// busca o colaborador selecionado
const getColById = async (idUser) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM usuarios WHERE pk_idUsuario = '${idUser}'`,
      (erro, results) => {
        if (erro) {
          reject(erro);
          return;
        }
        resolve(results);
      }
    );
  });
};

// atualiza o estado do user para inativo
const disableUser = async (email) => {
  return new Promise((resolve, reject) => {
    db.query(`call excluirUsuario('${email}')`, (erro, results) => {
      if (erro) {
        reject(500);
        return;
      } else if (results.affectedRows === 0) {
        resolve(400);
      }
      resolve(200);
    });
  });
};

//atualiza o status do user para ativo
const enableUser = async (email) => {
  return new Promise((resolve, reject) => {
    db.query(`call reativarUsuario('${email}')`, (erro, results) => {
      if (erro) {
        reject(500);
        return;
      } else if (results.affectedRows === 0) {
        resolve(400);
      }
      resolve(200);
    });
  });
};

// atualiza a senha do colaborador
const putPass = async (email, senhaNova) => {
  // Verificar se um usuário com o e-mail fornecido já existe
  const verificarUser = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM usuarios WHERE email = '${email}'`,
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });

  if (verificarUser.length == 0) {
    return 404;
  }

  return new Promise((resolve, reject) => {
    db.query(
      `call redefinirSenha('${email}', '${senhaNova}')`,
      (erro, results) => {
        if (erro) {
          reject(erro);
          return;
        } else if (results.affectedRows == 0) {
          resolve(400);
        }
        resolve(200);
      }
    );
  });
};

// atualiza informaçoes do user
const putUser = async (nome, email, cargo) => {
  try {
    if (!nome || !email || !cargo) {
      return 400;
    }

    const update = db.query(
      `call modificarUsuario('${email}', '${nome}', '${cargo}')`
    );
    console.log(update);
    if (update) {
      return 200;
    } else {
      return 400;
    }
  } catch (error) {
    return 500;
  }
};

module.exports = {
  createUser,
  getCol,
  getColById,
  disableUser,
  enableUser,
  putPass,
  putUser,
  login,
};
