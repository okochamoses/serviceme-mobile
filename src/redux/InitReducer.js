import { combineReducers } from 'redux';

const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: true
};

const InitReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return {...state, isLoading: !state.isLoading}
    default:
      return state;
  }
};

export default combineReducers({
  init: InitReducer,
});