import { api } from "../../axiosConfigs";
import {
  SET_ITEMS,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
  GET_SEARCHDATA,
  SET_ERRORS,
  UPLOAD_ITEM,
  DELETE_FAVORITES,
  ADD_FAVORITES,
  GET_FAVORITES,
} from "../type";

//favorites
export const getFavorites = () => (dispatch) => {
  setAuthorizationHeader();
  api
    .get(`/favorites`)
    .then((res) =>
      dispatch({
        type: GET_FAVORITES,
        payload: res.data.items,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      }));
};

export const addFavorites = (itemId, handle) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader();

  api
    .post(`/favorites/${itemId}`)
    .then((res) =>
      dispatch({
        type: ADD_FAVORITES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({ type: STOP_LOADING_UI })
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    });
};

export const deleteFavorites = (itemId) => (dispatch, getState) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader();

  api
    .delete(`/favorites/${itemId}`)
    .then((res) => {
      dispatch({
        type: DELETE_FAVORITES,
        payload: itemId,
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => {
      dispatch({ type: STOP_LOADING_UI })
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    });
};
//items
export const getItems = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  api
    .get(`/items`)
    .then((res) => {
      dispatch({
        type: SET_ITEMS,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const searchRelated = (query) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  api
    .get(`/items/search/${query}`)
    .then((res) => {
      dispatch({
        type: GET_SEARCHDATA,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//upload item
export const uploadItem = (item) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  setAuthorizationHeader();
  api
    .post("/items", item)
    .then((res) => {
      dispatch({
        type: UPLOAD_ITEM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const setAuthorizationHeader = () => {
  const FBIdToken = localStorage.getItem("FBidToken");

  api.defaults.headers.common["Authorization"] = FBIdToken;
};
