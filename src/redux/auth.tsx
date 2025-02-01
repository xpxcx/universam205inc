import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuth: !!localStorage.getItem('token')
    },
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuth = !!action.payload;
            localStorage.setItem('token', action.payload);
        },
        logOut(state) {
            state.token = null;
            state.isAuth = false;
            localStorage.removeItem('token');
        }
        
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;