const { z } = require ("zod");

const validacaoInstrumentos  = z.object({
    fk_idCliente: z.number(),
    fk_idOs: z.number(),
    fk_idCategoria: z.number(),
    nome: z.string().min(1).max(60),
    nSerie: z.number(),
    identificacaoCliente: z.string().min(1).max(40),
    fabricante: z.string().min(1).max(60),
    faixaNominalNum: z.enum(['0-2', '25-50', '50-75', '75-100', '100-125', '125-150', '150-175', '175-200', '1-25']),
    faixaNominalUni: z.enum(['mm', 'pol']),
    divisaoResolucaoNum: z.number(),
    divisaoResolucaoUni: z.enum(['mm', 'pol']),
    orgaoResponsavel: z.string().min(1).max(60)
})

module.exports = validacaoInstrumentos;