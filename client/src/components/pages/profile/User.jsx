import React, { useContext } from 'react'
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import AuthAction from './../../../utils/actions/AuthAction';

const User = () => {
   const { user } = useContext(StateContext);
   const { userDispatch } = useContext(DispatchContext);
   const logout = (e) => {
      e.preventDefault();
      AuthAction.getInstance(userDispatch).Logout();
   }


   return (
      <div className="container ">
         {/*<!-- Outer Row --> */}
         <div className="row">
            <div className=" col-md-12 text-center my-5">
               <div>
                  <p>user id: {user.id}</p>
                  <p>user_name: {user.user_name}</p>
                  <p>user_email: {user.user_email}</p>
                  <p>user_phone_num: {user.user_phone_num}</p>
                  <p>user_role: {user.user_role}</p>
                  <p>user_salary: {user.user_salary}</p>
                  <p className="overflow-auto">user access_token: {user.access_token.toString()}</p>

                  <p>user loggedin: {user.logged_in ? "true" : "false"}</p>
                  <button className="btn btn-danger" onClick={logout}>Logout Now</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default User;

