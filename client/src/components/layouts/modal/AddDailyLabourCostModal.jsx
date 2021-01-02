import React, { useContext } from 'react'
import Modal from './Modal';

import { DispatchContext } from 'utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import CostAction from '../../../utils/actions/CostAction';

export default function AddDailyLabourCostModal(props) {
    //global state
    const { appDispatch, labourdailycostDispatch } = useContext(DispatchContext);

    //props
    const { input, setInput, initState } = props.value;

    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const isValidField = () => {
        if (input.labour_name === "" || input.labour_daily_salary === "" || input.paid_amount === "") {
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
            if (input.id === undefined) {
                //try to add new object
                CostAction.getInstance(labourdailycostDispatch).addData("v1/post/labour_daily_salary_table/", input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });

            } else {
                //try to update old object
                CostAction.getInstance(labourdailycostDispatch).updateData(`v1/put/labour_daily_salary_table/${input.id}`, input, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });
                AppAction.getInstance(appDispatch).STOP_LOADING();
                setInput(initState);
            }
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add Daily Labour Cost"
            btnTitle="Submit Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input type="text"
                                    className="form-control"
                                    name="labour_name"
                                    value={input.labour_name}
                                    onChange={onChange}
                                    placeholder="Labour Name" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="labour_daily_salary"
                                    value={input.labour_daily_salary}
                                    onChange={onChange}
                                    placeholder="Labour Daily Salary" />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="paid_amount"
                                    value={input.paid_amount}
                                    onChange={onChange}
                                    placeholder="Paid Amount" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}
