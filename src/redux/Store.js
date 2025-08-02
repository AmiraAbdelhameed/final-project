import { configureStore } from "@reduxjs/toolkit";
import organizationReducer from "./Slices/organizationsSlice";
import campaignsReducer from "./Slices/campaignsSlice";
import paymentReducer from "./Slices/paymentSlice";
import searchReducer from './Slices/searchSlice'
import paymentReqsReducer from "./Slices/paymentReqSlice"
export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    campaigns: campaignsReducer,
    payment: paymentReducer,
    search: searchReducer,
    paymentReqs:paymentReqsReducer,
  },
});
