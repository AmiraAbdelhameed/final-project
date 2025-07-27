
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/supabaseClient';

export const getCampaigns = createAsyncThunk(
    'campaigns/getCampaigns',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('campaigns').select('*');
            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const toggleApproval = createAsyncThunk(
    'campaigns/toggleApproval',
    async ({ id, currentStatus }, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .update({ is_approved: !currentStatus })
                .eq('id', id)
                .select('*');

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            if (!data || data.length === 0) {
                return thunkAPI.rejectWithValue('No campaign returned after update');
            }

            return data[0];
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);
export const deleteCampaign = createAsyncThunk(
    'campaigns/deleteCampaign',
    async (id, thunkAPI) => {
        try {
            const { error } = await supabase
                .from('campaigns')
                .delete()
                .eq('id', id);

            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }

            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);
export const getCampaignById = createAsyncThunk(
    'campaigns/getCampaignById',
    async (id, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .eq('id', id)
                .single();

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
    name: 'campaigns',
    initialState: {
        data: [],
        selectedCampaign:null,
        loading: false,
        error: null,
    },
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
            })
            .addCase(toggleApproval.fulfilled, (state, action) => {
                const updated = action.payload;
                if (!updated || !updated.id) return;
                const index = state.data.findIndex(campaign => campaign.id === updated.id);
                if (index !== -1) {
                    state.data[index] = updated;
                }
            })
            .addCase(deleteCampaign.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.data = state.data.filter(campaign => campaign.id !== deletedId);
            })
            .addCase(deleteCampaign.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getCampaignById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedOrg = null;
            })
            .addCase(getCampaignById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCampaign = action.payload;
            })
            .addCase(getCampaignById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default campaignsSlice.reducer;
