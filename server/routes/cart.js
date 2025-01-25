const router = require('express').Router();
const { Cart, Product, CartItem } = require('../models');

// Получить корзину
router.get('/', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: Product,
                through: {
                    model: CartItem,
                    attributes: ['quantity']
                }
            }]
        });
        res.json(cart || { Products: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Добавить товар в корзину
router.post('/add', async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.headers['user-id'];

        // Проверяем существование продукта
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        // Находим или создаем корзину
        const [cart] = await Cart.findOrCreate({
            where: { userId }
        });

        // Находим существующий CartItem или создаем новый
        const [cartItem, created] = await CartItem.findOrCreate({
            where: {
                CartId: cart.id,
                ProductId: productId
            },
            defaults: { quantity }
        });

        // Если товар уже был в корзине, обновляем количество
        if (!created) {
            await cartItem.update({
                quantity: cartItem.quantity + quantity
            });
        }

        // Получаем обновленную корзину
        const updatedCart = await Cart.findOne({
            where: { userId },
            include: [{
                model: Product,
                through: {
                    model: CartItem,
                    attributes: ['quantity']
                }
            }]
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Удалить товар из корзины
router.delete('/remove/:id', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const productId = req.params.id;

        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }

        await CartItem.destroy({
            where: {
                CartId: cart.id,
                ProductId: productId
            }
        });

        const updatedCart = await Cart.findOne({
            where: { userId },
            include: [{
                model: Product,
                through: {
                    model: CartItem,
                    attributes: ['quantity']
                }
            }]
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Обновить количество товара
router.put('/update/:id', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const productId = req.params.id;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }

        await CartItem.update(
            { quantity },
            {
                where: {
                    CartId: cart.id,
                    ProductId: productId
                }
            }
        );

        const updatedCart = await Cart.findOne({
            where: { userId },
            include: [{
                model: Product,
                through: {
                    model: CartItem,
                    attributes: ['quantity']
                }
            }]
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Очистить корзину
router.delete('/clear', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const cart = await Cart.findOne({ where: { userId } });
        
        if (!cart) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }

        await CartItem.destroy({
            where: { CartId: cart.id }
        });

        res.json({ message: 'Корзина очищена' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
