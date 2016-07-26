import { combineReducers } from 'redux';
import * as types from 'types';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_ACCOUNTS_REQUEST:
      return true;
    case types.GET_ACCOUNTS_SUCCESS:
    case types.GET_ACCOUNTS_FAILURE:
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
    case types.CREATE_ACCOUNT_REQUEST:
      return {
        id: action.id,
        name: action.name
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
    case types.GET_ACCOUNTS_SUCCESS:
      return action.res.data;
    case types.CREATE_ACCOUNT_REQUEST:
      return [...state, account(undefined, action)];
    case types.GET_ACCOUNTS_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_ACCOUNT:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const newAccount = (
  state = {name: ''},
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newAccount;
    case types.CREATE_ACCOUNT_REQUEST:
      return {name: ''};
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
