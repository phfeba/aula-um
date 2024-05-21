
const jwt =  require('jsonwebtoken');
const tempo = require('moment');
const dotenv = require("dotenv");
const emailIntelli = 'equipeintellimetrics@gmail.com';

// configuração do node Mailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_AUTH_SMTP,
      pass: process.env.PASS_AUTH_SMTP,
    },
  });



async function enviarEmail (req, res) {
    const email = req.body.email;
    const nome = req.body.nome;

    try {
        const verificarUser = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM usuarios WHERE email = '${email}' AND nome = '${nome}'`, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length > 0) {
                    const gestor = result[0].gestor; 
                    const estagiario = result[0].estagiario; 

                    if (gestor || estagiario) {
                        const token = jwt.sign({ email }, JWT_SCRET, { expiresIn: '10m' });
                        const resetPasswordLink = `http://intelliMetrics/resetPassword?token=${token}`;

                        const resetPasswordEmailContent = {
                            from: emailIntelli,
                            to: email,
                            subject: "Recuperação de Senha",
                            text: `Prezado(a) ${nome},\n\n Você solicitou a recuperação de senha da sua conta. Clique no link a seguir para redefinir sua senha:\n ${resetPasswordLink}\n\n Atenciosamente, Equipe IntelliMetrics`,
                            html: `<p>Prezado(a) ${nome},<br/><br/> Você solicitou a recuperação de senha da sua conta. Clique no link a seguir para redefinir sua senha:<br/><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`
                        };

                        transporter.sendMail(resetPasswordEmailContent, (err, info) => {
                            if (err) {
                                console.error("Erro ao enviar e-mail:", err);
                                res.status(500).send("Ocorreu um erro ao enviar o e-mail de recuperação de senha.");
                            } else {
                                console.log("E-mail enviado com sucesso:", info);
                                res.send("E-mail de recuperação de senha enviado com sucesso.");
                            }
                        });
                    } else {
                        res.status(403).send("Usuário não autorizado para recuperar senha.");
                    }
                } else {
                    res.status(404).send("Usuário não encontrado.");
                }
            });
        });
    } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        res.status(500).send("Ocorreu um erro ao verificar o e-mail de recuperação de senha.");
    }
}

async function recuperarSenha(req, res) {
    const email = req.body.email;
    const token = req.body.token;

    try {
        // const decoded = jwt.verify(token, JWT_SCRET);
       const verifica = db.query(`SELECT * FROM usuarios WHERE email = '${email}'`, (err, result) => {
            if (err) {
                console.error("Erro ao consultar o banco de dados:", err);
                res.status(500).send("Ocorreu um erro ao verificar o e-mail de recuperação de senha.");
                return;
            }

            if(verifica.length > 0){
                return 409;
            }
            const update = new Promise((resolve, reject) =>{  
                db.query(`'UPDATE usuarios
                SET senha = ${novaSenha}
                WHERE email = ${email};
                ')`,
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
            if(!update){
                return 400; 
            } else {
                return 200; 
            }
    
        });
    } catch (error) {
        console.error("Erro ao refefinir senha", error);
        res.status(500).send("erro ao definir senha");
    }
}
module.exports ={
    recuperarSenha,
    enviarEmail
}

