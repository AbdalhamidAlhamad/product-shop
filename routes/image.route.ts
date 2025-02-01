import { Router } from "express";
import photoUpload from "../middlewares/photo-upload";

import { uploadImageCtrl } from "../controllers";

export const imageRouter = Router();

// file content swagger upload image
/**
 * @swagger
 * /api/images:
 *   post:
 *     tags: [Images]
 *     summary: Upload an image
 *     description: Upload an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 * 
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
imageRouter.post("/", photoUpload.single("image"), uploadImageCtrl);
