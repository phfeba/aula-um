/**
 * @swagger
 * tags:
 *   - name: Calculos paquimetro
 *     description: Todos os resultados dos calculos referentes a parte de paquimetro 
 * definitions:
 *   incertezaPaq:
 *     type: object
 *     properties:
 *       desvpad:
 *         type: array
 *         items:
 *           type: number
 *       resolucao:
 *         type: number
 *       faixaNominal:
 *         type: number
 *    
 *   calculosPaq:
 *     type: object
 *     properties:
 *       valorIndicado:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorNominalMedExterna:
 *         type: array
 *         items:
 *           type: number
 *         minItems: 5
 *       valorIndicadoProxOrelhas:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorIndicadoAfasOrelhas:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorNominalPara:
 *         type: array
 *         items:
 *           type: number
 *         minItems: 2
 *       valorIndicadoProxBicos:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorIndicadoAfasBicos:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorIndicadoMedInterna:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorNominalMedInterna:
 *         type: array
 *         items:
 *           type: number
 *         minItems: 3
 *       valorNominalMedRessalto:
 *         type: array
 *         items:
 *           type: number
 *         minItems: 3
 *       valorIndicadoMedRessalto:
 *         type: array
 *         items:
 *           type: array
 *           items:
 *             type: number
 *           minItems: 3
 *       valorNominalMedProf:
 *         type: array
 *         items:
 *           type: number
 *         minItems: 3
 *       valorIndicadoMedProf:
 *        type: array
 *        items:
 *          type: array
 *          items:
 *            type: number
 *          minItems: 3
 * 
 * 
 * /incertezaPaquimetro:
 *   post:
 *     tags:
 *       - Calculos paquimetro
 *     summary: incerteza do paquimetro
 *     description: Todos os calculos referentes a incerteza de paquimetos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/incertezaPaq'
 *     responses:
 *       200:
 *         description: Retorna os resultados dos calculos.
 *       500:
 *         description: Erro interno da API.
 *
 * /calcPaquimetro:
 *   post:
 *     tags:
 *       - Calculos paquimetro
 *     summary: calculos de paquimetro
 *     description: Calculos de tendencia, paralelismo e desvio padrao de paquimetros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/calculosPaq' 
 *     responses:
 *       200:
 *         description: Retorna os resultados dos calculos.
 *       500:
 *         description: Erro interno da API.
 *
 */
