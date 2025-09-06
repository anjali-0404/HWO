import { Router } from 'express';
import multer from 'multer';
import { predict, train } from '../controllers/aiController.js';
const router = Router();
const upload = multer({ dest: 'uploads/' });
router.post('/predict', predict);
router.post('/train', upload.array('files'), train);
export default router;
