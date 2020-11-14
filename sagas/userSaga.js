import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

export function* updatedUser(action) {
  console.log("USER_UPDATE_REQUESTED received");
   try {
      const url = `/api/user`;
      const body = JSON.stringify(action.data)
      console.log(`Body ${body}`);
      const response = yield fetch(url, {method: 'POST', body: body,headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }}).then(resp => resp.json(),);
      yield put({type: "USER_UPDATE_SUCCESS", data: response});
   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}
