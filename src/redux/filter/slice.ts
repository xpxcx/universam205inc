import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceState {
    id: number,
    categoryID: number,
    searchValue: string,
    adminSearchValue: string,
    adminCategoryID: number,

}
const initialState: FilterSliceState = {
    id: 1,
    categoryID: 0,
    searchValue: '',

    adminCategoryID: 0,
    adminSearchValue: ''
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
        setAdminSearch(state, action: PayloadAction<string>) {
            state.adminSearchValue = action.payload;
        },
        setAdminCategory(state, action: PayloadAction<number>) {
            state.adminCategoryID = action.payload;
        },
        setProductId(state, action) {
            state.id = action.payload
        }
    }
});

export const { setSearch, setCategory, setAdminCategory, setAdminSearch } = filterSlice.actions;

export default filterSlice.reducer