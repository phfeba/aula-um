const { z } = require ("zod");

const validacaoRelatorios  = z.object({
    idInstrumento: z.number(),
    idUsuario: z.number(), 
    idPeca: z.number(), 
    // inicio: z.string().time({ precision: 0 }), 
    // termino: z.string().time({ precision: 0 }),
    // tempoTotal: z.string().time({ precision: 0 }), 
    temperaturaC: z.string().min(1).max(20), 
    umidadeRelativa: z.string().min(1).max(20),
    observacoes: z.string().min(1).max(300),
    localDaMedicao: z.string().min(1).max(100),
    dia: z.date({ invalid_type_error: "Precisa ser do tipo date"}),
    assinatura: z.string().min(1).max(100)
})

module.exports = validacaoRelatorios;