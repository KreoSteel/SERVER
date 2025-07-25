import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../service/books.js';

async function getBooksHandler(req, res) {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getBookByIdHandler(req, res) {
    try {
        const {id} = req.params;
        const book = await getBookById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createBookHandler(req, res) {
    try {
        const { title, authorId, categoryId, languageId, description, price } = req.body;
        const newBook = await createBook({ title, authorId, categoryId, languageId, description, price });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateBookHandler(req, res) {
    try {
        const { id } = req.params;
        const { title, authorId, categoryId, languageId, description, price } = req.body;
        if (!title && !authorId && !categoryId && !languageId && !description && !price) {
            return res.status(400).json({ message: 'At least one field must be provided for update' });
        }
        const updatedBook = await updateBook(id, { title, authorId, categoryId, languageId, description, price });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteBookHandler(req, res) {
    try {
        const { id } = req.params;
        const deletedBook = await deleteBook(id);
        res.json(deletedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };