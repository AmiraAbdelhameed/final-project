import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/supabaseClient';

export const getPaymentsReqs = createAsyncThunk(
    'requests/getPaymentsReqs',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('payment_requests')
                // .select(`
                //     *,
                //     campaigns (
                //         id,
                //         name,
                //         payment_done,
                //         is_completed,
                //         organization_id
                //     )
                // `);
                .select(`
          *,
          campaigns (
            id,
            name,
            payment_done,
            is_completed,
            organization_id,
            organizations (
              name
            )
          )
        `);
            if (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const changePaymentStatus = createAsyncThunk(
    'requests/toggleApproval',
    async ({ id, newStatus, campaignId, campaignPayment }, thunkAPI) => {
        try {
 
            const { data: paymentData, error: paymentError } = await supabase
                .from('payment_requests')
                .update({ status: newStatus })
                .eq('id', id)
                .select(`
                    *,
                    campaigns (
                        id,
                        name,
                        payment_done,
                        is_completed
                    )
                `);

            if (paymentError) {
                console.error('Error updating payment_requests:', paymentError);
                return thunkAPI.rejectWithValue(paymentError.message);
            }

            // Then, update the related campaign
            const { error: campaignError } = await supabase
                .from('campaigns')
                .update({ payment_done: campaignPayment })
                .eq('id', campaignId);

            if (campaignError) {
                console.error('Error updating campaigns:', campaignError);
                return thunkAPI.rejectWithValue(campaignError.message);
            }

            return paymentData[0];
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const paymentReqSlice = createSlice({
    name: 'paymentReq',
    initialState: {
        data: [],
        campaignsById: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentsReqs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentsReqs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPaymentsReqs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changePaymentStatus.fulfilled, (state, action) => {
                const updatedRequest = action.payload;
                const index = state.data.findIndex(req => req.id === updatedRequest.id);
                if (index !== -1) {
                    state.data[index] = updatedRequest;
                }
            })
    }

})

export default paymentReqSlice.reducer