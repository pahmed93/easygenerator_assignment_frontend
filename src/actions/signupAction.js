import axios from 'axios';
import config from '../config';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const SIGNUP_RESET = 'SIGNUP_RESET';

export const signup = (params) => {
    return {
        type: SIGNUP,
        params,
    }
}

export const signupSuccess = (params) => {
    return {
        type: SIGNUP_SUCCESS,
        params,
    }
}
export const signupFail = (params) => {
    return {
        type: SIGNUP_FAIL,
        params,
    }
}
export const signupReset = (params) => {
    return {
        type: SIGNUP_RESET,
    }
}

export const signupApi = (data) => {
    return (dispatch) => {
        dispatch(signup());
        axios
        .post(`${config.api.base_url}/signup`, data)
        .then((response)=>{
            const signupData = response.data;
            dispatch(signupSuccess(signupData));
        })
        .catch((error)=>{
            const errorMsg = error.response.data;
            dispatch(signupFail(errorMsg));
        });
    }
}