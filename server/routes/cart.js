const router = require('express').Router();
const { Cart, Product, CartItem } = require('../models');
const jwt = require('jsonwebtoken');

// Получить корзину
router.get('/', async (req, res) => {
    try {
        console.log('Headers:', req.headers); // Логируем заголовки

        const token = req.headers.authorization?.split(' ')[1];
        console.log('Token:', token); // Логируем токен

        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            console.log('Decoded token:', decoded); // Логируем декодированный токен
            const userId = decoded.id;

            let cart = await Cart.findOne({
                where: { userId },
                include: [{
                    model: Product,
                    through: {
                        model: CartItem,
                        attributes: ['quantity']
                    }
                }]
            });

            if (!cart) {
                console.log('Creating new cart for user:', userId); // Логируем создание новой корзины
                cart = await Cart.create({ userId });
            }

            const totalPrice = cart.Products?.reduce((sum, item) => sum + (item.CartItem.quantity * item.price), 0) || 0;
            const totalCount = cart.Products?.reduce((sum, item) => sum + item.CartItem.quantity, 0) || 0;

            res.json({
                Products: cart.Products || [],
                totalPrice,
                totalCount
            });
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError); // Логируем ошибку проверки токена
            return res.status(401).json({ message: 'Неверный токен' });
        }
    } catch (error) {
        console.error('Cart route error:', error); // Логируем общую ошибку
        res.status(500).json({ message: error.message });
    }
});

// Добавить товар в корзину
router.post('/add', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.id;

        const { productId, quantity = 1 } = req.body;

        // Проверяем существование продукта
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        // Находим или создаем корзину для пользователя
        let [cart] = await Cart.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        // Находим или создаем элемент корзины
        let [cartItem] = await CartItem.findOrCreate({
            where: { CartId: cart.id, ProductId: productId },
            defaults: { quantity }
        });

        // Если элемент уже существовал, обновляем количество
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
        }

        // Получаем обновленную корзину с продуктами
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

        const totalPrice = updatedCart.Products?.reduce((sum, item) => sum + (item.CartItem.quantity * item.price), 0) || 0;
        const totalCount = updatedCart.Products?.reduce((sum, item) => sum + item.CartItem.quantity, 0) || 0;

        res.json({
            Products: updatedCart.Products || [],
            totalPrice,
            totalCount
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Удалить товар из корзины
router.delete('/remove/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.id;

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

        const totalPrice = updatedCart.Products?.reduce((sum, item) => sum + (item.CartItem.quantity * item.price), 0) || 0;
        const totalCount = updatedCart.Products?.reduce((sum, item) => sum + item.CartItem.quantity, 0) || 0;

        res.json({
            Products: updatedCart.Products || [],
            totalPrice,
            totalCount
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Обновить количество товара
router.put('/update/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.id;

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

        const totalPrice = updatedCart.Products?.reduce((sum, item) => sum + (item.CartItem.quantity * item.price), 0) || 0;
        const totalCount = updatedCart.Products?.reduce((sum, item) => sum + item.CartItem.quantity, 0) || 0;

        res.json({
            Products: updatedCart.Products || [],
            totalPrice,
            totalCount
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Очистить корзину
router.delete('/clear', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.id;

        const cart = await Cart.findOne({ where: { userId } });
        
        if (!cart) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }

        await CartItem.destroy({
            where: { CartId: cart.id }
        });

        res.json({ message: 'Корзина очищена' });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
