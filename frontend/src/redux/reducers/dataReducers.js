import {
    LOADING_DATA,
    SET_HISTORY,
  } from '../type';

const initialState = {
    history: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_HISTORY:
        return {
          ...state,
          history: action.payload,
          loading: false
        }; 
      default:
        return state;
  }
}