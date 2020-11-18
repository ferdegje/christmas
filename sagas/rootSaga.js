// index.js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { fetchBeneficiaries, deletedBeneficiary, addedBeneficiary, updatedBeneficiary } from './beneficiarySaga';
import { fetchGifts, deletedGift, addedGift, updatedGift } from './giftSaga';
import { updatedUser } from './userSaga';
// import { userSaga } from './userSaga';

export default function* rootSaga() {
  yield takeEvery("BENEFICIARY_LIST_REQUESTED", fetchBeneficiaries);
  yield takeEvery("BENEFICIARY_DELETE_REQUESTED", deletedBeneficiary);
  yield takeEvery("BENEFICIARY_ADD_REQUESTED", addedBeneficiary);
  yield takeEvery("BENEFICIARY_UPDATE_REQUESTED", updatedBeneficiary);
  yield takeEvery("USER_UPDATE_REQUESTED", updatedUser);
  yield takeEvery("GIFT_LIST_REQUESTED", fetchGifts);
  yield takeEvery("GIFT_DELETE_REQUESTED", deletedGift);
  yield takeEvery("GIFT_ADD_REQUESTED", addedGift);
  yield takeEvery("GIFT_UPDATE_REQUESTED", updatedGift);
}
