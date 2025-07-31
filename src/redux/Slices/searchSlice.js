import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase/supabaseClient';

export const searchData = createAsyncThunk(
    'search/fetch',
    async ( {searchTerm , tableName}) => {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .ilike('name', `%${searchTerm}%`);
        if (error) throw error;
        return data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loading: false,
        error: null,
        searchTerm: '',
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchData.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;