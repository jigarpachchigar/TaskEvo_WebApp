import {
	CREATE_TASK_FAILED,
	CREATE_TASK_SUCCESS,
	EMPTY_REDUCER_FAILED,
	EMPTY_REDUCER_SUCCESS,
	GET_TASK_FAILED,
	GET_TASK_SUCCESS,
	GET_USER_FAILED,
	GET_USER_SUCCESS,
} from "../types";

const initialState = {
	Task: [],
	Users: [],
	taskList: [],
};
const task = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TASK_SUCCESS:
			return {
				...state,
				Task: action.data,
			};
		case CREATE_TASK_FAILED:
			return {
				...state,
				Task: action.error,
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				Users: action.data,
			};
		case GET_USER_FAILED:
			return {
				...state,
				Users: action.error,
			};
		case GET_TASK_SUCCESS:
			return {
				...state,
				taskList: action.data,
			};
		case GET_TASK_FAILED:
			return {
				...state,
				taskList: action.error,
			};
		case EMPTY_REDUCER_FAILED:
			return { ...state, Task: [] };
		case EMPTY_REDUCER_SUCCESS:
			return { ...state, Task: [] };
		default:
			return state;
	}
};
export default task;
