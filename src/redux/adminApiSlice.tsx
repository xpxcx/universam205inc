import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
export const adminApiSlice = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/admin',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if(token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductResponse[], ProductBody>({
            query: ({ categoryId, search}) => ({
                url: '/products',
                method: 'GET',
                params: { categoryId, search }
            }),
            providesTags: ['Product']
        }),
        addProduct: builder.mutation<{ message: string }, ProductInput>({
            query: ({ title, price, imageUrl, category, size, unit, type, inStock}) => ({
                url: '/products',
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
            invalidatesTags: ['Product']
        }),
        editProduct: builder.mutation<ProductResponse, ProductInput>({

            query: ({ id, ...data}) => {
                return {url: `/products/${id}`,
                method: 'PUT',
                body: {
                    ...data,
                }}
                
            },
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation<{ message: string}, {id: number}>({
            query: ({ id }) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        updateInStock: builder.mutation<{ message: string, inStock: number }, { amount: number, id: number}>({
            query: ({ amount, id }) => ({
                url: `products/${id}/stock`,
                method: 'PATCH',
                body: {
                    amount
                }
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const { 
    useGetProductsQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useUpdateInStockMutation,
} = adminApiSlice;