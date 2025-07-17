import getCategories from "../service/categories.js";

export async function getCategoriesHandler(req, res) {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCategoryByIdHandler(req, res) {
    try {
        const { id } = req.params;
        const allCategories = await getCategories();
        const category = allCategories.find(category => category.id === parseInt(id));
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}