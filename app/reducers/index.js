import { combineReducers } from 'redux';
import account from 'reducers/account';
import user from 'reducers/user';
import topic from 'reducers/topic';
import message from 'reducers/message';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  account,
  user,
  topic,
  message,
  routing,
  form: formReducer
});

export default rootReducer;
