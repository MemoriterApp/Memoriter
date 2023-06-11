// storage for globally saved state

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme-slice';

// global store
export const store = configureStore({
  reducer: {
    theme: themeReducer, // current theme (light or dark mode)
  },
});
