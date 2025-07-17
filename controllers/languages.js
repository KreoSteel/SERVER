import getLanguages from "../service/languages.js";

export async function getLanguagesHandler(req, res) {
    try {
        const languages = await getLanguages();
        res.json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getLanguageByIdHandler(req, res) {
    try {
        const { id } = req.params;
        const allLanguages = await getLanguages();
        const language = allLanguages.find(language => language.id === parseInt(id));
        if (!language) {
            return res.status(404).json({ message: 'Language not found' });
        }
        res.json(language)    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}