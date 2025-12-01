import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle", // kept original name to maintain compatibility
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        // legacy actions (kept for compatibility)
        getRequest(state) {
            state.loading = true;
        },
        getSuccess(state, action) {
            state.studentsList = Array.isArray(action.payload) ? action.payload : [];
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed(state, action) {
            state.response = action.payload ?? null;
            state.loading = false;
        },
        getError(state, action) {
            state.loading = false;
            state.error = action.payload ?? null;
        },
        underStudentControl(state) {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        },
        stuffDone(state) {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },

        // new/cleaner helpers and CRUD operations
        setStudents(state, action) {
            state.studentsList = Array.isArray(action.payload) ? action.payload : [];
            state.loading = false;
        },
        addStudent(state, action) {
            const student = action.payload;
            if (student && student.id != null) {
                const exists = state.studentsList.find((s) => s.id === student.id);
                if (!exists) {
                    state.studentsList.push(student);
                    state.response = "Student Successfully added";
                    state.statestatus = "added";
                } else {
                    state.response = "Student already exists";
                }
            } else {
                state.error = "Invalid student payload";
            }
            state.loading = false;
        },
        updateStudent(state, action) {
            const { id, changes } = action.payload || {};
            const idx = state.studentsList.findIndex((s) => s.id === id);
            if (idx !== -1) {
                state.studentsList[idx] = { ...state.studentsList[idx], ...changes };
                state.response = "Updated Student Successfully";
            } else {
                state.error = "Student not found";
            }
            state.loading = false;
        },
        removeStudent(state, action) {
            const id = action.payload;
            const originalLength = state.studentsList.length;
            state.studentsList = state.studentsList.filter((s) => s.id !== id);
            state.response =
                state.studentsList.length < originalLength ? "Student removed" : "Student not found";
            state.loading = false;
        },

        // utility actions
        setStatus(state, action) {
            state.statestatus = action.payload ?? "idle";
        },
        clearResponse(state) {
            state.response = null;
        },
        clearError(state) {
            state.error = null;
        },
        setLoading(state, action) {
            state.loading = Boolean(action.payload);
        },
    },
});

export const {
    // legacy
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underStudentControl,
    stuffDone,

    // new
    setStudents,
    addStudent,
    updateStudent,
    removeStudent,
    setStatus,
    clearResponse,
    clearError,
    setLoading,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;

// optional selectors (kept minimal)
export const selectStudents = (state) => state.student?.studentsList ?? [];
export const selectStudentById = (state, id) =>
    (state.student?.studentsList ?? []).find((s) => s.id === id) ?? null;