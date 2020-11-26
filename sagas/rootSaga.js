// index.js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { fetchBeneficiaries, deletedBeneficiary, addedBeneficiary, updatedBeneficiary } from './beneficiarySaga';
import { fetchGifts, deletedGift, addedGift, updatedGift, getDetailsGift, fetchDetailsGift } from './giftSaga';
import { fetchCOMMENT, deletedCOMMENT, addedCOMMENT, updatedCOMMENT } from './commentSaga';
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
  yield takeEvery("GIFT_URLDETAILS_REQUESTED", getDetailsGift);
  yield takeEvery("GIFT_DETAIL_REQUESTED", fetchDetailsGift);
  yield takeEvery("COMMENT_LIST_REQUESTED", fetchCOMMENT);
  yield takeEvery("COMMENT_DELETE_REQUESTED", deletedCOMMENT);
  yield takeEvery("COMMENT_ADD_REQUESTED", addedCOMMENT);
  yield takeEvery("COMMENT_UPDATE_REQUESTED", updatedCOMMENT);
}
