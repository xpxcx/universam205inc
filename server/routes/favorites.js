const router = require('express').Router();
const { Favorite, Product, FavoriteItem } = require('../models');

// Получить избранные товары пользователя
router.get('/', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        let favorite = await Favorite.findOne({
            where: { userId },
            include: [{
                model: Product,
                through: { attributes: [] }
            }]
        });

        if (!favorite) {
            favorite = await Favorite.create({ userId });
        }

        res.json({
            Products: favorite.Products || [],
            totalCount: favorite.Products ? favorite.Products.length : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Добавить товар в избранное
router.post('/add', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const { productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required' });
        }

        let [favorite] = await Favorite.findOrCreate({
            where: { userId }
        });

        await FavoriteItem.create({
            FavoriteId: favorite.id,
            ProductId: productId
        });

        const updatedFavorite = await Favorite.findOne({
            where: { id: favorite.id },
            include: [{
                model: Product,
                through: { attributes: [] }
            }]
        });

        res.json({
            Products: updatedFavorite.Products,
            totalCount: updatedFavorite.Products.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удалить товар из избранного
router.delete('/remove/:productId', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const productId = req.params.productId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const favorite = await Favorite.findOne({
            where: { userId }
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await FavoriteItem.destroy({
            where: {
                FavoriteId: favorite.id,
                ProductId: productId
            }
        });

        res.json({ message: 'Product removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Очистить избранное
router.delete('/clear', async (req, res) => {
    try {
        const userId = req.headers['user-id'];

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const favorite = await Favorite.findOne({
            where: { userId }
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await FavoriteItem.destroy({
            where: { FavoriteId: favorite.id }
        });

        res.json({ message: 'Favorites cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
