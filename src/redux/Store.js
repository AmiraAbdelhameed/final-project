import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './Slices/organizationsSlice'
export const store = configureStore({
    reducer: {
        organizations: organizationReducer,
    },
});