const router = require('express').Router();
const { User, Cart, Favorite } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
};

// Регистрация
router.post('/register', async (req, res) => {
    try {
        const { login, password, room } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Логин и пароль обязательны' });
        }

        // Проверяем, существует ли пользователь
        const existingUser = await User.findOne({ where: { login } });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем пользователя
        const user = await User.create({
            login,
            password: hashedPassword,
            room: room || null,
            role: 'user' // По умолчанию роль user
        });

        // Создаем корзину для пользователя
        await Cart.create({
            userId: user.id
        });

        // Создаем список избранного для пользователя
        await Favorite.create({
            userId: user.id
        });

        // Создаем JWT токен
        const token = jwt.sign(
            { 
                id: user.id.toString(), 
                login: user.login,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                login: user.login,
                room: user.room,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        // Ищем пользователя и связанные данные через Promise.all
        const [user] = await Promise.all([
            User.findOne({ where: { login } })
        ]);
        
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        // Проверяем пароль
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        // Создаем JWT токен
        const tokenPayload = { 
            id: user.id.toString(), 
            login: user.login,
            role: user.role 
        };
        
        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Получаем полные данные пользователя и корзину параллельно
        const [userData] = await Promise.all([
            User.findByPk(user.id, {
                attributes: { exclude: ['password'] }
            })
        ]);

        res.json({
            token,
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Получить информацию о текущем пользователе
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Изменить комнату
router.put('/room', authMiddleware, async (req, res) => {
    try {
        const { room } = req.body;
        const user = await User.findByPk(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        await user.update({ room });

        res.json({
            id: user.id,
            login: user.login,
            room: user.room
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
