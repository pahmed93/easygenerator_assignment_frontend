import {
    SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_RESET,
    SIGNIN_FAIL
} from '../actions/signinAction';

const initialState = {
    apiState: "",
    message: "",
    data: "",
    error: "",
};

const signinReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN:
            return {
                ...state,
                apiState: "loading",
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.params?.message ?? 'success',
                data: action.params?.data ?? {},
            }
        case SIGNIN_FAIL:
            return {
                ...state,
                apiState: "error",
                error: action.params.errors,
                data: action.params?.message ?? 'error'
            }
        case SIGNIN_RESET:
            return initialState
        default:
            return state;
    }
}

export default signinReducer;