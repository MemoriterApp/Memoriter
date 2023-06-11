import { createSlice } from '@reduxjs/toolkit';

// global state to set the visual theme
export const themeSlice = createSlice({
  name: 'theme', // name (required for identification)
  initialState: { value: localStorage.getItem('theme') }, // default value from localStorage (if none it is treated as light)
  reducers: {
    // function for manipulating the state
    changeTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
