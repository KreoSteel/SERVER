import { getLanguagesHandler, getLanguageByIdHandler } from '../controllers/languages.js';
import express from 'express';

const router = express.Router();

router.get('/', getLanguagesHandler);
router.get('/:id', getLanguageByIdHandler);


export default router;