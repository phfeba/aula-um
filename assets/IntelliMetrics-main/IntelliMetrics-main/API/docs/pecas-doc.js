/**
 * @swagger
 * tags:
 *   - name: Peças
 *     description: Todas as operações referentes a peças
 * definitions:
 *   peca:
 *     type: object
 *     properties:
 *       idOs:
 *         type: integer
 *       idCliente:
 *         type: integer
 *       nome:
 *         type: string
 *         pattern: parafuso 
 *       material:
 *         type: string
 *         pattern: aço
 *       nDesenho:
 *         type: integer
 *       descricao:
 *         type: string
 *         nullable: true
 * 
 * /registerPieces:
 *   post:
 *     tags:
 *       - Peças
 *     summary: cadastro de peças
 *     description: cadastra uma nova peça 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/peca'
 *     responses:
 *       200:
 *         description: Peça cadastrada
 *       400:
 *         description: Erro ao cadastrar peça
 *       500:
 *         description: Erro interno do servidor
 * 
 * /getAllPieces:
 *   get:
 *     tags:
 *       - Peças
 *     summary: retorna peças
 *     description: retorna todos as peças cadastradas
 *     responses:
 *       200:
 *         description: Retorna todas as peças cadastradas
 *       500:
 *         description: Erro interno do servidor
 * 
 * /piece/{id}:
 *   get:
 *     tags:
 *       - Peças
 *     summary: retorna as informaçoes de uma peça
 *     description: retorna as informaçoes de  uma peça com base em um id especifico
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna as informações da peça
 *       404:
 *         description: Peça não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 * 
 * /updatePieces/{id}:
 *   put:
 *     tags:
 *       - Peças
 *     summary: atualizar peça
 *     description: atualiza as informações de uma peça
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
 *              $ref: '#/definitions/peca'
 *     responses:
 *      200:
 *        description: Peça atualizada com sucesso
 *      400:
 *        description: Erro ao atualizar peça
 *      404:
 *        description: Peça não encontrada
 *      500:
 *        description: Erro interno do servidor
 */
