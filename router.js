import * as prdController from "../controllers/ControllerPros.js";

import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/',prdController.getAllProductController);
router.get('/:id',prdController.getByIdProductController);
router.post('/',upload.single('prd_image'),prdController.createProductController);
router.put('/:id', upload.single("prd_image"),prdController.updateProductController);
router.delete('/:id', prdController.deleteProductController);


export default router;