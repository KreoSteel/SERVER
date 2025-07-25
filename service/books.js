import fs from 'fs/promises';
import { getAuthors } from './authors.js';
import getCategories from './categories.js';
import getLanguages from './languages.js';
import { writeJsonFile, readJsonFile } from '../utils/json.js';

export async function getBooksData() {
    try {
        const books = await fs.readFile("books.json", "utf-8");
        return JSON.parse(books).books;
    } catch (error) {
        console.error(error);
    }
}


export async function getBooks() {
    const books = await getBooksData();
    const authors = await getAuthors();
    const categories = await getCategories();
    const languages = await getLanguages();

    const booksWithDetails = books.map(book => {
        const author = authors.find(author => author.id === book.authorId);
        const category = categories.find(category => category.id === book.categoryId);
        const language = languages.find(language => language.id === book.languageId);
        return { ...book, author, category, language };
    });

    return booksWithDetails;
}

export async function getBookDataById(id) {
    try {
        const books = await getBooksData();
        return books.find(book => parseInt(book.id) === parseInt(id));
    } catch (error) {
        console.error(error);
    }
}

export async function getBookById(id) {
    try {
        const books = await getBookDataById(id);
        const authors = await getAuthors();
        const categories = await getCategories();
        const languages = await getLanguages();

        const bookWithDetails = { ...books, author: authors.find(author => author.id === books.authorId), category: categories.find(category => category.id === books.categoryId), language: languages.find(language => language.id === books.languageId) };

        return bookWithDetails;
    } catch (error) {
        console.error('Error getting book by id');
        console.error(error);
    }
}


export async function createBook(bookData) {
    try {
        if (!bookData.title || !bookData.authorId || !bookData.categoryId || !bookData.languageId) {
            throw new Error('Invalid book data');
        }

        const allData = await readJsonFile('books.json');
        const maxId = allData.books.reduce((max, book) => book.id > max ? book.id : max, 0);
        const newBook = {
            id: maxId + 1,
            ...bookData
        };

        allData.books.push(newBook);
        await writeJsonFile('books.json', allData);
        return newBook;
    } catch (error) {
        console.error('Error creating book');
        console.error(error);
    }
}

export async function updateBook(Id, bookData) {
    const id = parseInt(Id);
    const book = await getBookDataById(id);

    const authors = await getAuthors();
    const categories = await getCategories();
    const languages = await getLanguages();

    if(bookData.authorId && !authors.some(author => author.id === bookData.authorId)) {
        throw new Error('Invalid author ID');
    }
    if (bookData.categoryId && !categories.some(category => category.id === bookData.categoryId)) {
        throw new Error('Invalid category ID');
    }
    if (bookData.languageId && !languages.some(language => language.id === bookData.languageId)) {
        throw new Error('Invalid language ID');
    }

    if (!book) {
        throw new Error('Book not found');
    }
    const allData = await readJsonFile('books.json');
    const index = allData.books.findIndex(book => book.id === id);
    if (index !== -1) {
        // Merge existing book with new data, only updating provided fields
        allData.books[index] = {
            ...allData.books[index],
            ...bookData
        };
        await writeJsonFile('books.json', allData);
        return allData.books[index];
    }
    throw new Error('Book not found in the list');
}

export async function deleteBook(id) {
    const allData = await readJsonFile('books.json');
    const book = await getBookDataById(id);
    if (!book) {
        throw new Error('Book not found');
    }
    const index = allData.books.findIndex(book => book.id === parseInt(id));
    if (index !== -1) {
        allData.books.splice(index, 1);
        await writeJsonFile('books.json', allData);
        return { message: 'Book deleted successfully' };
    }
    throw new Error('Book not found');
}