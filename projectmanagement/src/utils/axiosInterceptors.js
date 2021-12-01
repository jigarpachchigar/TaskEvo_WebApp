import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
});
// axiosInstance.defaults.headers.common["Authorization"] = "Auth-token";

axiosInstance.interceptors.request.use(
	(request) => {
		if (!request.url?.includes("signin" || "signup")) {
			const logged_user = localStorage.getItem("Auth-token");
			request.headers.common["Authorization"] = logged_user;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
