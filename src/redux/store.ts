import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/slice"
import { apiSlice } from "./apiSlice";
import { userSlice } from './userSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        filter: filterSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, userSlice.middleware),
    
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
