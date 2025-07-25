import fs from 'fs/promises';

export async function getPrices() {
    try {
        const prices = await fs.readFile("books.json", "utf-8");
        console.log(JSON.parse(prices).prices);
        return JSON.parse(prices).prices;
    } catch (error) {
        console.error(error);
    }
}

export async function getDescription() {
    try {
        const descriptions = await fs.readFile("books.json", "utf-8");
        console.log(JSON.parse(descriptions).descriptions);
        return JSON.parse(descriptions).descriptions;
    } catch (error) {
        console.error(error);
    }
}

