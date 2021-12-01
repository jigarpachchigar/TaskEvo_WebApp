import { combineReducers } from "redux";
import home from "./home";
import auth from "./auth";
import task from "./task";
const reducer = combineReducers({
	home,
	auth,
	task,
});
export default reducer;
