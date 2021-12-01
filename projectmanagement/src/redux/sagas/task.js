import { call, put, takeLatest, all } from "redux-saga/effects";
import axiosInstance from "../../utils/axiosInterceptors";
import {
	CREATE_TASK,
	CREATE_TASK_FAILED,
	CREATE_TASK_SUCCESS,
	GET_TASK,
	GET_TASK_SUCCESS,
	GET_TASK_FAILED,
	GET_USER_SUCCESS,
	GET_USER,
	GET_USER_FAILED,
	EMPTY_REDUCER_SUCCESS,
	EMPTY_REDUCER_FAILED,
	EMPTY_REDUCER,
} from "../types";

//create task api
function createTaskApi(action) {
	return axiosInstance.post("project/add-task", action?.payload);
}
function* createTask(action) {
	try {
		const resp = yield call(createTaskApi, action);
		yield put({ type: CREATE_TASK_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: CREATE_TASK_FAILED, error: resp });
	}
}
//get user assign  project api
function getTaskApi(action) {
	return axiosInstance.post("users/user-assign-project", action?.payload);
}
function* getTask(action) {
	try {
		const resp = yield call(getTaskApi, action);
		yield put({ type: GET_TASK_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: GET_TASK_FAILED, error: resp });
	}
}

//get user list api
function getUsersApi(action) {
	return axiosInstance.get("users/user-list");
}
function* getUsers(action) {
	try {
		const resp = yield call(getUsersApi, action);
		yield put({ type: GET_USER_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: GET_USER_FAILED, error: resp });
	}
}

function* emptyReducer() {
	try {
		yield put({ type: EMPTY_REDUCER_SUCCESS });
	} catch (err) {
		yield put({ type: EMPTY_REDUCER_FAILED });
	}
}

function* task() {
	yield all([takeLatest(CREATE_TASK, createTask)]);
	yield all([takeLatest(GET_TASK, getTask)]);
	yield all([takeLatest(GET_USER, getUsers)]);
	yield all([takeLatest(EMPTY_REDUCER, emptyReducer)]);
}
export default task;
