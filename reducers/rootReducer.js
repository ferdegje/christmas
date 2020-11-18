import { combineReducers } from 'redux'

import beneficiaryReducer from './beneficiaryReducer';
import userReducer from './userReducer';
import giftReducer from './giftReducer';

const rootReducer = combineReducers({
  user: userReducer,
  beneficiary: beneficiaryReducer,
  gift: giftReducer,
})

export default rootReducer
