/**
 * @swagger
 * tags:
 *   - name: Categoria
 *     description: Todas as operações referentes as categorias
 * definitions:
 *   categoria:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 * 
 * /registerCategory:
 *   post:
 *     tags:
 *       - Categoria
 *     summary: cadastro de categoria
 *     description: cadastra uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/categoria'
 *     responses:
 *       200:
 *         description: Categoria cadastrada
 *       400:
 *         description: Erro ao cadastrar categoria
 *       500:
 *         description: Erro interno do servidor
 * 
 * /allCategorys:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: retorna as categorias
 *     description: retorna todos as categorias cadastradas
 *     responses:
 *       200:
 *         description: Retorna todas as peças cadastradas
 *       500:
 *         description: Erro interno do servidor
 * 
 * /updateCategory/{id}:
 *   put:
 *     tags:
 *       - Categoria
 *     summary: atualizar a categoria
 *     description: atualiza as informações de uma categoria
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
 *              $ref: '#/definitions/categoria'
 *     responses:
 *      200:
 *        description: Categoria atualizada com sucesso
 *      400:
 *        description: Erro ao atualizar Categoria
 *      404:
 *        description: Categoria não encontrada
 *      500:
 *        description: Erro interno do servidor
 */
