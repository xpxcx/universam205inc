import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/slice"
import { apiSlice } from "./apiSlice";
import { userApiSlice } from './userApiSlice'
import authSlice from './auth';
import { adminApiSlice } from "./adminApiSlice";
import { orderApiSlice } from "./orderApiSlice";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        filter: filterSlice,
        auth: authSlice,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
        [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, userApiSlice.middleware, adminApiSlice.middleware, orderApiSlice.middleware),
    
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
