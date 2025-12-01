import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// helper to attach token if present
const withAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
};

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await api.get(`/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
}

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await api.get(`/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
}

export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());

    try {
        await api.put('/TeacherSubject', { teacherId, teachSubject }, withAuth());
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
}

// new: create a teacher
export const createTeacher = (teacherData) => async (dispatch) => {
    dispatch(getRequest());

    try {
        await api.post('/Teacher', teacherData, withAuth());
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
}

// new: delete a teacher by id
export const deleteTeacher = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        await api.delete(`/Teacher/${id}`, withAuth());
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
}