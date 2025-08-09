import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/supabaseClient';

export const getPaymentsReqs = createAsyncThunk(
    'requests/getPaymentsReqs',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('payment_requests')
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
    'requests/changePaymentStatus',
    async ({id}, thunkAPI) => {
        try {
            console.log("Sending to pay_out function:", {id});
     
            const { data, error } = await supabase.functions.invoke("pay_out", {
                method: "POST",
                body: { "payment_id": id }
            });
            console.log("Function response:", { data, error , id});
            if (error) {
                console.error('Error invoking pay_out function:', error);
                return thunkAPI.rejectWithValue(error.message);
            }

       
            return data;
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
    reducers:{},
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
            // .addCase(changePaymentStatus.fulfilled, (state, action) => {
            //     const updatedRequest = action.payload;
            //     const index = state.data.findIndex(req => req.id === updatedRequest.id);
            //     if (index !== -1) {
            //         state.data[index] = updatedRequest;
            //     }
            // })
            .addCase(changePaymentStatus.fulfilled, (state, action) => {
                if (!action.payload) return;
                const updatedRequest = action.payload;
                const index = state.data.findIndex(req => req.id === updatedRequest.id);
                if (index !== -1) {
                    state.data[index] = updatedRequest;
                }
            })
    }

})

export default paymentReqSlice.reducer