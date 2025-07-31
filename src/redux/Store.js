import { configureStore } from "@reduxjs/toolkit";
import organizationReducer from "./Slices/organizationsSlice";
import campaignsReducer from "./Slices/campaignsSlice";
import paymentReducer from "./Slices/paymentSlice";

export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    campaigns: campaignsReducer,
    payment: paymentReducer,
  },
});
