import {
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_RESET,
    SIGNUP_FAIL
} from '../actions/signupAction';

const initialState = {
    apiState: "",
    message: "",
    data: "",
    error: "",
};

const signupReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNUP:
            return {
                ...state,
                apiState: "loading",
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.params?.message ?? 'success',
                data: action.params?.data ?? {},
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                apiState: "error",
                error: action.params.errors,
                data: action.params?.message ?? 'error'
            }
        case SIGNUP_RESET:
            return initialState
        default:
            return state;
    }
}

export default signupReducer;