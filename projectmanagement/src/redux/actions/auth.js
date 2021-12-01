import { LOGIN, LOGOUT, REGISTER } from "../types";

export const login = (data) => {
	return { type: LOGIN, payload: data };
};
export const signup = (data) => {
	return { type: REGISTER, payload: data };
};

export const logout = () => {
	return { type: LOGOUT };
};
