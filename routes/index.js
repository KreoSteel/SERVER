import express from 'express';
import booksRouter from './books.js';
import authorsRouter from './authors.js';
import categoriesRouter from './categories.js';
import languagesRouter from './languages.js';
import pricesRouter from './prices.js';
import descriptionsRouter from './descriptions.js';

const router = express.Router();

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);
router.use('/categories', categoriesRouter);
router.use('/languages', languagesRouter);
router.use('/prices', pricesRouter);
router.use('/descriptions', descriptionsRouter);


export default router;