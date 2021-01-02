import React, { useContext } from 'react'
import Modal from './Modal';
import moment from 'moment';
import Define from './../../../utils/helpers/Define';
import { DispatchContext } from 'utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import CostAction from '../../../utils/actions/CostAction';



export default function AddCoalCostModal(props) {
    //global state
    const { appDispatch, coalDispatch } = useContext(DispatchContext);
    //props
    const { input, setInput, initState } = props.value;
    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            AppAction.getInstance(appDispatch).START_LOADING();
            if (input.id === undefined) {
                //add new info
                CostAction.getInstance(coalDispatch).addData("v1/post/coal_cost_table/", input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });
            } else {
                //update existing info
                CostAction.getInstance(coalDispatch).updateData(`v1/put/coal_cost_table/${input.id}`, input, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info updated Successfully `, "success"));
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
        if (input.total_amount === "" || input.paid_amount === "" || input.total_coal_weight === "" || input.coal_dealer_name === "" || input.transaction_date === "") {
            return false;
        } else {
            return true;
        }
    }

    //render return method
    return (
        <Modal
            id={props.id}
            title="Add Coal Cost"
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
                                <input type="number"
                                    className="form-control"
                                    name="total_amount"
                                    placeholder="Total Amount"
                                    value={input.total_amount}
                                    onChange={onChange}
                                />
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
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="total_coal_weight"
                                    value={input.total_coal_weight}
                                    onChange={onChange}
                                    placeholder="Total Coal Weight" />
                            </div>
                            <div className="form-group col-md-6">
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
                                <input type="text"
                                    className="form-control"
                                    name="coal_dealer_name"
                                    value={input.coal_dealer_name}
                                    onChange={onChange}
                                    placeholder="Coal Dealer Name" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}
