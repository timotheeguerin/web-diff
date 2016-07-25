import { combineReducers } from 'redux';
import * as types from 'types';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_TOPICS_REQUEST:
      return true;
    case types.GET_TOPICS_SUCCESS:
    case types.GET_TOPICS_FAILURE:
      return false;
    default:
      return state;
  }
};

const account = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.Create_Account_Request:
      return {
        id: action.id,
        name: action.text
      };
    default:
      return state;
  }
};

const accounts = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.Get_Account_Sucess:
      return action.res.data;
    case types.Create_Account_Request:
      return [...state, account(undefined, action)];
    case types.Create_Account_Failure:
      return state.filter(t => t.id !== action.id);
    case types.Destroy_Account:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const newAccount = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newAccount;
    case types.Create_Account_Request:
      return '';
    default:
      return state;
  }
};

const accountReducer = combineReducers({
  accounts,
  isFetching,
  newAccount
});

export default accountReducer;
