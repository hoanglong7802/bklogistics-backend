/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: API endpoints for managing profiles
 */

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               name:
 *                 type: string
 *               isMember:
 *                 type: boolean
 *               mail:
 *                 type: string
 *               materialSupply:
 *                 type: array
 *                 items:
 *                   type: string
 *               productManufacture:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get profiles by query
 *     tags: [Profiles]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: isMember
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Get a specific profile
 *     tags: [Profiles]
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
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
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
 * /api/profiles/{id}:
 *   put:
 *     summary: Update a profile
 *     tags: [Profiles]
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
 *               address:
 *                 type: string
 *               name:
 *                 type: string
 *               isMember:
 *                 type: boolean
 *               mail:
 *                 type: string
 *               materialSupply:
 *                 type: array
 *                 items:
 *                   type: string
 *               productManufacture:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
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
 * /api/profiles/{id}:
 *   delete:
 *     summary: Delete a profile
 *     tags: [Profiles]
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
 *         description: Profile not found
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
 * /api/profiles/{id}/request-role-registration:
 *   put:
 *     summary: Request role registration
 *     tags: [Profiles]
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
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
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
 *     Profile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         address:
 *           type: string
 *         name:
 *           type: string
 *         isMember:
 *           type: boolean
 *         mail:
 *           type: string
 *         registerDate:
 *           type: string
 *           format: date-time
 *         materialSupply:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Material'
 *         productManufacture:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 */

const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

// Create a new profile
router.post("/", profileController.createProfile);

// Get profile by wallet address
router.get("/address/:address", profileController.getByWalletAddress);

// Get a profile by query
router.get("/", profileController.getAllProfiles);

// Get a specific profile
router.get("/:id", profileController.getProfileById);

// Update a profile
router.put("/:id", profileController.updateProfile);

// Delete a profile
router.delete("/:id", profileController.deleteProfile);

// Request role registration
router.put(
	"/:id/request-role-registration",
	profileController.requestRoleRegistration
);

module.exports = router;
