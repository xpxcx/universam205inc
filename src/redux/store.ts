import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./items/slice";
import filterSlice from "./filter/slice"
import { apiSlice } from "./apiSlice";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filter: filterSlice,
        item: itemSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
