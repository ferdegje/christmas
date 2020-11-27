import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

const apiEndpoint = "/api/donation";
const keywordAction = "DONATION";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchDonation(action) {
  let query = [];
  for (var k in action) {
    query.push(`${k}=${action[k]}`)
  }
  query = query.join("&");
   try {
      const data = yield fetch(`${apiEndpoint}?${query}`).then(response => response.json(), );
      yield put({type: `${keywordAction}_LIST_SUCCESS`, data: data});
   } catch (e) {
      yield put({type: `${keywordAction}_LIST_ERROR`, message: e.message});
   }
}

export function* deletedDonation(action) {
   try {
      const url = `${apiEndpoint}/${action.id}`;
      const response = yield fetch(url, {method: 'DELETE'});
      if (response.status == 200) {
          yield put({type: `${keywordAction}_DELETE_SUCCESS`, id: action.id});
      } else {
          yield put({type: "ERROR", message: `Received ${response.status} when contacting ${url}`});
      }

   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}

export function* addedDonation(action) {
   try {
      const url = `${apiEndpoint}`;
      const body = JSON.stringify(action.data)
      console.log(`Body ${body}`);
      const response = yield fetch(url, {method: 'POST', body: body,headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }}).then(resp => resp.json(),);
      console.log(response);
      yield put({type: `${keywordAction}_ADD_SUCCESS`, data: response});
   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}

export function* updatedDonation(action) {
   try {
      const url = `${apiEndpoint}/${action.id}`;
      console.log('>>>GIFT_UPDATE_REQUESTED.action', JSON.stringify(action.data, null, 2))
      const body = JSON.stringify(action.data)
      const response = yield fetch(url, {method: 'POST', body: body, headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }}).then(resp => resp.json(),);
      yield put({type: `${keywordAction}_UPDATE_SUCCESS`, data: response});
   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}
