import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({ //global state for the sign out (or delete account) success message
    name: 'theme', //name (required for identification)
    initialState: { value: localStorage.getItem('theme') }, //default value from localStorage (if none it is treated as dark)
    reducers: {
        changeTheme: (state, action) => { //function for manipulating the state
            state.value = action.payload;
        }
    }
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;