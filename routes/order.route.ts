import { createOrderCtrl, getOrderByIdCtrl, getOrdersCtrl, updateOrderStatusCtrl } from "../controllers";
import { Router } from "express";

export const orderRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create a new Order
 *     description: Create a new Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
orderRouter.post("/", createOrderCtrl);



/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get all Orders
 *     description: Get all Orders
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: customerName
 *         schema:
 *           type: string
 *         description: Customer name
 *       - in: query
 *         name: customerEmail
 *         schema:
 *           type: string
 *         description: Customer email
 *       - in: query
 *         name: customerPhone
 *         schema:
 *           type: string
 *         description: Customer phone
 *       - in: query
 *         name: orderDate
 *         schema:
 *           type: string
 *         description: Order date
 *       - in: query
 *         name: status
 *         schema:
 *           type: enum
 *           enum: [PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED]
 *         description: Order date
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
orderRouter.get("/", getOrdersCtrl);



/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get an Order by ID
 *     description: Get an Order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
orderRouter.get("/:id", getOrderByIdCtrl);



/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     tags: [Orders]
 *     summary: Update Order status
 *     description: Update Order status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatusRequest'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
orderRouter.patch("/:id", updateOrderStatusCtrl);