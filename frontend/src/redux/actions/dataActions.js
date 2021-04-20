import { api } from '../../axiosConfigs';
import {
  SET_HISTORY,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
  GET_SEARCHDATA
} from '../type';

export const getHistory = (handle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  api
    .get(`/history/${handle}`)
    .then((res) => {
      dispatch({
        type: SET_HISTORY,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_HISTORY,
        payload: []
      });
    });
};

export const searchRelated = (query) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  api
    .get(`/search/${query}`)
    .then((res) => {
      dispatch({
        type: GET_SEARCHDATA,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_HISTORY,
        payload: []
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};