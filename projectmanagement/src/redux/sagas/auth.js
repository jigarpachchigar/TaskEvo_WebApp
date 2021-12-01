import { call, put, takeLatest, all } from "redux-saga/effects";
import axiosInstance from "../../utils/axiosInterceptors";
import axios from "axios";
import {
	LOGIN,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	REGISTER,
	REGISTER_FAILED,
	REGISTER_SUCCESS,
	LOGOUT,
	LOGOUT_FAILED,
	LOGOUT_SUCCESS
} from "../types";

//loginapi
function LoginApi(action) {
	return axiosInstance.post("users/signin", action?.payload);
}
function* login(action) {
	try {
		const resp = yield call(LoginApi, action);
		yield put({ type: LOGIN_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: LOGIN_FAILED, error: resp });
	}
}
function logoutApi(action) {
	return axiosInstance.get("users/signout");
}
function* logout(action) {
	try {
		const resp = yield call(logoutApi, action);
		yield put({ type: LOGOUT_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: LOGOUT_FAILED, error: resp });
	}
}


function RegisterApi(action) {
	return axiosInstance.post("users/signup", action?.payload);
}
function* register(action) {
	try {
		const resp = yield call(RegisterApi, action);
		yield put({ type: REGISTER_SUCCESS, data: resp });
	} catch (resp) {
		yield put({ type: REGISTER_FAILED, error: resp });
	}
}

function* auth() {
	yield all([takeLatest(LOGIN, login)]);
	yield all([takeLatest(REGISTER, register)]);
	yield all([takeLatest(LOGOUT, logout)]);

}
export default auth;
