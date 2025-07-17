import fs from 'fs/promises';

export default async function getCategories() {
    try {
        const categories = await fs.readFile("books.json", "utf-8");
        console.log(JSON.parse(categories).categories);
        return JSON.parse(categories).categories;
    } catch (error) {
        console.error(error);
    }
}


