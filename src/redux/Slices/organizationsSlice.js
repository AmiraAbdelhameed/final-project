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
export const deleteOrganization = createAsyncThunk(
    'organizations/deleteOrganization',
    async (id, thunkAPI) => {
        try {
            const { error } = await supabase
                .from('organizations')
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
export const getOrganizationById = createAsyncThunk(
    'organizations/getOrganizationById',
    async (id, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('organizations')
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
export const getOrganizationCampaignsById = createAsyncThunk(
    'organizations/getOrganizationCampaignsById',
    async (organization_id, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .eq('organization_id', organization_id);

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
        organizationCampaigns: [],
        selectedOrg: null,
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
            .addCase(deleteOrganization.fulfilled, (state, action) => {
                const id = action.payload;
                state.data = state.data.filter(org => org.id !== id);
            })
            .addCase(deleteOrganization.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete organization';
            })
            .addCase(getOrganizationById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedOrg = null;
            })
            .addCase(getOrganizationById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrg = action.payload;
            })
            .addCase(getOrganizationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrganizationCampaignsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrganizationCampaignsById.fulfilled, (state, action) => {
                state.loading = false;
                state.organizationCampaigns = action.payload;
            })
            .addCase(getOrganizationCampaignsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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
