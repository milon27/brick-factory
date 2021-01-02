import axios from 'axios';
import Types from './Types';
import Define from 'utils/helpers/Define';
/**
 * it is an object,not function
 */

const AuthAction = {
    Dispatch: null,
    getInstance: (userDispatch) => {
        AuthAction.Dispatch = userDispatch;
        return AuthAction;
    },
    Login: async (tmpUser) => {
        return new Promise((resolve, reject) => {
            //fetch user from server
            axios.post(`user/post/login`, tmpUser).then(res => {
                if (res.status === 200) {
                    const user = res.data.response;
                    const message = res.data.message;
                    //user loggedin offline
                    localStorage.setItem(Define.USERINFO_LOCAL, JSON.stringify(user));
                    //change global state
                    AuthAction.Dispatch({
                        type: Types.LOGIN,
                        payload: user
                    });
                    //resolve the  promise
                    resolve({ message, user });
                } else {
                    reject({ message: res.data.message });
                }
            }).catch(e => {
                reject(e);
            });
        });
    },
    Logout: () => {
        //local storage change
        localStorage.removeItem(Define.USERINFO_LOCAL);
        //change global state
        AuthAction.Dispatch({ type: Types.LOGOUT });
    }
}


export default AuthAction;
