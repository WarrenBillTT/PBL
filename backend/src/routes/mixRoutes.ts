import { Router } from 'express';
import { mixColorsHandler } from '../controllers/mixController';

const router = Router();

/**
 * @swagger
 * /api/mix:
 *   post:
 *     summary: Mix 2 to 5 colors according to the ratio.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - colors
 *             properties:
 *               colors:
 *                 type: array
 *                 minItems: 2
 *                 maxItems: 5
 *                 items:
 *                   type: object
 *                   required:
 *                     - hex
 *                     - ratio
 *                   properties:
 *                     hex:
 *                       type: string
 *                       example: "#FF0000"
 *                     ratio:
 *                       type: number
 *                       example: 20
 *           example:
 *             colors:
 *               - hex: "#FF0000"
 *                 ratio: 20
 *               - hex: "#00FF00"
 *                 ratio: 20
 *               - hex: "#0000FF"
 *                 ratio: 60
 *     responses:
 *       200:
 *         description: Color mixing result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultHex:
 *                   type: string
 *                   example: "#3D5C8F"
 *                 resultRgb:
 *                   type: object
 *                   properties:
 *                     r: { type: number }
 *                     g: { type: number }
 *                     b: { type: number }
 *       400:
 *         description: Input not valid
 */
router.post('/mix', mixColorsHandler);

export default router;