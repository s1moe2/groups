const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const services = require("./services")

const validations = [
    body("names").exists().isArray(),
    body("size").exists().isInt({ min: 1 }),
];

/**
 * @openapi
 * /:
 *   post:
 *     summary: Create groups from shuffled names
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: array
 *                 items:
 *                   type: string
 *               size:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.post("/", validations, (req, res) => {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(400).json({ errors: validationRes.array() });
    }

    const groups = services.generateGroups(req.body.names, req.body.size);

    res.status(200).json(groups);
})

module.exports = router;