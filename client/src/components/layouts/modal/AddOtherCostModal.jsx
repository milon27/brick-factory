import React, { useContext } from 'react'
import Modal from './Modal';
import AppAction from 'utils/actions/AppAction';
import { DispatchContext } from 'utils/context/AppContext';
import Response from './../../../utils/helpers/Response';
import CostAction from 'utils/actions/CostAction';
import moment from 'moment';
import Define from 'utils/helpers/Define';

export default function AddOtherCostModal(props) {

    //global state
    const { appDispatch, otherCostDispatch } = useContext(DispatchContext);
    //props
    const { input, setInput, initState } = props.value;

    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const onSubmit = () => {
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            AppAction.getInstance(appDispatch).START_LOADING();
            if (input.id === undefined) {
                //add new info
                CostAction.getInstance(otherCostDispatch).addData("v1/post/daily_other_cost_table/", input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Daily Other Cost info added Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    })
            } else {
                //update existing info
                CostAction.getInstance(otherCostDispatch).updateData(`v1/put/daily_other_cost_table/${input.id}`, input, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Daily Other Cost info updated Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
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
    const isValidField = () => {
        if (input.other_cost_title === "" || input.total_amount === "" || input.other_cost_details === "" || input.transaction_date === "") {
            return false;
        } else {
            return true;
        }
    }


    return (
        <Modal id={props.id}
            title="Add Other Cost"
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
                                    name="other_cost_title"
                                    value={input.other_cost_title}
                                    onChange={onChange}
                                    placeholder="Other Cost Title" />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="total_amount"
                                    value={input.total_amount}
                                    onChange={onChange}
                                    placeholder="Total Amount" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {/* <label htmlFor=""></label> */}
                                <input type="date"
                                    className="form-control"
                                    name="transaction_date"
                                    value={moment(input.transaction_date).format(Define.DATE_FORMAT_SIMPLE)}
                                    onChange={onChange}
                                    placeholder="(e.g. 2020-02-26)" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {/* <label htmlFor=""></label> */}
                                <textarea className="form-control" rows="3"
                                    name="other_cost_details"
                                    value={input.other_cost_details}
                                    onChange={onChange}
                                    placeholder="(e.g. add extra cost details)"
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
