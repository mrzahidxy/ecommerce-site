import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            const {accessToken, ...rest} = action.payload
            state.currentUser = rest
        },
        loginFailed: (state, action) => {
            state.isFetching = false;
            state.isError = true;
        }
    },
});

export const { loginStart, loginSuccess, loginFailed } = userSlice.actions;
export default userSlice.reducer;
