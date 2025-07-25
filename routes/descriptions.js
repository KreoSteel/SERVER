import express from 'express';
import { getDescriptionHandler } from '../controllers/other-info.js';

const router = express.Router();

router.get('/', getDescriptionHandler);

export default router;