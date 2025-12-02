import axios from 'axios';
import {
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
  fetchDetailsFail
} from './sclassSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Utility to ensure clean URL paths
const joinPath = (...parts) =>
  parts
    .map(p => String(p || '').trim().replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');

/**
 * -------------------------------------------------------
 * GENERIC HANDLERS
 * -------------------------------------------------------
 */

// Generic GET handler
export const handleGet = async (dispatch, {
  path,
  requestAction,
  successAction,
  failAction
}) => {
  dispatch(requestAction());

  try {
    const res = await api.get(`/${joinPath(path)}`);
    const data = res.data;

    if (data?.message) {
      dispatch(failAction(data.message));
      return;
    }

    dispatch(successAction(data));
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || 'Network Error';
    dispatch(failAction(message));
  }
};

// Generic POST handler (Login, etc.)
export const handlePost = async ({ path, payload }) => {
  try {
    const res = await api.post(`/${joinPath(path)}`, payload);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err?.message || 'Network Error');
  }
};

/**
 * -------------------------------------------------------
 * AUTH RELATED
 * -------------------------------------------------------
 */

export const loginUser = async (credentials) => {
  return await handlePost({
    path: 'auth/login',
    payload: credentials
  });
};

/**
 * -------------------------------------------------------
 * CLASS RELATED
 * -------------------------------------------------------
 */

// Fetch all classes
export const getAllSclasses = (id, address) => async (dispatch) => {
  await handleGet(dispatch, {
    path: `${address}List/${id}`,
    requestAction: fetchSclassesStart,
    successAction: fetchSclassesSuccess,
    failAction: fetchSclassesFail
  });
};

// Fetch class students
export const getClassStudents = (id) => async (dispatch) => {
  await handleGet(dispatch, {
    path: `Sclass/Students/${id}`,
    requestAction: fetchStudentsStart,
    successAction: fetchStudentsSuccess,
    failAction: fetchStudentsFail
  });
};

// Fetch single class details
export const getClassDetails = (id, address) => async (dispatch) => {
  await handleGet(dispatch, {
    path: `${address}/${id}`,
    requestAction: fetchDetailsStart,
    successAction: fetchDetailsSuccess,
    failAction: fetchDetailsFail
  });
};

/**
 * -------------------------------------------------------
 * SUBJECT RELATED
 * -------------------------------------------------------
 */

// Fetch subjects list
export const getSubjectList = (id, address) => async (dispatch) => {
  await handleGet(dispatch, {
    path: `${address}/${id}`,
    requestAction: fetchSubjectsStart,
    successAction: fetchSubjectsSuccess,
    failAction: fetchSubjectsFail
  });
};

// ✅ Fetch subject details (added as requested)
export const getSubjectDetails = (id, address) => async (dispatch) => {
  await handleGet(dispatch, {
    path: `${address}/${id}`,
    requestAction: fetchDetailsStart,
    successAction: fetchDetailsSuccess,
    failAction: fetchDetailsFail
  });
};

/**
 * -------------------------------------------------------
 * TEACHER RELATED
 * -------------------------------------------------------
 */

// ✅ Fetch teacher free class subjects (added as requested)
export const getTeacherFreeClassSubjects = (teacherId) => async (dispatch) => {
  await handleGet(dispatch, {
    path: `Teacher/FreeSubjects/${teacherId}`,
    requestAction: fetchSubjectsStart,
    successAction: fetchSubjectsSuccess,
    failAction: fetchSubjectsFail
  });
};
