import { all } from "redux-saga/effects";
import todosSaga from "./todosSaga";

export default function* rootSaga() {
  yield all([todosSaga()]);
}
