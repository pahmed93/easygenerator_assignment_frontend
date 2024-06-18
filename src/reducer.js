import { combineReducers } from 'redux';

import signinReducer from './reducers/signinReducer';
import signupReducer from './reducers/signupReducer';

const rootReducer = combineReducers({
    signin: signinReducer,
    signup: signupReducer,
});

export default rootReducer;