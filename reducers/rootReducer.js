import { combineReducers } from 'redux'

import beneficiaryReducer from './beneficiaryReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  beneficiary: beneficiaryReducer
})

export default rootReducer
