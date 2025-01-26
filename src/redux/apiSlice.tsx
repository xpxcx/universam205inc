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
        CartItem: {
            quantity: number;
        }
    }[]
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
            providesTags: ['Cart']
        }),
    })
});

export const {
    useGetProductsQuery,
    useGetCartQuery,
} = apiSlice;
