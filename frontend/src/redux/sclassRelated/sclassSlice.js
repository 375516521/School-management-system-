import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sclassesList: [],
    sclassStudents: [],
    sclassDetails: null,
    subjectsList: [],
    subjectDetails: null,
    loadingList: false,
    loadingStudents: false,
    loadingDetails: false,
    loadingSubjects: false,
    error: null,
};

const sclassSlice = createSlice({
    name: "sclass",
    initialState,
    reducers: {
        // Sclasses list
        fetchSclassesStart(state) {
            state.loadingList = true;
            state.error = null;
        },
        fetchSclassesSuccess(state, action) {
            state.sclassesList = action.payload;
            state.loadingList = false;
            state.error = null;
        },
        fetchSclassesFail(state, action) {
            state.sclassesList = [];
            state.loadingList = false;
            state.error = action.payload;
        },

        // Students for a class
        fetchStudentsStart(state) {
            state.loadingStudents = true;
            state.error = null;
        },
        fetchStudentsSuccess(state, action) {
            state.sclassStudents = action.payload;
            state.loadingStudents = false;
            state.error = null;
        },
        fetchStudentsFail(state, action) {
            state.sclassStudents = [];
            state.loadingStudents = false;
            state.error = action.payload;
        },

        // Subjects list
        fetchSubjectsStart(state) {
            state.loadingSubjects = true;
            state.error = null;
        },
        fetchSubjectsSuccess(state, action) {
            state.subjectsList = action.payload;
            state.loadingSubjects = false;
            state.error = null;
        },
        fetchSubjectsFail(state, action) {
            state.subjectsList = [];
            state.loadingSubjects = false;
            state.error = action.payload;
        },

        // Details
        fetchDetailsStart(state) {
            state.loadingDetails = true;
            state.error = null;
        },
        fetchDetailsSuccess(state, action) {
            state.sclassDetails = action.payload;
            state.loadingDetails = false;
            state.error = null;
        },
        fetchDetailsFail(state, action) {
            state.sclassDetails = null;
            state.loadingDetails = false;
            state.error = action.payload;
        },

        // reset helpers
        resetSubjects(state) {
            state.subjectsList = [];
        },
        resetAll(state) {
            Object.assign(state, initialState);
        },
    },
});

export const {
    fetchSclassesStart,
    fetchSclassesSuccess,
    fetchSclassesFail,
    fetchStudentsStart,
    fetchStudentsSuccess,
    fetchStudentsFail,
    fetchSubjectsStart,
    fetchSubjectsSuccess,
    fetchSubjectsFail,
    fetchDetailsStart,
    fetchDetailsSuccess,
    fetchDetailsFail,
    resetSubjects,
    resetAll,
} = sclassSlice.actions;

export const sclassReducer = sclassSlice.reducer;