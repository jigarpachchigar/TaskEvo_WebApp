import { CREATE_TASK, EMPTY_REDUCER, GET_TASK, GET_USER } from "../types";

export const createTask = (data) => (
	console.log(data, "ffffffffffffffffffffffffffff"),
	{
		type: CREATE_TASK,
		payload: data,
	}
);

export const getTask = (data) => ({
	type: GET_TASK,
	data: data,
});

export const getUsers = () => ({
	type: GET_USER,
});

export const emptyReducer = () => ({
	type: EMPTY_REDUCER,
});
