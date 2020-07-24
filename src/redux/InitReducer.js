import {combineReducers} from 'redux';

const INITIAL_STATE = {
  isAuthenticated: 'auth',
  isLoading: false,
  isError: false,
};

const InitReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {...state, isLoading: !state.isLoading};
    case 'TOGGLE_ERROR':
      return {...state, isError: !state.isError};
    case 'NAVIGATE_TO_AUTH':
      return {...state, isAuthenticated: 'auth'};
    case 'NAVIGATE_TO_USER':
      return {...state, isAuthenticated: 'user'};
    case 'NAVIGATE_TO_PROVIDER':
      return {...state, isAuthenticated: 'provider'};
    default:
      return state;
  }
};

export default combineReducers({
  init: InitReducer,
});
