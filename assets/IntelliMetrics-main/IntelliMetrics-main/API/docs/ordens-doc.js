/**
 * @swagger
 * tags:
 *   - name: Ordens de serviço
 *     description: Operações relacionadas as ordens de serviços
 * definitions:
 *  ordem:
 *     type: object
 *     properties:
 *       pk_idOs:
 *          type: integer
 *       fk_idCliente:
 *          type: integer
 *       fk_idUsuario:
 *          type: integer
 *       titulo:
 *          type: string
 *          pattern: Calibrar paq 
 *       tipo:
 *          type: string
 *          pattern: calibracao/medicao
 *       descricao:
 *          type: string
 *       dataInicio:
 *          type: string
 *          pattern: 2024-12-30
 *       dataTermino:
 *          type: string
 *          pattern: 2024-12-31
 *       contratante:
 *          type: string
 *          pattern: auristelio
 *       email:
 *          type: string
 *       telefone:
 *          type: string
 *          pattern: 11912345678
 *       status:
 *          type: string
 *          pattern: em espera/concluida
 * 
 *  update:
 *     type: object
 *     properties:
 *       id_antigo:
 *          type: integer
 *       id_order:
 *          type: integer
 *       fk_idCliente:
 *          type: integer
 *       fk_idUsuario:
 *          type: integer
 *       titulo:
 *          type: string
 *       tipo:
 *          type: string
 *       descricao:
 *          type: string
 *       dataTermino:
 *          type: string
 *       contratante:
 *          type: string
 *       email:
 *          type: string
 *       telefone:
 *          type: string
 *          
 * /registerOrders:
 *   post:
 *     tags:
 *       - Ordens de serviço
 *     summary: cadastro de nova ordem
 *     description: cadastra uma nova ordem de serviço no banco de dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ordem'
 *     responses:
 *       200:
 *         description: Ordem de calibração cadastrada com sucesso
 *       400:
 *         description: Erro ao cadastrar ordem de calibração
 *       409:
 *         description: ID ja cadastrada
 *       500:
 *         description: Erro interno do servidor
 * 
 * /getAllOrders:
 *  get:
 *    tags:
 *      - Ordens de serviço
 *    summary: retorna ordens de seeviço
 *    description: retorna todos as ordens de serviço cadastradas
 *    responses:
 *      200:
 *        description: Retorna todas as ordens de serviços
 *      500:
 *        description: Erro interno do servidor
 * 
 * /orders/{id}:
 *  get:
 *    tags:
 *      - Ordens de serviço
 *    summary: retorna dados de uma ordem de serviço
 *    description: retorna os dados da ordem de serviço com base no ID
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Retorna a ordem correspondente ao id fornecido.
 *      404:
 *        description: Não existe ordem de serviço cadastrada com o ID.
 *      500:
 *        description: Erro interno do servidor.
 * 
 * /updateOrders:
 *   put:
 *     tags:
 *       - Ordens de serviço
 *     summary: atualizar dados
 *     description: atualiza os dados de uma ordem de serviço
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
 *              $ref: '#/definitions/update'
 *     responses:
 *      200:
 *        description: Ordem atualizada
 *      400:
 *        description: Erro ao atualizar ordem
 *      404:
 *        description: Ordem não encontrada
 *      500:
 *        description: Erro interno do servidor
 * 
 * 
 * /completedOrders/{id}:
 *   put:
 *     tags:
 *       - Ordens de serviço
 *     summary: atualiza o estado da ordem de serviço
 *     description: atualiza o status da ordem de serviço para concluida
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Ordem marcada como concluida
 *       400:
 *         description: Erro ao alterar estado da ordem
 *       404:
 *         description: Esta ordem não existe
 *       500:
 *         description: Erro interno do servidor
 * 
 * /uncheckOrders/{id}:
 *   put:
 *     tags:
 *       - Ordens de serviço
 *     summary: atualiza o estado da ordem de serviço
 *     description: atualiza o status da ordem de serviço para em espera
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Ordem colocada em espera
 *       400:
 *         description: Não foi possivel alterar status
 *       404:
 *         description: Esta ordem não existe
 *       500:
 *         description: Erro interno do servidor
 * 
 * 
 *
 */
