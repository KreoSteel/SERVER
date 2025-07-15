import fs from 'fs/promises';

export default async function getAuthors() {
    try {
        const authors = await fs.readFile("books.json", "utf-8");
        console.log(JSON.parse(authors).authors);
        return JSON.parse(authors).authors;
    } catch (error) {
        console.error(error);
    }
}