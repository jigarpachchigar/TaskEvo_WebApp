import { call, put, takeLatest, all } from "redux-saga/effects";
import axiosInstance from "../../utils/axiosInterceptors";
import { addStatus } from "../actions/home";
import {
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT,
	CREATE_PROJECT_FAILED,
	GET_ALL_PROJECTS,
	GET_ALL_PROJECTS_FAILED,
	GET_ALL_PROJECTS_SUCCESS,
	ADD_STATUS,
	ADD_STATUS_SUCCESS,
	ADD_STATUS_FAILED,
	EMPTY_HOME_REDUCER_SUCCESS,
	EMPTY_HOME_REDUCER_FAILED,
	EMPTY_HOME_REDUCER,
} from "../types";

//create project api
function createProjectApi(action) {
	return axiosInstance.post("project/add-project", action?.payload);
}
function* createProject(action) {
	try {
		const resp = yield call(createProjectApi, action);
		yield put({ type: CREATE_PROJECT_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: CREATE_PROJECT_FAILED, error: resp });
	}
}

function getProjectApi(action) {
	return axiosInstance.get("users/user-project");
}
function* getProject(action) {
	try {
		const resp = yield call(getProjectApi, action);
		yield put({ type: GET_ALL_PROJECTS_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: GET_ALL_PROJECTS_FAILED, error: resp });
	}
}

function addStatusApi(action) {
	return axiosInstance.post(`project/done-task/${action?.payload?.id}`, action);
}
function* addTaskStatus(action) {
	try {
		const resp = yield call(addStatusApi, action);
		yield put({ type: ADD_STATUS_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: ADD_STATUS_FAILED, error: resp });
	}
}

function* emptyHomeReducer() {
	try {
		yield put({ type: EMPTY_HOME_REDUCER_SUCCESS });
	} catch (err) {
		yield put({ type: EMPTY_HOME_REDUCER_FAILED });
	}
}

function* home() {
	yield all([takeLatest(CREATE_PROJECT, createProject)]);
	yield all([takeLatest(GET_ALL_PROJECTS, getProject)]);
	yield all([takeLatest(ADD_STATUS, addTaskStatus)]);
	yield all([takeLatest(EMPTY_HOME_REDUCER, emptyHomeReducer)]);
}
export default home;
