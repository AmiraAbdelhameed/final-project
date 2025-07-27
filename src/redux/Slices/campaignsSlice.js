// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { supabase } from '../../services/supabase/supabaseClient';

// export const getCampaigns = createAsyncThunk(
//     'campaigns/getCampaigns',
//     async (_, thunkAPI) => {
//         try {
//             const { data, error } = await supabase.from('campaigns').select('*');

//             if (error) {
//                 return thunkAPI.rejectWithValue(error.message);
//             }

//             return data;
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.message);
//         }
//     }
// );

// const campaignsSlice = createSlice({
//     name: 'campaigns',
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {

//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getCampaigns.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getCampaigns.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(getCampaigns.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(toggleApproval.fulfilled, (state, action) => {
//                 const updated = action.payload;
//                 const index = state.data.findIndex(org => org.id === updated.id);
//                 if (index !== -1) {
//                     state.data[index] = updated;
//                 }
//             })
//     },
// });
// export const toggleApproval = createAsyncThunk(
//     'campaigns/toggleApproval',
//     async ({ id, currentStatus }, thunkAPI) => {
//         try {
//             const { data, error } = await supabase
//                 .from('campaigns')
//                 .update({ is_approved: !currentStatus })
//                 .eq('id', id)
//                 .select(); 

//             if (error) {
//                 return thunkAPI.rejectWithValue(error.message);
//             }

//             return data[0]; 
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.message);
//         }
//     }
// );

// export default campaignsSlice.reducer;
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

            return data[0];
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: {
        data: [],
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
                const index = state.data.findIndex(campaign => campaign.id === updated.id);
                if (index !== -1) {
                    state.data[index] = updated;
                }
            });
    },
});

export default campaignsSlice.reducer;
