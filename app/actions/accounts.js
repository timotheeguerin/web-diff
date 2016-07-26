import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';


/**
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param method Object Data you wish to pass to the server
 * @param id String HTTP method, e.g. post, get, put, delete
 * @param data String endpoint
 * @param api
 * @return Promise
 */
export function makeAccountRequest(method, id = null, data = null, api = '/api/accounts') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function destroy(id) {
  return {type: types.DESTROY_ACCOUNT, id};
}

/*
 * @param data
 * @return a simple JS object
 */
export function createAccountRequest(data) {
  return {
    type: types.CREATE_ACCOUNT_REQUEST,
    id: data.id,
    name: data.name
  };
}

export function createAccountSuccess() {
  return {
    type: types.CREATE_ACCOUNT_SUCCESS
  };
}

export function createAccountFailure(data) {
  return {
    type: types.CREATE_ACCOUNT_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createAccountDuplicate() {
  return {
    type: types.CREATE_ACCOUNT_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createAccount({name}) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (name.trim().length <= 0) return;

    const id = md5.hash(name);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters

    const {account} = getState();

    const data = {
      count: 1,
      id,
      name
    };

    // Conditional dispatch
    // If the account already exists, make sure we emit a dispatch event
    if (account.accounts.filter(accountItem => accountItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate account
      return dispatch(createAccountDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createAccountRequest(data));

    return makeAccountRequest('post', id, data).then(res => {
      if (res.status === 200) {
        // We can actually dispatch a CREATE_ACCOUNT_SUCCESS
        // on success, but I've opted to leave that out
        // since we already did an optimistic update
        // We could return res.json();
        return dispatch(createAccountSuccess());
      }
    }).catch(() => {
      return dispatch(createAccountFailure({
        id,
        error: 'Oops! Something went wrong and we couldn\'t create your account'
      }));
    });
  };
}

// Fetch posts logic
export function fetchAccounts() {
  console.log("Fetching accounts...");
  return {
    type: types.GET_ACCOUNTS,
    promise: makeAccountRequest('get')
  };
}

export function destroyAccount(id) {
  return dispatch => {
    return makeAccountRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createAccountFailure({
        id,
        error: 'Oops! Something went wrong and we couldn\'t delete this account'
      })));
  };
}