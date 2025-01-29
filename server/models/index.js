const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Модель Product
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: '"imageUrl"'
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inStock: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: '"inStock"'
    },
    type: {
        type: DataTypes.STRING(7),
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

// Модель Cart
const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Модель CartItem (для связи многие-ко-многим между Cart и Product)
const CartItem = sequelize.define('CartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'CartItems'
});

// Модель Favorite
const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Favorites'
});

// Модель FavoriteItem
const FavoriteItem = sequelize.define('FavoriteItem', {}, {
    tableName: 'FavoriteItems'
});

// Определяем связи
Cart.belongsToMany(Product, { 
    through: CartItem,
    foreignKey: 'CartId',
    otherKey: 'ProductId'
});
Product.belongsToMany(Cart, { 
    through: CartItem,
    foreignKey: 'ProductId',
    otherKey: 'CartId'
});

Favorite.belongsToMany(Product, {
    through: FavoriteItem,
    foreignKey: 'FavoriteId',
    otherKey: 'ProductId'
});
Product.belongsToMany(Favorite, {
    through: FavoriteItem,
    foreignKey: 'ProductId',
    otherKey: 'FavoriteId'
});

module.exports = {
    sequelize,
    Product,
    Cart,
    CartItem,
    Favorite,
    FavoriteItem
};
