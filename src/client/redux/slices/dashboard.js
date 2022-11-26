import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const fetchLocations = createAsyncThunk('dashboard/fetchLocations',  async () => {
    const {data} = await axios.get('/dashboard/locations');
    return data;
})


const initialState = {
    location: null,
    status: 'loading'
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{},
    extraReducers: {
        [fetchLocations.pending]: (state) => {
            state.status = 'loading';
            state.cities = null;
        },
        [fetchLocations.fulfilled]: (state, action) => {
            state.location = action.payload;
            state.status = 'loaded';
        },
        [fetchLocations.rejected]: (state) => {
            state.location = null;
            state.status = 'error';
        }
    }
})

export const dashboardReducer = dashboardSlice.reducer;