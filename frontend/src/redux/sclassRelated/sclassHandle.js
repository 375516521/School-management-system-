import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || ''
});

const joinPath = (...parts) =>
    parts
        .map(p => String(p || '').trim().replace(/^\/+|\/+$/g, ''))
        .filter(Boolean)
        .join('/');

const handleGet = async (dispatch, {
    path,
    requestAction = getRequest,
    successAction,
    failAction = getFailed
}) => {
    dispatch(requestAction());

    try {
        const res = await api.get(`/${joinPath(path)}`);
        const data = res.data;

        // If backend sends a message field treat as failure (keeps original behavior)
        if (data && data.message) {
            dispatch(failAction(data.message));
            return;
        }

        if (successAction) {
            dispatch(successAction(data));
        } else {
            // fallback to generic success if present
            dispatch(getSuccess(data));
        }
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Network Error';
        dispatch(getError(message));
    }
};

export const getAllSclasses = (id, address) => async (dispatch) => {
    // original used `${address}List/${id}`
    await handleGet(dispatch, {
        path: `${address}List/${id}`,
        requestAction: getRequest,
        successAction: getSuccess,
        failAction: getFailedTwo // keep original special failure action
    });
};

export const getClassStudents = (id) => async (dispatch) => {
    await handleGet(dispatch, {
        path: `Sclass/Students/${id}`,
        requestAction: getRequest,
        successAction: getStudentsSuccess,
        failAction: getFailedTwo
    });
};

export const getClassDetails = (id, address) => async (dispatch) => {
    await handleGet(dispatch, {
        path: `${address}/${id}`,
        requestAction: getRequest,
        successAction: detailsSuccess
    });
};

export const getSubjectList = (id, address) => async (dispatch) => {
    await handleGet(dispatch, {
        path: `${address}/${id}`,
        requestAction: getRequest,
        successAction: getSubjectsSuccess,
        failAction: getFailed
    });
};

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    await handleGet(dispatch, {
        path: `FreeSubjectList/${id}`,
        requestAction: getRequest,
        successAction: getSubjectsSuccess,
        failAction: getFailed
    });
};

export const getSubjectDetails = (id, address) => async (dispatch) => {
    await handleGet(dispatch, {
        path: `${address}/${id}`,
        requestAction: getSubDetailsRequest,
        successAction: getSubDetailsSuccess
    });
};