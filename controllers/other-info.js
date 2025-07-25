import { getPrices, getDescription } from "../service/other-info.js";

async function getPricesHandler(req, res) {
    try {
        const prices = await getPrices();
        res.json(prices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getDescriptionHandler(req, res) {
    try {
        const description = await getDescription();
        res.json(description);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getPricesHandler, getDescriptionHandler };