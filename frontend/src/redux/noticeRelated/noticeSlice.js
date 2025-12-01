import { createSlice } from "@reduxjs/toolkit";

const NAME = "notice";

const initialState = {
    noticesList: [],
    loading: false,
    error: null,
    response: null,
};

const noticeSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        getRequest: (state) => ({ ...state, loading: true }),

        getSuccess: (state, action) => ({
            ...state,
            noticesList: action.payload,
            loading: false,
            error: null,
            response: null,
        }),

        getFailed: (state, action) => ({
            ...state,
            response: action.payload,
            loading: false,
            error: null,
        }),

        getError: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),
    },
});

export const { getRequest, getSuccess, getFailed, getError } =
    noticeSlice.actions;

export const noticeReducer = noticeSlice.reducer;