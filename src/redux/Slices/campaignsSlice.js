import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabase/supabaseClient";

export const getCampaigns = createAsyncThunk(
  "campaigns/getCampaigns",
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.from("campaigns").select("*");
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default campaignsSlice.reducer;
