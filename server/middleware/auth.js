const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    try {
        // Получаем токен из заголовка
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        // Проверяем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Получаем пользователя
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }

        // Добавляем информацию о пользователе в request
        req.user = {
            id: user.id,
            login: user.login,
            role: user.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
};

module.exports = authMiddleware;
