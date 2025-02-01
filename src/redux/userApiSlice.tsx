import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserData {
    id: number,
    login: string,
    room: string,
    role: string
}
interface AuthorazeResponse {
    token: string,
    user: {
        id: number,
        login: string,
        room: string,
    }
}
    
interface RegistInputData {
    login: string,
    password: string,
    room: string,
}

export interface SignInInputData {
    login: string,
    password: string,
}

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/users',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
     }),
    
    tagTypes: ['SignIn', 'LogIn', 'User'],
    endpoints: (builder) => ({
        registr: builder.mutation<AuthorazeResponse, RegistInputData> ({
            query: ({ login, password, room }) => ({
                url: '/register',
                method: 'POST',
                body: {
                    login: login,
                    password: password,
                    room: room
                }
            }), 
            invalidatesTags: ['LogIn']
        }),
        autorize: builder.mutation<AuthorazeResponse, SignInInputData> ({
            query: ({ login, password }) => ({
                url: '/login',
                method: 'POST',
                body: {
                    login: login,
                    password: password
                }
            }),
            invalidatesTags: ['SignIn']
        }),
        getCurrentUser: builder.query<UserData, void> ({
            query: () => ({
                url: '/me',
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        editUserRoom: builder.mutation<UserData, {room: string}> ({
            query: ({ room }) => ({
                url: '/room',
                method: 'PUT',
                body: {
                    room
                }
            }),
            invalidatesTags: ['User']
        })
    })
});


export const {
    useRegistrMutation,
    useAutorizeMutation,
    useGetCurrentUserQuery,
    useEditUserRoomMutation,
} = userApiSlice;