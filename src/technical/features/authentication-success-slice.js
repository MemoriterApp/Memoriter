import { createSlice } from '@reduxjs/toolkit';

export const authenticationSuccessSlice = createSlice({ //global state for the sign out (or delete account) success message
	name: 'authentication-success', //name (required for identification)
	initialState: { value: '' }, //default value (empty)
	reducers: {
		displaySuccessMessage: (state, action) => { //function for manipulating the state
			state.value = action.payload;
		}
	}
});

export const { displaySuccessMessage } = authenticationSuccessSlice.actions;

export default authenticationSuccessSlice.reducer;