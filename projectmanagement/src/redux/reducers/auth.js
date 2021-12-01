import {
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGOUT_FAILED,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	RESET,
} from "../types";

const initialState = {
	Login: [],
	Register: [],
	Logout: [],
};
const auth = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				Login: action.data,
				Logout: [],
			};
		case LOGIN_FAILED:
			return {
				...state,
				Login: action.error,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				Register: action.data,
			};
		case REGISTER_FAILED:
			return {
				...state,
				Register: action.error,
			};
		case LOGOUT_SUCCESS:
			localStorage.clear();
			console.log(initialState, "initialState===");
			return {
				Login: [],
				Register: [],
				Logout: action.data,
			};
		// return {
		// 	...initialState,
		// 	Logout: action.data
		// };
		case LOGOUT_FAILED:
			return {
				...state,
				Register: [],
				Logout: action.error,
			};
		case RESET:
			return {
				Login: [],
				Register: [],
			};
		default:
			return state;
	}
};
export default auth;
