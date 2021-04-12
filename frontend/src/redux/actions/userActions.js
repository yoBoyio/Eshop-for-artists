import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../type';
import {api} from '../../axiosConfigs';
import axios from 'axios';

  
export const loginUser = (userData, history) => (dispatch) =>{
    dispatch({type: LOADING_UI });
      api
        .post('/login',userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type:SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const signupUser = (newUserData, history) => (dispatch) =>{
    dispatch({type: LOADING_UI });

    api
        .post('/signup',newUserData)
        .then(res => {    
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err => {
            
            dispatch({
                type:SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBidToken');
    delete api.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
};

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    api.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch( (err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) =>{
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData).then(() =>{
        dispatch(getUserData());
    }).catch(err => console.log(err));
}


const setAuthorizationHeader = (token)=>{
            const FBIdToken = `Bearer ${token}`;
            localStorage.setItem('FBidToken',FBIdToken );
            api.defaults.headers.common['Authorization'] = FBIdToken;
};