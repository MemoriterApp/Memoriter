//storage for globally saved state

import { configureStore } from '@reduxjs/toolkit';
import authenticationSuccessReducer from '../features/authentication-success-slice';

export const store = configureStore({ //global store
    reducer: {
        authenticationSuccess: authenticationSuccessReducer //message if the user signed out or deletes their account
    }
});