import React, { useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import AuthAction from 'utils/actions/AuthAction';
import AppAction from 'utils/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';


const Login = () => {
  //local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function goToDbSetup() {
    history.push("/db-setup");
  }
  //use context
  const { user } = useContext(StateContext);
  const { appDispatch, userDispatch } = useContext(DispatchContext);

  //local method
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    AppAction.getInstance(appDispatch).START_LOADING();
    let em = email.toLocaleLowerCase().trim();
    let pass = password.trim();
    let validation_res = validation(em, pass);
    if (validation_res.success) {//user info is valid , call login action
      const tmpUser = {
        email: em,
        password: password
      }
      AuthAction.getInstance(userDispatch).Login(tmpUser)
        .then((res) => {
          AppAction.getInstance(appDispatch).STOP_LOADING();
        })
        .catch(e => {
          AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
          AppAction.getInstance(appDispatch).STOP_LOADING();
        });
    } else {
      AppAction.getInstance(appDispatch).SET_RESPONSE(validation_res);
      AppAction.getInstance(appDispatch).STOP_LOADING();
    }
  }

  //return 
  if (user !== null && user.logged_in === true) {
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="bg-gradient-primary vh-100" >
        <div className="container ">
          {/* <!-- Outer Row --> */}
          <div className="row">
            <div className="col-md-11">
              <h1 className="text-light text-center mt-5">Welcome to Brick Factory System</h1>
              <Alert />
              <Loading color="light" />
            </div>
            <div className="col-md-1">
              <button className="btn btn-outline-light mt-5" onClick={goToDbSetup}>Config</button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* <!-- Nested Row within Card Body --> */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user" onSubmit={onSubmit} method="POST">
                          <div className="form-group">
                            <input type="email" className="form-control form-control-user"
                              name="email" onChange={onChangeEmail} value={email}
                              placeholder="Enter Email Address..." />
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control form-control-user"
                              name="password" onChange={onChangePassword} value={password}
                              placeholder="Password" />
                          </div>
                          {/* <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input type="checkbox" className="custom-control-input" id="customCheck" />
                              <label className="custom-control-label" htmlFor="customCheck">Remember
                                                    Me</label>
                            </div>
                          </div> */}

                          <div className="form-group">
                            <div className="small">
                              <p >Demo Email: admin@g.com</p>
                              <p>Demo Password: 1234567</p>
                            </div>
                          </div>

                          <input type="submit" value="Login Now" className="btn btn-primary btn-user btn-block" />
                          {/* <hr /> */}
                          {/* <div className="text-center">
                                          <a className="small" href="forgot-password.html">Forgot Password?</a>
                                       </div>
                                       <div className="text-center">
                                          <a className="small" href="register.html">Create an Account!</a>
                                       </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* row end here */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end outer row --> */}
        </div>
      </div>
    </>
  );
};

export default Login;
//extra method
const validation = (email, password) => {
  if (email !== null && email !== "" && password !== null && password !== "") {
    return Response(true, "all field are correctly filled", "all field are correctly filled,please wait for authentication.", "info");
  } else {
    return Response(false, "Enter All the Fields", "may be you missed some fileds to fill", "danger");
  }
}
