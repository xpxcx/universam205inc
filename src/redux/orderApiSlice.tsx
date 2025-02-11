    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
    
    export interface OrderResponse {
            id: number,          
            userId: number,      
            totalPrice: number,  
            deliveryRoom: string | null,  
            OrderItems: {        
                    id: number,
                    orderId: number,
                    productId: number,
                    quantity: number,
                    price: number,
                    Product: {
                        id: number,
                        title: string,
                        imageUrl: string,
                        price: number,
                        size: number,
                        unit: string,
                };
            }[];
            createdAt: string;
            updatedAt: string;
        }
    interface EditRoom {
        message: string,
        order: {
            id: number,
            deliveryRoom: string,
            status: string
        }
    }
    export const orderApiSlice = createApi({
        reducerPath: 'orderApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api',
            prepareHeaders: (headers) => {
                const token = localStorage.getItem('token');
                if(token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
            }

        }),
        tagTypes: ['Order', 'Cart'],
        endpoints: (builder) => ({
            createOrder: builder.mutation<OrderResponse, void>({
                query: () => ({
                    url: '/orders',
                    method: 'POST'
                }),
                invalidatesTags: ['Order', 'Cart']
            }),
            orderEditRoom: builder.mutation<EditRoom, { room: string, orderId: number}> ({
                query: ({room, orderId}) => ({
                    url: `/orders/${orderId}/delivery-room`,
                    method: 'PATCH',
                    body: {
                        room
                    }
                }),
                invalidatesTags: ['Order', 'Cart']
            }),
            getOrder: builder.query<OrderResponse, { id: number | undefined}> ({
                query: ({ id }) => `/orders/${id}`,
                providesTags: ['Order']
            }),
            
        }),
        
        
    })

    export const {
        useCreateOrderMutation,
        useOrderEditRoomMutation,
        useGetOrderQuery,
    } = orderApiSlice;