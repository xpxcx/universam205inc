import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// export fetchItems = createAsyncThunk('', async(params:))    
export type Item = {
    imageUrl: string,
    title: string,
    price: number,
}
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
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(fetchPizzas.pending, (state) => {
    //         state.status = Status.LOADING;
    //         state.items = [];
    //     }) 
    //     .addCase(fetchPizzas.fulfilled, (state, action) => {
    //         state.items = action.payload;
    //         state.status = Status.SUCCESS;
    //     })
    //     .addCase(fetchPizzas.rejected, (state) => {
    //         state.status = Status.ERROR;
    //         state.items = [];
    //     });
    // }

})