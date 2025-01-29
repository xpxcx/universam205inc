import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceState {
    categoryID: number,
    searchValue: string,
}
const initialState: FilterSliceState = {
    categoryID: 0,
    searchValue: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.categoryID = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        
    }
});

export const { setCategory, setSearch } = filterSlice.actions;

export default filterSlice.reducer