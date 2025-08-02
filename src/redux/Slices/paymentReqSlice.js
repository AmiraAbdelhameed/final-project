import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/supabaseClient';

export const getPaymentsReqs = createAsyncThunk(
    'requests/getPaymentsReqs',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('payment_requests').select('*');
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
    'requests/changePaymentStatus',
    async ({ id, newStatus }, thunkAPI) => {
        const { data, error } = await supabase
            .from('payment_requests')
            .update({ status: newStatus })
            .eq('id', id)
            .select('*');

        if (error) {
            console.error('Supabase Error:', error);
            return thunkAPI.rejectWithValue(error.message);
        }

        if (!data || data.length === 0) {
            return thunkAPI.rejectWithValue('No requests returned after update');
        }

        return data[0];
    }
);
const paymentReqSlice = createSlice({
    name: 'paymentReq',
    initialState: {
        data: [],
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