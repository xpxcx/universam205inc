const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/universam205', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

module.exports = sequelize;
