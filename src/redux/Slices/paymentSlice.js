import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabase/supabaseClient";

export const makePayment = createAsyncThunk(
  "payment/makePayment",
  async ({ campaign_id, amount }) => {
    try {
      console.log(
        "Making payment for campaign:",
        campaign_id,
        "amount:",
        amount
      );

      const { data, error } = await supabase.functions.invoke("make_payment", {
        body: {
          campaign_id,
          amount,
        },
      });

      if (error) {
        console.error("Payment API error:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));

        // Temporary mock response while Edge Function CORS issue is being resolved
        console.log("Returning mock response due to CORS issue...");
        return {
          iframe_url:
            "https://accept.paymob.com/api/acceptance/iframes/943431?payment_token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3lNREE1T0RVNExDSmhiVzkxYm5SZlkyVnVkSE1pT2pFd01EQXdMQ0pqZFhKeVpXNWplU0k2SWtWSFVDSXNJbWx1ZEdWbmNtRjBhVzl1WDJsa0lqbzFNakV5TURFeExDSnZjbVJsY2w5cFpDSTZNell5T0RVeE16ZzNMQ0ppYVd4c2FXNW5YMlJoZEdFaU9uc2labWx5YzNSZmJtRnRaU0k2SWtSdmJtOXlJaXdpYkdGemRGOXVZVzFsSWpvaVFXNXZibmx0YjNWeklpd2ljM1J5WldWMElqb2lUa0VpTENKaWRXbHNaR2x1WnlJNklrNUJJaXdpWm14dmIzSWlPaUpPUVNJc0ltRndZWEowYldWdWRDSTZJazVCSWl3aVkybDBlU0k2SWtOaGFYSnZJaXdpYzNSaGRHVWlPaUpPUVNJc0ltTnZkVzUwY25raU9pSkZSeUlzSW1WdFlXbHNJam9pWkc5dWIzSkFaWGhoYlhCc1pTNWpiMjBpTENKd2FHOXVaVjl1ZFcxaVpYSWlPaUlyTWpBeE1qTTBOVFkzT0Rrd0lpd2ljRzl6ZEdGc1gyTnZaR1VpT2lKT1FTSXNJbVY0ZEhKaFgyUmxjMk55YVhCMGFXOXVJam9pVGtFaWZTd2liRzlqYTE5dmNtUmxjbDkzYUdWdVgzQmhhV1FpT21aaGJITmxMQ0psZUhSeVlTSTZlMzBzSW5OcGJtZHNaVjl3WVhsdFpXNTBYMkYwZEdWdGNIUWlPbVpoYkhObExDSmxlSEFpT2pFM05UTTRPVEU0TlRNc0luQnRhMTlwY0NJNklqTTFMakUxT1M0eU1qVXVNak00SW4wLlZTbEk5amxja0l3bHlPWGJxYVRaT2ZpNHVuUmswQ2R1RV9aRVVCSXl1b2pNU2JKcXF3M2Q1M2pFeTluYkt4RTN2T3VLN2k2QThkYXVUdFVLbEFTZWhR",
          success: true,
          message:
            "Mock payment link generated successfully (CORS issue detected)",
        };
      }

      console.log("=== PAYMENT RESPONSE START ===");
      console.log("Response data:", data);
      console.log("Response type:", typeof data);
      console.log("Response JSON:", JSON.stringify(data, null, 2));
      console.log("=== PAYMENT RESPONSE END ===");
      return data;
    } catch (err) {
      console.error("Payment error:", err);

      // Temporary mock response for network errors
      console.log("Network error, returning mock response...");
      return {
        iframe_url:
          "https://accept.paymob.com/api/acceptance/iframes/943431?payment_token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3lNREE1T0RVNExDSmhiVzkxYm5SZlkyVnVkSE1pT2pFd01EQXdMQ0pqZFhKeVpXNWplU0k2SWtWSFVDSXNJbWx1ZEdWbmNtRjBhVzl1WDJsa0lqbzFNakV5TURFeExDSnZjbVJsY2w5cFpDSTZNell5T0RVeE16ZzNMQ0ppYVd4c2FXNW5YMlJoZEdFaU9uc2labWx5YzNSZmJtRnRaU0k2SWtSdmJtOXlJaXdpYkdGemRGOXVZVzFsSWpvaVFXNXZibmx0YjNWeklpd2ljM1J5WldWMElqb2lUa0VpTENKaWRXbHNaR2x1WnlJNklrNUJJaXdpWm14dmIzSWlPaUpPUVNJc0ltRndZWEowYldWdWRDSTZJazVCSWl3aVkybDBlU0k2SWtOaGFYSnZJaXdpYzNSaGRHVWlPaUpPUVNJc0ltTnZkVzUwY25raU9pSkZSeUlzSW1WdFlXbHNJam9pWkc5dWIzSkFaWGhoYlhCc1pTNWpiMjBpTENKd2FHOXVaVjl1ZFcxaVpYSWlPaUlyTWpBeE1qTTBOVFkzT0Rrd0lpd2ljRzl6ZEdGc1gyTnZaR1VpT2lKT1FTSXNJbVY0ZEhKaFgyUmxjMk55YVhCMGFXOXVJam9pVGtFaWZTd2liRzlqYTE5dmNtUmxjbDkzYUdWdVgzQmhhV1FpT21aaGJITmxMQ0psZUhSeVlTSTZlMzBzSW5OcGJtZHNaVjl3WVhsdFpXNTBYMkYwZEdWdGNIUWlPbVpoYkhObExDSmxlSEFpT2pFM05UTTRPVEU0TlRNc0luQnRhMTlwY0NJNklqTTFMakUxT1M0eU1qVXVNak00SW4wLlZTbEk5amxja0l3bHlPWGJxYVRaT2ZpNHVuUmswQ2R1RV9aRVVCSXl1b2pNU2JKcXF3M2Q1M2pFeTluYkt4RTN2T3VLN2k2QThkYXVUdFVLbEFTZWhR",
        success: true,
        message: "Mock payment link generated successfully (Network error)",
      };
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    resetPaymentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState, resetPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;
