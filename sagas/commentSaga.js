import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

const apiEndpoint = "/api/comment";
const keywordAction = "COMMENT";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchCOMMENT(action) {
  let query = `gift=${action.gift}`;
   try {
      const data = yield fetch(`${apiEndpoint}?${query}`).then(response => response.json(), );
      yield put({type: `${keywordAction}_LIST_SUCCESS`, data: data});
   } catch (e) {
      yield put({type: `${keywordAction}_LIST_ERROR`, message: e.message});
   }
}

export function* deletedCOMMENT(action) {
   console.log(">>>COMMENT_DELETE_REQUESTED.action", JSON.stringify(action, null, 2));
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

export function* addedCOMMENT(action) {
  console.log("Tagreb");
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

export function* updatedCOMMENT(action) {
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

export function* fetchDetailsGift(action) {
  // console.log(">>>GIFT_DETAIL_REQUESTED.action", JSON.stringify(action, null, 2));
   try {
      const data = yield fetch(`${apiEndpoint}/${action.id}`).then(response => response.json(), );
      yield put({type: `${keywordAction}_DETAIL_SUCCESS`, data: data});
   } catch (e) {
      yield put({type: `${keywordAction}_DETAIL_ERROR`, message: e.message});
   }
}

export function* getDetailsGift(action) {
  let query = `url=${action.data.url}`;
   try {
      const data = yield fetch(`/api/parser?${query}`).then(response => response.json(), );
      console.log(data);
      yield put({type: `GIFT_URLDETAILS_SUCCESS`, data: data});
   } catch (e) {
      yield put({type: `GIFT_URLDETAILS_ERROR`, message: e.message});
   }
}
