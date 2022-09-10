//storage for globally saved state

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme-slice';
import authenticationSuccessReducer from '../features/authentication-success-slice';

export const store = configureStore({ //global store
    reducer: {
        theme: themeReducer, //current theme (light or dark mode)
        authenticationSuccess: authenticationSuccessReducer //message if the user signed out or deletes their account
    }
});