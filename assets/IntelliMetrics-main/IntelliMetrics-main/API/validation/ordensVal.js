const { z } = require ("zod");

const validacaoOrdens  = z.object({
    titulo: z.string().min(1).max(30),
    tipo: z.enum(['calibracao', 'medicao']),
    descricao: z.string().min(1).max(300),
    // dataInicio: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    // dataTermino: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    contratante: z.string().min(1).max(60),
    email: z.string().email("E-mail inválido!").min(1).max(60),
    telefone: z.string().length(11, "Numero inválido!"),
    status: z.enum(['em espera', 'concluida']).default('em espera')
})

module.exports = validacaoOrdens;