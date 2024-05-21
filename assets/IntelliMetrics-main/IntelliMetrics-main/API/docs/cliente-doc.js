/**
 * @swagger
 * tags:
 *   - name: Cliente
 *     description: Operações relacionadas aos clientes
 * definitions:
 *  cliente:
 *     type: object
 *     properties:
 *       nomeEmpresa:
 *         type: string
 *       representante:
 *         type: string
 *       email:
 *          type: string
 *       telefone:
 *          type: string
 *       endereco:
 *          type: string
 *       cnpj:
 *          type: string
 *          
 *  disableCliente:
 *     type: object
 *     properties:
 *       email:
 *          type: string
 *      
 * 
 * /registerClient:
 *   post:
 *     tags:
 *       - Cliente
 *     summary: cadastro de clientes
 *     description: cadastra um novo cliente no banco de dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/cliente'
 *     responses:
 *       200:
 *         description: Cliente cadastrado
 *       400:
 *         description: Erro ao cadastrar cliente
 *       409:
 *         description: Este cliente já está cadastrado
 *       500:
 *         description: Erro interno do servidor
 * 
 * /getAllClients:
 *  get:
 *    tags:
 *      - Cliente
 *    summary: retorna clientes
 *    description: retorna todos os clientes cadastrados
 *    responses:
 *      200:
 *        description: Retorna todos os clientes
 *      500:
 *        description: Erro interno do servidor
 * 
 * /client/{id}:
 *  get:
 *    tags:
 *      - Cliente
 *    summary: retorna dados de cliente
 *    description: retorna o cliente com base em um id especifico
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Retorna o cliente correspondente ao id fornecido.
 *      404:
 *        description: Não existe cliente com esse ID no banco de dados.
 *      500:
 *        description: Erro interno do servidor.
 * 
 * /clients/disable/{id}:
 *   put:
 *     tags:
 *       - Cliente
 *     summary: atualiza o estado do cliente
 *     description: atualiza o status do cliente para desativado/fora de uso
 *     parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *     responses:
 *      200:
 *        description: Cliente desativado com sucesso
 *      400:
 *        description: Erro ao desativar cliente
 *      409:
 *        description: Este cliente já está desativado
 *      500:
 *        description: Erro interno do servidor
 * 
 * 
 * /client/active/{id}:
 *   put:
 *     tags:
 *       - Cliente 
 *     summary: atualiza o estado do cliente
 *     description: atualiza o status do cliente para ativado
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Cliente ativado com sucesso
 *       400:
 *         description: Erro ao ativar cliente
 *       409:
 *         description: Este cliente já esta ativado
 *       500:
 *         description: Erro interno do servidor
 * 
 * /updateClient/{id}:
 *   put:
 *     tags:
 *       - Cliente
 *     summary: atualiza os dados
 *     description: atualiza os dados do cliente especificado pelo id 
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
 *              $ref: '#/definitions/cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 */
