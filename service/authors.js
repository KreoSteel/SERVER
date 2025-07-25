import fs from 'fs/promises';
import { writeJsonFile, readJsonFile } from '../utils/json.js';

export async function getAuthors() {
    try {
        const authors = await fs.readFile("books.json", "utf-8");
        console.log(JSON.parse(authors).authors);
        return JSON.parse(authors).authors;
    } catch (error) {
        console.error(error);
    }
}

export async function getAuthorById(id) {
    try {
        const authors = await getAuthors();
        return authors.find(author => parseInt(author.id) === parseInt(id));
    } catch (error) {
        console.error(error);
    }
}

export async function createAuthor({ name, bio, birthYear, deathYear, nationality }) {
    const allData = await readJsonFile('books.json');
    if (!name) {
        throw new Error("Name is required");
    }
    const maxId = allData.authors.reduce((max, author) => author.id > max ? author.id : max, 0);
    const author = {
        id: maxId + 1,
        name,
        bio,
        birthYear,
        deathYear,
        nationality
    };
    allData.authors.push(author);
    await writeJsonFile('books.json', allData);
    return author;
}

export async function updateAuthor(ID, updateObj) {
    const id = parseInt(ID);
    const allData = await readJsonFile('books.json');
    const author = await getAuthorById(id);
    if (!author) {
        throw new Error("Author not found");
    }

    const index = allData.authors.findIndex(author => author.id === parseInt(id));
    if (index !== -1) {
        allData.authors[index] = {
            ...allData.authors[index],
            ...Object.fromEntries(Object.entries(updateObj).filter(([_, v]) => v !== undefined))
        };
        await writeJsonFile('books.json', allData);
        return allData.authors[index];
    }
    throw new Error("Author not found in the list");
}

export async function deleteAuthor(ID) {
    const id = parseInt(ID);
    const allData = await readJsonFile("books.json");
    const author = await getAuthorById(id);
    if (!author) {
        throw new Error("Author not found");
    }
    const remainingBooks = allData.books.filter(book => book.authorId !== parseInt(id));
    allData.books = remainingBooks;
    allData.authors = allData.authors.filter(author => author.id !== parseInt(id));
    await writeJsonFile("books.json", allData);
}

