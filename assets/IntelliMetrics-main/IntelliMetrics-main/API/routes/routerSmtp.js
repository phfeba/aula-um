const router = require("express").Router();
const controllerSmtp = require("../controllers/controllerSmtp");

router.post('requestReset', controllerSmtp.enviarEmail);
router.post('resetPassword', controllerSmtp.recuperarSenha);
