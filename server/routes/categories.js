const router = require('express').Router();
const { Product } = require('../models');
const { Op } = require('sequelize');

// Получить все категории
router.get('/', async (req, res) => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [Product.sequelize.fn('DISTINCT', Product.sequelize.col('category')), 'category']
            ],
            order: [['category', 'ASC']]
        });

        // Преобразуем результат в массив категорий
        const categoryList = categories.map(item => item.category);
        res.json(categoryList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получить товары по категории
router.get('/:category/products', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.findAll({
            where: {
                category: {
                    [Op.iLike]: category // Поиск без учета регистра
                }
            },
            order: [['title', 'ASC']]
        });
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'Товары в данной категории не найдены' });
        }
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
