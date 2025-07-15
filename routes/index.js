import express from 'express';
import booksRouter from './books.js';

const router = express.Router();

router.use('/books', booksRouter);

export default router;