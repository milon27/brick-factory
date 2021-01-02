import Types from '../actions/Types';
import Define from '../helpers/Define';

export const user_init_state = localStorage.getItem(Define.USERINFO_LOCAL) === null ?
    {} :
    JSON.parse(localStorage.getItem(Define.USERINFO_LOCAL));

const AuthReducer = (state, action) => {
    if (action.type === Types.LOGIN) {
        return {
            ...state,//empty initally
            ...action.payload
        };
        //return action.payload;//return the user object(which store in local storage)
    } else if (action.type === Types.LOGOUT) {
        return {};
    } else {
        return state;
    }
}
export default AuthReducer;