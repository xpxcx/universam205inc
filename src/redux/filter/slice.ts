import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FilterSliceState {
    categoryID: number,
}
const initialState: FilterSliceState = {
    categoryID: 0,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.categoryID = action.payload;
        }
    }
});

export const { setCategory } = filterSlice.actions;

export default filterSlice.reducer