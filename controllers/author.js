import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../service/authors.js';

async function getAuthorsHandler(req, res) {
    try {
        const authors = await getAuthors();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAuthorByIdHandler(req, res) {
    try {
        const { id } = req.params;
        const author = await getAuthorById(id);
        res.json(author);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createAuthorHandler(req, res) {
    try {
        const { name, bio, birthYear, deathYear, nationality } = req.body;
        const newAuthor = await createAuthor({ name, bio, birthYear, deathYear, nationality });
        res.status(201).json(newAuthor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateAuthorHandler(req, res) {
    try {
        const { id } = req.params;
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'At least one field must be provided for update' });
        }
        const updatedAuthor = await updateAuthor(id, req.body);
        res.json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteAuthorHandler(req, res) {
    try {
        const { id } = req.params;
        const deletedAuthor = await deleteAuthor(id);
        res.json(deletedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler };