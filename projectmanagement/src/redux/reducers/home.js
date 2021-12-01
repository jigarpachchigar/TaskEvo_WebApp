import {
	ADD_STATUS_FAILED,
	ADD_STATUS_SUCCESS,
	CREATE_PROJECT_FAILED,
	CREATE_PROJECT_SUCCESS,
	EMPTY_HOME_REDUCER_FAILED,
	EMPTY_HOME_REDUCER_SUCCESS,
	GET_ALL_PROJECTS_FAILED,
	GET_ALL_PROJECTS_SUCCESS,
} from "../types";

const initialState = {
	Project: [],
	projectsList: [],
	statusAdd: [],
};
const home = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PROJECT_SUCCESS:
			return {
				...state,
				Project: action.data,
			};
		case CREATE_PROJECT_FAILED:
			return {
				...state,
				Project: action.error,
			};
		case GET_ALL_PROJECTS_SUCCESS:
			return {
				...state,
				projectsList: action.data,
			};
		case GET_ALL_PROJECTS_FAILED:
			return {
				...state,
				projectsList: action.error,
			};
		case ADD_STATUS_SUCCESS:
			return {
				...state,
				statusAdd: action.data,
			};
		case ADD_STATUS_FAILED:
			return {
				...state,
				statusAdd: action.error,
			};
		case EMPTY_HOME_REDUCER_SUCCESS:
			return {
				...state,
				statusAdd: [],
			};
		case EMPTY_HOME_REDUCER_FAILED:
			return {
				...state,
				statusAdd: [],
				// Project: [],
			};
		default:
			return state;
	}
};
export default home;
