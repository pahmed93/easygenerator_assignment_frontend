import { useCookies } from 'react-cookie';

export const useCustomCookies = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const getUserToken = () => {
        return cookies.token;
    };
    
    const getUsername = () => {
        return toTitleCase(cookies.username);
    }
    
    const isLogin = () => {
        let userToken = cookies.token;
        if(userToken) return true;
    
        return false;
    }
    
    const toTitleCase = (str) => {
        if(str)
        {
            str = str.replace(/_/g," ");
            return str.replace(/\w\S*/g, (txt)=>{
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })   
        }
    }

    const resetCookies = () => {
        console.log("calledd")
        removeCookie('token', { path: '/' });
        removeCookie('username', { path: '/' });
    };

    const setTokenAndUsername = (token, username) => {
        setCookie('token', token, { path: '/' });
        setCookie('username', username, { path: '/' });
    };

    return {
        getUserToken,
        getUsername,
        isLogin,
        resetCookies,
        setTokenAndUsername
    }
}

