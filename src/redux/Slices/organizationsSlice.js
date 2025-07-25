import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/supabaseClient';

export const getOrganizations = createAsyncThunk(
    'organizations/getOrganizations',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('organizations').select('*');

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const organizationSlice = createSlice({
    name: 'organizations',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrganizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrganizations.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default organizationSlice.reducer;
