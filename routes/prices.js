import express from 'express';
import { getPricesHandler } from '../controllers/other-info.js';

const router = express.Router();

router.get('/', getPricesHandler);

export default router;