import React, { useState, useContext } from 'react'
import Modal from './Modal';
import { DispatchContext } from 'utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import CostAction from '../../../utils/actions/CostAction';

export default function AddNewStaffModal(props) {
    //global state
    const { appDispatch, stafflistDispatch } = useContext(DispatchContext);
    //local state
    const initState = {
        staff_name: "",
        staff_salary: "",
        staff_position: "",
        staff_join_date: new Date(),
    };
    const [input, setInput] = useState(initState);
    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const isValidField = () => {
        if (input.staff_name === "" || input.staff_salary === "" || input.staff_position === "") {
            return false;
        } else {
            return true;
        }
    }
    const onSubmit = () => {
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            AppAction.getInstance(appDispatch).START_LOADING();
            CostAction.getInstance(stafflistDispatch).addData("v1/post/staff_list_table/", input)
                .then(res => {
                    AppAction.getInstance(appDispatch).STOP_LOADING();
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
                    setInput(initState);
                }).catch(e => {
                    AppAction.getInstance(appDispatch).STOP_LOADING();
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                })
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add New Staff"
            btnTitle="Submit Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="text"
                                    className="form-control"
                                    name="staff_name"
                                    placeholder="Staff Name"
                                    value={input.staff_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="staff_salary"
                                    value={input.staff_salary}
                                    onChange={onChange}
                                    placeholder="Staff Salary" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {/* <label htmlFor=""></label> */}
                                <input type="text"
                                    className="form-control"
                                    name="staff_position"
                                    value={input.staff_position}
                                    onChange={onChange}
                                    placeholder="Staff Position" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}
