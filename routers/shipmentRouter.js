/**
 * @swagger
 * tags:
 *   name: Shipments
 *   description: API endpoints for managing shipments
 */

/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Create a new shipment
 *     tags: [Shipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               sender:
 *                 type: string
 *               carrier:
 *                 type: string
 *               receiver:
 *                 type: string
 *               pickupDate:
 *                 type: string
 *                 format: date-time
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 */

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Get shipments by query
 *     tags: [Shipments]
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: number
 *       - in: query
 *         name: sender
 *         schema:
 *           type: string
 *       - in: query
 *         name: carrier
 *         schema:
 *           type: string
 *       - in: query
 *         name: receiver
 *         schema:
 *           type: string
 *       - in: query
 *         name: pickupDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: deliveryDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shipment'
 */

/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Get a specific shipment
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       404:
 *         description: Shipment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/shipments/{id}:
 *   put:
 *     summary: Update a shipment
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               sender:
 *                 type: string
 *               carrier:
 *                 type: string
 *               receiver:
 *                 type: string
 *               pickupDate:
 *                 type: string
 *                 format: date-time
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       404:
 *         description: Shipment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/shipments/{id}:
 *   delete:
 *     summary: Delete a shipment
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Shipment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Shipment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         orderId:
 *           type: number
 *         sender:
 *           $ref: '#/components/schemas/Profile'
 *         carrier:
 *           $ref: '#/components/schemas/Profile'
 *         receiver:
 *           $ref: '#/components/schemas/Profile'
 *         pickupDate:
 *           type: string
 *           format: date-time
 *         deliveryDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: number
 */



const express = require('express');
const shipmentController = require('../controllers/shipmentController');

const router = express.Router();

// Create a new shipment
router.post('/', shipmentController.createShipment);

// Get a shipment by query
router.get('/', shipmentController.getShipments);

// Get a specific shipment
router.get('/:id', shipmentController.getShipmentById);

// Update a shipment
router.put('/:id', shipmentController.updateShipment);

// Delete a shipment
router.delete('/:id', shipmentController.deleteShipment);

module.exports = router;
