import express from 'express';
import { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler, } from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooksHandler);
router.get('/:id', getBookByIdHandler);
router.post('/', createBookHandler);
router.patch('/:id', updateBookHandler);
router.delete("/:id", deleteBookHandler);

export default router;