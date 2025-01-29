import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type BaseItem = {
    imageUrl: string,
    title: string,
    price: number,
    type: 'food' | 'drink'
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
        quantity: number,
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
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api'}),
    tagTypes: ['Product', 'Cart', 'Favorites'],
    endpoints: (builder) => ({
        getProducts: builder.query<BaseItem[], { categoryID: number, search?: string}> ({
            query: ({ categoryID, search }) => ({
                url: '/products',
                params: {
                ...(categoryID > 0 ? {category: categoryID} : {}),
                ...(search ? { search } : {})
                }
            }),
            providesTags: ['Product']
        }),

        getCart: builder.query<CartResponse, number>({
            query: () => ({
                url: '/cart',
                headers: {'user-id': '1'},
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
                headers: {
                    'user-id': '1'
                }

            }),
                invalidatesTags: ['Cart']
        }),
        removeFromCart: builder.mutation<CartResponse, number>({
            query: (productId) => ({
                url: `/cart/remove/${productId}`,
                method: 'DELETE',
                headers: {
                    'user-id': '1'
                }
            }),
            invalidatesTags: ['Cart']
        }),
        removeAllCart: builder.mutation<{ message: string }, void> ({
            query: () => ({
                url: '/cart/clear',
                method: 'DELETE',
                headers: {
                    'user-id': '1'
                }
            }),
            invalidatesTags: ['Cart']
        }),
        updateCountProduct: builder.mutation<CartResponse, { productId: number, quantity: number}> ({
            query: ({ productId, quantity }) => ({
                url: `/cart/update/${productId}`,
                method: 'PUT',
                body: { quantity },
                headers: {
                    'user-id': '1'
                }
            }),
            invalidatesTags: ['Cart']
        }),
        getFavorite: builder.query<FavoriteResponse, void> ({
            query: () => ({
                url: '/favorites',
                method: 'GET',  
                headers: {
                    'user-id': '1'
                }
            }),
            providesTags: ['Favorites'],
        }),
        addOnFavorite: builder.mutation<FavoriteResponse, { productId: number }> ({
            query: (body) => ({
                url: '/favorites/add',
                body,
                method: 'POST',
                headers: {
                    'user-id': '1'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        removeAllFavorite: builder.mutation<{ message: string }, void> ({
            query: () => ({
                url: '/favorites/clear',
                method: 'DELETE',
                headers: {
                    'user-id': '1'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        removeFromFavorite: builder.mutation<{ message: string }, number > ({
            query: (productId) => ({
                url: `/favorites/remove/${productId}`,
                method: 'DELETE',
                headers: {
                    'user-id': '1'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
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
} = apiSlice;
