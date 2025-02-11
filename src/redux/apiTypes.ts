// export type ApiTags = 'adminProduct' | 'Product' |'Cart' |'Favorites' | 'Auth' | 'User';
export const API_TAGS = {
    PRODUCTS: 'Products',
    CART: 'Cart',
    USER: 'User',
    FAVORITES: 'Favorites',
    ADMIN_PRODUCT: 'adminProduct',
    AUTH: 'Auth'
} as const;
export type ApiTags = typeof API_TAGS[keyof typeof API_TAGS];
