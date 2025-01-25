const router = require('express').Router();
const { Product } = require('../models');
const { Op } = require('sequelize');

// Получить все товары
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let whereClause = {};

        if (category) {
            whereClause.category = category;
        }

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%` // Поиск без учета регистра
            };
        }

        const products = await Product.findAll({
            where: whereClause,
            order: [['title', 'ASC']]
        });
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получить товар по ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Добавить новый товар
router.post('/', async (req, res) => {
    try {
        const { title, price, imageUrl, category, weight } = req.body;
        const product = await Product.create({
            title,
            price,
            imageUrl,
            category,
            weight
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Обновить товар
router.put('/:id', async (req, res) => {
    try {
        const { title, price, imageUrl, category, weight } = req.body;
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        await product.update({
            title,
            price,
            imageUrl,
            category,
            weight
        });

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Удалить товар
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        await product.destroy();
        res.json({ message: 'Товар удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
