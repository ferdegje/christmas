import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchBeneficiaries(action) {
   try {
      const data = yield fetch("/api/beneficiary").then(response => response.json(), );
      yield put({type: "BENEFICIARY_LIST_SUCCESS", data: data});
   } catch (e) {
      yield put({type: "BENEFICIARY_LIST_ERROR", message: e.message});
   }
}

export function* deletedBeneficiary(action) {
   try {
      const url = `/api/beneficiary/${action.id}`;
      const response = yield fetch(url, {method: 'DELETE'});
      if (response.status == 200) {
          yield put({type: "BENEFICIARY_DELETE_SUCCESS", id: action.id});
      } else {
          yield put({type: "ERROR", message: `Received ${response.status} when contacting ${url}`});
      }

   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}

export function* addedBeneficiary(action) {
   try {
      const url = `/api/beneficiary`;
      const body = JSON.stringify(action.data)
      console.log(`Body ${body}`);
      const response = yield fetch(url, {method: 'POST', body: body,headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }}).then(resp => resp.json(),);
      console.log(response);
      yield put({type: "BENEFICIARY_ADD_SUCCESS", data: response});
   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}

export function* updatedBeneficiary(action) {
   try {
      const url = `/api/beneficiary/${action.id}`;
      const body = JSON.stringify(action.data)
      console.log(`Body ${body}`);
      const response = yield fetch(url, {method: 'POST', body: body,headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }}).then(resp => resp.json(),);
      yield put({type: "BENEFICIARY_UPDATE_SUCCESS", data: response});
   } catch (e) {
      yield put({type: "ERROR", message: e.message});
   }
}
