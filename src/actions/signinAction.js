import axios from 'axios';
import config from '../config';

export const SIGNIN = 'SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';
export const SIGNIN_RESET = 'SIGNIN_RESET';

export const signin = (params) => {
    return {
        type: SIGNIN,
        params,
    }
}

export const signinSuccess = (params) => {
    return {
        type: SIGNIN_SUCCESS,
        params,
    }
}
export const signinFail = (params) => {
    return {
        type: SIGNIN_FAIL,
        params,
    }
}
export const signinReset = (params) => {
    return {
        type: SIGNIN_RESET,
    }
}

export const signinApi = (data) => {
    return (dispatch) => {
        dispatch(signin());
        axios
        .post(`${config.api.base_url}/signin`, data)
        .then((response)=>{
            const signinData = response.data;
            dispatch(signinSuccess(signinData));
        })
        .catch((error)=>{
            const errorMsg = error.response.data;
            dispatch(signinFail(errorMsg));
        });
    }
}