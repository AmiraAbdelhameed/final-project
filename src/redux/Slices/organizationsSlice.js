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
            })
            .addCase(toggleApproval.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.data.findIndex(org => org.id === updated.id);
                if (index !== -1) {
                    state.data[index] = updated;
                }
            })
    },
});
export const toggleApproval = createAsyncThunk(
    'organizations/toggleApproval',
    async ({ id, currentStatus }, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('organizations')
                .update({ is_approved: !currentStatus })
                .eq('id', id)
                .select(); 

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            return data[0]; 
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export default organizationSlice.reducer;
