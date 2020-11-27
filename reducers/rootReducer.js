import { combineReducers } from 'redux'

import beneficiaryReducer from './beneficiaryReducer';
import userReducer from './userReducer';
import giftReducer from './giftReducer';
import commentReducer from './commentReducer';
import donationReducer from './donationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  beneficiary: beneficiaryReducer,
  gift: giftReducer,
  comments: commentReducer,
  donation: donationReducer,
})

export default rootReducer
