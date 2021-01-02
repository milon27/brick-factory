import Alert from 'components/layouts/alert/Alert';
import React, { useState, useContext } from 'react'
import Loading from 'components/layouts/alert/Loading';
import axios from 'axios';
import { DispatchContext } from './../../../utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from 'utils/helpers/Response';

export default function DbSetup() {
    const [user, setUser] = useState({
        user_name: "",
        user_email: "",
        user_phone_num: "",
        user_password: "",
        user_role: "ADMIN",
        user_salary: 5000
    });

    const { appDispatch } = useContext(DispatchContext);


    const createuser = () => {

        axios.post('user/post/', user).then((res) => {
            if (res.status === 200) {
                //dispatch the global state
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, "User Created", "All Done !!!!!!!!", "success"));
                AppAction.getInstance(appDispatch).STOP_LOADING();
            } else {
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "User Creation Failed", "", "danger"));
                AppAction.getInstance(appDispatch).STOP_LOADING();
            }
        }).catch((e) => {
            console.error("erroe: ", e)
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "", "danger"));
            AppAction.getInstance(appDispatch).STOP_LOADING();
        })
    }
    const startConfig = () => {
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            startConfig1();
        }
    }

    const startConfig1 = () => {
        //api list
        //const db = axios.get('db/createdb');

        const user = axios.get('db/table/user_table');
        const season = axios.get('db/table/seasons_table');
        const tax = axios.get('db/table/tax_cost_table');
        const coal = axios.get('db/table/coal_cost_table');
        const soil = axios.get('db/table/soil_cost_table');
        const other_cost = axios.get('db/table/daily_other_cost_table');
        const land_load_list = axios.get('db/table/land_loard_list_table');
        const land_load_cost = axios.get('db/table/land_loard_cost_table');
        const staff_list = axios.get('db/table/staff_list_table');
        const staff_salary = axios.get('db/table/staff_salary_table');
        const labour_salary = axios.get('db/table/labour_daily_salary_table');
        const shorder_info = axios.get('db/table/shorder_info_table');
        const brick_built_cost = axios.get('db/table/brick_built_cost_table');

        //check database is created already or not
        AppAction.getInstance(appDispatch).START_LOADING();
        Promise.all([
            user,
            season, tax,
            coal, soil, other_cost,
            land_load_list, land_load_cost,
            staff_list, staff_salary,
            labour_salary, shorder_info, brick_built_cost
        ]).then(function (data) {

            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, "Done Setup", "Creating Admin For the system..", "info"));
            //
            createuser();
        }).catch(e => {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
        });

        //     // .then(
        //     // axios.spread((...data) => {

        //     // })
        // )
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const isValidField = () => {
        let ck = true;
        for (const [key, value] of Object.entries(user)) {
            //console.log("error: ", `${key}: ${value}`);
            if (value === "") {
                ck = false;
                break;
            } else {
                ck = true;
            }
        }
        return ck;
    }

    return (
        <div className="bg-dark vh-100" >
            <div className="container ">
                {/* user form before config... */}
                {/* <!-- Outer Row --> */}
                <div className="row pt-3 ">
                    <div className="m-auto">
                        <Alert />
                        <Loading color="danger" />
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="m-auto">
                        <div className="form-row ">
                            <div className="form-group col-md-12">

                                <label htmlFor="">Admin User Email</label>
                                <input type="email"
                                    className="form-control"
                                    name="user_email"
                                    placeholder="Admin User Email"
                                    value={user.user_email || ''}
                                    onChange={onChange}
                                />
                                <br></br>
                                <label htmlFor="">Admin User Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="user_name"
                                    placeholder="Admin User Name"
                                    value={user.user_name || ''}
                                    onChange={onChange}
                                />

                                <br></br>
                                <label htmlFor="">Admin User Phone</label>
                                <input type="phone"
                                    className="form-control"
                                    name="user_phone_num"
                                    placeholder="Admin User Phone"
                                    value={user.user_phone_num || ''}
                                    onChange={onChange}
                                />
                                <br></br>
                                <label htmlFor="">Admin User Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="user_password"
                                    placeholder="Admin User Password"
                                    value={user.user_password || ''}
                                    onChange={onChange}
                                />

                            </div>
                        </div>
                        <button className="m-auto btn btn-outline-light mt-5" onClick={startConfig}>Start Config</button>
                    </div>

                </div>


            </div>
        </div>
    )
}
