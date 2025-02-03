import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiTags } from './apiTypes.ts'
export type BaseItem = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
    size: number;
    unit: string;
    type: string;
    inStock: number;
}

type Food = BaseItem &{
    type: 'food',
    weight: number
};

type Drink = BaseItem & {
    type: 'drink',
    volume: number,
};
export type Item = Food | Drink;



interface CartResponse {
    Products: {
        id: number;
        title: string;
        imageUrl: string;
        price: number;
        size: number,
        unit: string,
        inStock: number,
        CartItem: {
            quantity: number;
        }
        
    }[];
    totalPrice: number,
    totalCount: number,
}

interface FavoriteResponse {
    Products: {
        id: number;
        title: string;
        imageUrl: string;
        price: number;
        size: number,
        unit: number,
        
    }[];
    totalCount: number,
}

interface AddCart {
    productId: number,
    quantity: number,
}

interface ProductInput {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    category: string,
    size: number,
    unit: string,
    type: string,
    inStock: number
}
interface ProductResponse {

    id: number,
    title: string,
    price: number,
    imageUrl: string,
    category: string,
    size: number,
    unit: string,
    type: string,
    inStock: number
}
interface ProductBody {
    categoryId: number,
    search: string
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    tagTypes: ['Product', 'Cart', 'Favorites'] as ApiTags[],
    endpoints: (builder) => ({
        getProducts: builder.query<BaseItem[], { categoryId: number, search?: string}> ({
            query: ({ categoryId, search }) => ({
                url: '/products',
                params: {
                ...(categoryId > 0 ? {category: categoryId} : {}),
                ...(search ? { search } : {})
                }
            }),
            providesTags: ['Product']
        }),

        getCart: builder.query<CartResponse, void>({
            query: () => ({
                url: '/cart',
            }),
            providesTags: ['Cart'],
            transformResponse: (response: CartResponse) => ({
                ...response,
                totalPrice: response.Products?.reduce(
                    (sum, item) => sum + (item.CartItem.quantity*item.price), 0 
                ),
                totalCount: response.Products?.reduce(
                    (sum, item) => sum + item.CartItem.quantity, 0 
                )
            })

        }),

        addToCart: builder.mutation<CartResponse, AddCart>({
            query: (body) => ({
                url: '/cart/add',
                method: 'POST',
                body,
            }),
                invalidatesTags: ['Cart']
        }),
        removeFromCart: builder.mutation<CartResponse, number>({
            query: (productId) => ({
                url: `/cart/remove/${productId}`,
                method: 'DELETE',
                
            }),
            invalidatesTags: ['Cart']
        }),
        removeAllCart: builder.mutation<{ message: string }, void> ({
            query: () => ({
                url: '/cart/clear',
                method: 'DELETE',
               
            }),
            invalidatesTags: ['Cart']
        }),
        updateCountProduct: builder.mutation<CartResponse, { productId: number, quantity: number}> ({
            query: ({ productId, quantity }) => ({
                url: `/cart/update/${productId}`,
                method: 'PUT',
                body: { quantity },
                
            }),
            invalidatesTags: ['Cart']
        }),
        getFavorite: builder.query<FavoriteResponse, void> ({
            query: () => ({
                url: '/favorites',
                method: 'GET',  
            }),
            providesTags: ['Favorites'],
        }),
        addOnFavorite: builder.mutation<FavoriteResponse, { productId: number }> ({
            query: (body) => ({
                url: '/favorites/add',
                body,
                method: 'POST',
                
            }),
            invalidatesTags: ['Favorites']
        }),
        removeAllFavorite: builder.mutation<{ message: string }, void> ({
            query: () => ({
                url: '/favorites/clear',
                method: 'DELETE',
                
            }),
            invalidatesTags: ['Favorites']
        }),
        removeFromFavorite: builder.mutation<{ message: string }, number > ({
            query: (productId) => ({
                url: `/favorites/remove/${productId}`,
                method: 'DELETE',
               
            }),
            invalidatesTags: ['Favorites']
        }),
        addProduct: builder.mutation<{ message: string }, ProductInput>({
            query: ({ title, price, imageUrl, category, size, unit, type, inStock}) => ({
                url: '/admin/products',
                method: 'POST',
                body: {
                    title, 
                    price, 
                    imageUrl, 
                    category, 
                    size, 
                    unit, 
                    type,
                    inStock
                }
            }),
            invalidatesTags: ['Product', 'adminProduct']
        }),
        editProduct: builder.mutation<ProductResponse, ProductInput>({

            query: ({ id, ...data}) => {
                return {url: `/admin/products/${id}`,
                method: 'PUT',
                body: {
                    ...data,
                }}
                
            },
            invalidatesTags: ['Product', 'adminProduct']
        }),
        deleteProduct: builder.mutation<{ message: string}, {id: number}>({
            query: ({ id }) => ({
                url: `/admin/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product', 'adminProduct']
        }),
        updateInStock: builder.mutation<{ message: string, inStock: number }, { amount: number, id: number}>({
            query: ({ amount, id }) => ({
                url: `/admin/products/${id}/stock`,
                method: 'PATCH',
                body: {
                    amount
                }
            }),
            invalidatesTags: ['Product', 'adminProduct']
        })
        
    })
});

export const {
    useGetProductsQuery,
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useRemoveAllCartMutation,
    useUpdateCountProductMutation,
    useGetFavoriteQuery,
    useAddOnFavoriteMutation,
    useRemoveAllFavoriteMutation,
    useRemoveFromFavoriteMutation,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useUpdateInStockMutation,
} = apiSlice;
