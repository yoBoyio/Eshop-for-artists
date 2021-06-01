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
  DELETE_CART,
  ADD_CART,
  GET_CART,
  SORT_BY,
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
      })
    );
};

export const addFavorites = (itemId, handle) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader();

  api
    .post(`/favorites/${itemId}`)
    .then((res) => dispatch(getItem(itemId, ADD_FAVORITES)))
    .catch((err) => {
      dispatch({ type: STOP_LOADING_UI });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
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
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({ type: STOP_LOADING_UI });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//cart
export const getCart = () => (dispatch) => {
  // setAuthorizationHeader();
  api
    .get(`/cart`)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data.items,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addCart = (itemId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader();

  api
    .post(`/cart/${itemId}`)
    .then((res) => dispatch(getItem(itemId, ADD_CART)))
    .catch((err) => {
      dispatch({ type: STOP_LOADING_UI });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteCart = (itemId) => (dispatch, getState) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader();

  api
    .delete(`/cart/${itemId}`)
    .then((res) => {
      dispatch({
        type: DELETE_CART,
        payload: itemId,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({ type: STOP_LOADING_UI });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
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

export const downloadItems = (itemId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log('kap')
  setAuthorizationHeader();
  api
    .post(`/downloadItems`, { itemId: itemId })
    .then((res) => {
      console.log(res)
      // window.open(res.data, "_blank");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//sortbyItems
export const sortbyItems = (sortby) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader();
  api
    .post("/discover", { sortby: sortby })
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

export const getItem = (itemId, action) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  api
    .get(`/items/${itemId}`)
    .then((res) => {
      dispatch({
        type: action,
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

//download item
export const downloadItem = (id, title) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  api
    .get(`/items/download/${id}`)
    .then((res) => {
      window.open(res.data, "_blank");
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
  api.defaults.headers.common["Content-Type"] = "application/json";
};
