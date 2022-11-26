import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const fetchMatch = createAsyncThunk('bot/fetchMatch',  async (string) => {
    const {data} = await axios.get(`/bot/match/${string}`);
    return data;
})

export const fetchAllQuestions = createAsyncThunk('bot/fetchAllQuestions',  async () => {
    const {data} = await axios.get("/bot/questions");
    return data;
})

export const fetchAddQuestion = createAsyncThunk('bot/fetchAddQuestion',  async (params) => {
    const {data} = await axios.post("/bot/questions", params);
    return data;
})
export const fetchAddAnswer = createAsyncThunk('bot/fetchAddAnswer',  async (params) => {
    const {data} = await axios.post("/bot", params);
    return data;
})


const initialState = {
    qa: null,
    status: 'loading'
}

const botSlice = createSlice({
    name: "bot",
    initialState,
    reducers:{
        newQuestion:(state, ) => {
            state.qa = null;
        },
    },
    extraReducers: {
        [fetchMatch.pending]: (state) => {
            state.status = 'loading';
            state.qa = null;
        },
        [fetchMatch.fulfilled]: (state, action) => {
            state.qa = action.payload;
            state.status = 'loaded';
        },
        [fetchMatch.rejected]: (state) => {
            state.qa = null;
            state.status = 'error';
        },
        [fetchAllQuestions.pending]: (state) => {
            state.status = 'loading';
            state.qa = null;
        },
        [fetchAllQuestions.fulfilled]: (state, action) => {
            state.qa = action.payload;
            state.status = 'loaded';
        },
        [fetchAllQuestions.rejected]: (state) => {
            state.qa = null;
            state.status = 'error';
        }
    }
})

export const botReducer = botSlice.reducer;

export const {newQuestion} = botSlice.actions;