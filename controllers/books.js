import { getBooks, getBookById, createBook } from '../service/books.js';

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
        const { title, authorId, categoryId, languageId } = req.body;
        const newBook = await createBook({ title, authorId, categoryId, languageId });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { getBooksHandler, getBookByIdHandler, createBookHandler };