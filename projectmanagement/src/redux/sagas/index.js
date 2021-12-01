import { all } from "redux-saga/effects";
import auth from "./auth";
import home from "./home";
import task from "./task"
export default function* rootSaga() {
	yield all([home(), auth(),task()]);
}
