import {
  LOADING_DATA,
  SET_ITEMS,
  GET_SEARCHDATA,
  SET_TRACK,
  SET_TRACKS,
  UPLOAD_ITEM
} from '../type';

const initialState = {
  items: [],
  search: [],
  track: [],
  tracks: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_SEARCHDATA:
      return {
        ...state,
        search: action.payload,
        loading: false
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false
      };
    case SET_TRACK:
      return {
        ...state,
        track: action.payload
      };
    case UPLOAD_ITEM:
      return {
        ...state,
        tracks: [action.payload, ...state.tracks]
      };
    default:
      return state;
  }
}