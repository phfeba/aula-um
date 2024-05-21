/**
 * @swagger
 * tags:
 *   - name: Relatorios
 *     description: Operações relacionadas aos relatorios de calibração
 * definitions:
 *  relatorio:
 *     type: object
 *     properties:
 *       idRelatorio:
 *         type: integer 
 *       idInstrumento:
 *         type: integer
 *       idUsuario:
 *         type: integer
 *       idPeca:
 *         typer: integer 
 *       inicio:
 *         typer: string
 *         pattern: 09:00
 *       termino:
 *         type: string
 *         pattern: 10:00
 *       tempoTotal:
 *         type: string
 *         pattern: 20:03
 *       temperaturaC:
 *         type: string
 *         pattern: 20°C 
 *       umidadeRelativa:
 *         type: string 
 *         pattern: 10%
 *       observacoes:
 *         type: string
 *         nullable: true 
 *       localDaMedicao:
 *         type: string
 *         pattern: sala 1
 *       dia:
 *         type: string
 *         pattern: 2024-02-03
 *       assinatura:
 *         type: string
 * 
 *  upRelatorio:
 *     type: object
 *     properties:
 *       novoIdRelatorio:
 *         type: integer 
 *       idInstrumento:
 *         type: integer
 *       idUsuario:
 *         type: integer
 *       idPeca:
 *         typer: integer
 *       inicio:
 *         typer: string
 *         pattern: 09:00
 *       termino:
 *         type: string
 *         pattern: 10:00
 *       tempoTotal:
 *         type: string
 *         pattern: 20:03
 *       temperaturaC:
 *         type: string
 *         pattern: 40°C 
 *       umidadeRelativa:
 *         type: string 
 *         pattern: 30%
 *       observacoes:
 *         type: string
 *         nullable: true
 *       localDaMedicao:
 *         type: string
 *         pattern: sala 2
 *       dia:
 *         type: string
 *         pattern: 2024-03-06
 *       assinatura:
 *         type: string
 * 
 * /registerReport:
 *   post:
 *     tags:
 *       - Relatorios
 *     summary: cadastro de relatorio
 *     description: cadastra um novo relatorio de calibração no banco de dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/relatorio'
 *     responses:
 *       200:
 *         description: Relatorio cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar relatorio
 *       409:
 *         description: ID ja cadastrada
 *       500:
 *         description: Erro interno do servidor
 * 
 * /getAllReports:
 *  get:
 *    tags:
 *      - Relatorios
 *    summary: retorna relatorios
 *    description: retorna todos os relatorios cadastrados
 *    responses:
 *      200:
 *        description: Retorna todos os relatorios
 *      500:
 *        description: Erro interno do servidor
 * 
 * /infoReport/{id}:
 *  get:
 *    tags:
 *      - Relatorios
 *    summary: retorna dados do relatorio
 *    description: retorna os dados do relatorio com base em um id especifico
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Retorna os dados do relatorio correspondente ao id fornecido.
 *      404:
 *        description: Relatorio inexistente
 *      500:
 *        description: Erro interno do servidor.
 * 
 * /updateReports/{id}:
 *   put:
 *     tags:
 *       - Relatorios
 *     summary: atualiza o relatorio
 *     description: atualiza os dados do relatorio especificado pelo id 
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/upRelatorio'
 *     responses:
 *       200:
 *         description: Relatório atualizado
 *       404:
 *         description: Relatório não encontrado
 *       400:
 *         description: Erro ao atualizar relatório
 *       500:
 *         description: Erro interno do servidor
 *
 */
