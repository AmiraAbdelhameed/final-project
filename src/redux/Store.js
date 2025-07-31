import { configureStore } from "@reduxjs/toolkit";
import organizationReducer from "./Slices/organizationsSlice";
import campaignsReducer from "./Slices/campaignsSlice";
import paymentReducer from "./Slices/paymentSlice";
import searchReducer from './Slices/searchSlice'
export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    campaigns: campaignsReducer,
    payment: paymentReducer,
    search: searchReducer,
  },
});
