const router = require('express').Router();
const { sequelize, Order, OrderItem, Cart, CartItem, Product, User } = require('../models');
const { Op } = require('sequelize');
const authMiddleware = require('../middleware/auth');

// Создание заказа из корзины
router.post('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Получаем корзину пользователя со всеми товарами
        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: Product,
                through: CartItem
            }]
        });

        if (!cart || !cart.Products || cart.Products.length === 0) {
            return res.status(400).json({ message: 'Корзина пуста' });
        }

        // Проверяем наличие всех товаров
        for (const item of cart.Products) {
            if (item.CartItem.quantity > item.inStock) {
                return res.status(400).json({
                    message: `Недостаточно товара "${item.title}" на складе. В наличии: ${item.inStock}`
                });
            }
        }

        // Получаем пользователя для комнаты доставки (если есть)
        const user = await User.findByPk(userId);

        // Вычисляем общую стоимость
        const totalPrice = cart.Products.reduce((sum, item) => {
            return sum + (item.price * item.CartItem.quantity);
        }, 0);

        // Создаем заказ в транзакции
        const result = await sequelize.transaction(async (t) => {
            // Создаем заказ
            const order = await Order.create({
                userId,
                totalPrice,
                deliveryRoom: user.room || null
            }, { transaction: t });

            // Создаем позиции заказа
            const orderItemPromises = cart.Products.map(item => 
                OrderItem.create({
                    orderId: order.id,
                    productId: item.id,
                    quantity: item.CartItem.quantity,
                    price: item.price
                }, { transaction: t })
            );

            await Promise.all(orderItemPromises);

            // Уменьшаем количество товаров на складе
            const stockUpdatePromises = cart.Products.map(item =>
                Product.update(
                    { inStock: item.inStock - item.CartItem.quantity },
                    { 
                        where: { id: item.id },
                        transaction: t 
                    }
                )
            );

            await Promise.all(stockUpdatePromises);

            // Очищаем корзину
            await CartItem.destroy({
                where: { CartId: cart.id },
                transaction: t
            });

            // Получаем заказ со всеми items
            const orderWithItems = await Order.findByPk(order.id, {
                include: [{
                    model: OrderItem,
                    include: [Product]
                }],
                transaction: t
            });

            return orderWithItems;
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message });
    }
});

// Получение списка заказов пользователя
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{
                model: OrderItem,
                include: [Product]
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message });
    }
});

// Получение конкретного заказа
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            },
            include: [{
                model: OrderItem,
                include: [Product]
            }]
        });

        if (!order) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: error.message });
    }
});

// Изменение комнаты доставки заказа
router.patch('/:orderId/delivery-room', authMiddleware, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { room } = req.body;
        const userId = req.user.id;

        // Находим заказ
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId // Проверяем, что заказ принадлежит пользователю
            }
        });

        if (!order) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        // Проверяем статус заказа (опционально)
        if (order.status === 'delivered') {
            return res.status(400).json({ message: 'Нельзя изменить комнату доставки для доставленного заказа' });
        }

        // Обновляем комнату доставки
        await order.update({
            deliveryRoom: room
        });

        // Возвращаем обновленный заказ
        res.json({
            message: 'Комната доставки успешно обновлена',
            order: {
                id: order.id,
                deliveryRoom: order.deliveryRoom,
                status: order.status
            }
        });

    } catch (error) {
        console.error('Error updating delivery room:', error);
        res.status(500).json({ message: error.message });
    }
});

// Получение всех заказов (для админов)
router.get('/admin/all', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Нет прав доступа' });
        }

        const orders = await Order.findAll({
            include: [{
                model: OrderItem,
                include: [Product]
            }, {
                model: User,
                attributes: ['id', 'login', 'room']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
