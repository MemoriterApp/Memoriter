import { createSlice } from '@reduxjs/toolkit';

// global state for the sign out (or delete account) success message
export const authenticationSuccessSlice = createSlice({
  name: 'authentication-success', // name (required for identification)
  initialState: { value: '' }, // default value (empty)
  reducers: {
    // function for manipulating the state
    displaySuccessMessage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { displaySuccessMessage } = authenticationSuccessSlice.actions;

export default authenticationSuccessSlice.reducer;
