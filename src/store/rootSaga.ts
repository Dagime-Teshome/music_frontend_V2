import { all, fork } from "redux-saga/effects";
import { songsSagas } from "../features/songs/saga";
import { filterSagas } from "../features/filters/saga";
import { statsSagas } from "../features/stats/saga";

export default function* rootSaga() {
  yield all([fork(songsSagas), fork(filterSagas), fork(statsSagas)]);
}
