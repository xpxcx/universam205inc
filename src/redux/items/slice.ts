import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

const initialState: ItemSliceState = {
    items: [],
    status: Status.LOADING,
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItem(state, action:PayloadAction<Item[]>)    {
            state.items = [...action.payload]
        }
    },
});

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;