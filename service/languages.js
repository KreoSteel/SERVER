import fs from 'fs/promises';

export default async function getLanguages() {
    try {
        const languages = await fs.readFile("books.json", "utf-8");
        console.log(JSON.parse(languages).languages);
        return JSON.parse(languages).languages;
    } catch (error) {
        console.error(error);
    }
}
