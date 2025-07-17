import express from 'express'

import { getAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler } from '../controllers/author.js'

const router = express.Router()

router.get('/', getAuthorsHandler)
router.get('/:id', getAuthorByIdHandler)
router.patch('/:id', updateAuthorHandler)
router.delete('/:id', deleteAuthorHandler)
router.post('/', createAuthorHandler)

export default router