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

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
};
interface ItemSliceState {
   items: Item[],
   status: Status,
}
type FetchItemsArgs = {
    categoryID: number,
}
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

interface AddCart {
    productId: number,
    quantity: number,
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api'}),
    tagTypes: ['Product', 'Cart'],
    endpoints: (builder) => ({
        getProducts: builder.query<BaseItem[], number> ({
            query: (categoryID) => ({
                url: '/products',
                params: categoryID > 0 ? {category: categoryID} : {}
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
                    (sum, item) => sum + (item.CartItem.quantity*item.price), 0 || 0
                ),
                totalCount: response.Products?.reduce(
                    (sum, item) => sum + item.CartItem.quantity, 0 || 0
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
        })
    })
});

export const {
    useGetProductsQuery,
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
} = apiSlice;
