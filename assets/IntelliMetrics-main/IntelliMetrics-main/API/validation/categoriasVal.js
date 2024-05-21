const { z } = require ("zod");

const validacaoCategoria  = z.object({
    nome: z.string().min(1).max(30)
})

module.exports = validacaoCategoria;