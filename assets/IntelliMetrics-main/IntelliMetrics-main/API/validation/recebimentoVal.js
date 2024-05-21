const { z } = require ("zod");

const validacaoRecebimentos  = z.object({
    idOs: z.number(),
    idUsuario: z.number(),
    setor: z.string().min(1).max(30),
    nProposta: z.number(),
    nNotaFiscal: z.number(),
    dataDeRecebimento: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    recebidoNaPrevisao: z.enum(['sim', 'não']),
    previsaoInicio: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    previsaoTermino: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    clienteConcorda: z.enum(['sim', 'não']),
    dataAssinatura: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    pessoaContatada: z.string().min(1).max(60),
    dataContatada: z.date({ invalid_type_error: "Precisa ser do tipo date"})
})

module.exports = validacaoRecebimentos;