import express from 'express';
import booksRouter from './books.js';
import authorsRouter from './authors.js';
import categoriesRouter from './categories.js';
import languagesRouter from './languages.js';

const router = express.Router();

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);
router.use('/categories', categoriesRouter);
router.use('/languages', languagesRouter);

export default router;