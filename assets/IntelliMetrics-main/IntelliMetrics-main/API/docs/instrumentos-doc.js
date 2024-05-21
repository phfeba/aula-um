/**
 * @swagger
 * tags:
 *   - name: Instrumentos
 *     description: Todas as operações referentes a Instrumentos
 * definitions:
 *   instrumento:
 *     type: object
 *     properties:
 *       fk_idCliente:
 *         type: number
 *       fk_idOs:
 *         type: number
 *       fk_idCategoria:
 *         type: number
 *       nome:
 *         type: string
 *         pattern: paquimetro
 *       nSerie:
 *         type: number
 *       identificacaoCliente:
 *         type: string
 *         pattern: 50a 
 *       fabricante:
 *         type: string
 *         pattern: Mitutoyo 
 *       faixaNominalNum:
 *         type: string
 *         pattern: 0-2 / 1-25 / 25-50 / 50-75 / 75-100 / 100-125 / 125-150 / 150-175 / 175-200
 *       faixaNominalUni:
 *         type: string
 *         pattern: mm/pol 
 *       divisaoResolucaoNum:
 *         type: number
 *       divisaoResolucaoUni:
 *         type: string
 *         pattern: mm/pol
 *       orgaoResponsavel:
 *         type: string
 *         pattern: Suiclab
 *
 *   updateInstrumento:
 *     type: object
 *     properties:
 *       fk_idCliente:
 *         type: number
 *       fk_idOs:
 *         type: number
 *       fk_idCategoria:
 *         type: number
 *       nome:
 *         type: string
 *       nSerie:
 *         type: number
 *       identificacaoCliente:
 *         type: string
 *       fabricante:
 *         type: string
 *       divisaoResolucaoNum:
 *         type: string
 *       divisaoResolucaoUni:
 *         type: string
 *       faixaNominalNum:
 *         type: string
 *       faixaNominalUni:
 *         type: string

 *
 * /registerTools:
 *   post:
 *     tags:
 *       - Instrumentos
 *     summary: cadastro de instrumento
 *     description: cadastra um novo instrumento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/instrumento'
 *     responses:
 *       200:
 *         description: Instrumento cadastrado
 *       400:
 *         description: Erro ao cadastrar instrumento
 *       500:
 *         description: Erro interno do servidor
 *
 * /getAllTools:
 *   get:
 *     tags:
 *       - Instrumentos
 *     summary: retorna instrumentos
 *     description: retorna todos os instrumentos cadastrados
 *     responses:
 *       200:
 *         description: retorna todos os instrumentos
 *       500:
 *         description: Erro interno do servidor
 *
 * /getTool/{id}:
 *  get:
 *    tags:
 *      - Instrumentos
 *    summary: retorna dados de instrumento
 *    description: retorna o instrumento com base em um id especifico
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Retorna o instrumento correspondente ao id fornecido.
 *      404:
 *        description: Instrumento nao encontrado
 *      500:
 *        description: Erro interno do servidor.
 *
 * /updateTools/{id}:
 *   put:
 *     tags:
 *       - Instrumentos
 *     summary: atualiza instrumento
 *     description: atualiza um instrumento cadastrado
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
 *              $ref: '#/definitions/instrumento'
 *     responses:
 *       200:
 *         description: Instrumento atualizado
 *       400:
 *         description: Erro ao atualizar instrumento
 *       404:
 *         description: Instrumento não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 */
