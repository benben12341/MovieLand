import express from 'express';
import { getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getMessages);

export default router;

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: "Get all messages"
 *     tags:
 *       - messages
 *     responses:
 *       '200':
 *         description: "List of messages"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Message"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         text:
 *           type: string
 *         senderId:
 *           type: integer
 *           format: int64
 *         senderName:
 *           type: string
 *       required:
 *         - id
 *         - text
 *         - senderId
 *         - senderName
 *       additionalProperties: false
 *       xml:
 *         name: Message
 *       example:
 *         id: 1
 *         text: "Hello, world!"
 *         senderId: 1
 *         senderName: "John Doe"
 */
