import React, { useContext } from 'react'
import Modal from './Modal';
import Define from './../../../utils/helpers/Define';
import moment from 'moment'
import AppAction from 'utils/actions/AppAction';
import { DispatchContext } from 'utils/context/AppContext';
import Response from './../../../utils/helpers/Response';
import CostAction from 'utils/actions/CostAction';

export default function AddTaxCostModal(props) {
    //global state
    const { appDispatch, taxDispatch } = useContext(DispatchContext);
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
                CostAction.getInstance(taxDispatch).addData("v1/post/tax_cost_table/", input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Tax Cost info added Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    })
            } else {
                //update existing info
                CostAction.getInstance(taxDispatch).updateData(`v1/put/tax_cost_table/${input.id}`, input, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Tax Cost info updated Successfully `, "success"));
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
        if (input.tax_title === "" || input.total_amount === "" || input.paid_amount === "" || input.transaction_date === "") {
            return false;
        } else {
            return true;
        }
    }

    return (
        <Modal id={props.id}
            title="Add Tax Cost"
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
                                    name="tax_title"
                                    value={input.tax_title}
                                    onChange={onChange}
                                    placeholder="Tax Title" />
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
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="paid_amount"
                                    value={input.paid_amount}
                                    onChange={onChange}
                                    placeholder="Paid Amount" />
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
                    </form>
                </div>
            </div>
        </Modal>
    )
}
