import {
  LOADING_DATA,
  SET_ITEMS,
  GET_SEARCHDATA,
  SET_TRACK,
  SET_TRACKS,
  UPLOAD_ITEM,
  DELETE_FAVORITES,
  ADD_FAVORITES,
  GET_FAVORITES,
} from '../type';

const initialState = {
  items: [],
  search: [],
  track: [],
  tracks: [],
  favorites: [],
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
    // FAVORITES
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        loading: false,
      };
    case DELETE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id !== action.payload
        ),
        loading: false,
      };
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
        loading: false,
      };
    default:
      return state;
  }
}