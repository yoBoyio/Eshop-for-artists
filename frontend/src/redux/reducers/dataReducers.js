import {
  LOADING_DATA,
  SET_HISTORY,
  GET_SEARCHDATA
} from '../type';

const initialState = {
  history: [],
  search: [],
  loading: false
};

export default function (state = initialState, action) {
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
    case GET_SEARCHDATA:
      return {
        ...state,
        search: action.payload,
        loading: false
      };
    default:
      return state;
  }
}