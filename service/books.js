import fs from 'fs/promises';
import getAuthors from './authors.js';
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
        const newBook = {
            id: allData.books.length + 1,
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