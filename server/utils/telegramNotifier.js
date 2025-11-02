const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendOrderNotification(order, user) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('Telegram settings not configured');
        return;
    }

    try {
        const orderItems = order.OrderItems.map(item => {
            return `• ${item.Product.title} - ${item.quantity} ${item.Product.unit} × ${item.price} ₽`;
        }).join('\n');

        const message = `
🛒 *НОВЫЙ ЗАКАЗ №${order.id}*

👤 *Клиент:* ${user.login}
📍 *Комната доставки:* ${order.deliveryRoom || 'Не указана'}

📦 *Товары:*
${orderItems}

💰 *Итого:* ${order.totalPrice} ₽

🕐 *Время заказа:* ${new Date(order.createdAt).toLocaleString('ru-RU')}
        `.trim();

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        console.log('Telegram notification sent successfully');
    } catch (error) {
        console.error('Error sending Telegram notification:', error.message);
    }
}

module.exports = { sendOrderNotification };

