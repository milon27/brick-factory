import React, { useContext } from 'react'
import Modal from './Modal';
import moment from 'moment'
import AppAction from './../../../utils/actions/AppAction';
import { DispatchContext } from 'utils/context/AppContext';
import CostAction from 'utils/actions/CostAction';
import Response from './../../../utils/helpers/Response';
import Define from 'utils/helpers/Define';

export default function AddSoilCostModal(props) {
    //global state
    const { appDispatch, soilDispatch } = useContext(DispatchContext);
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
            //add extra fields
            input.total_amount = input.soil_car_quantity * input.soil_per_car_price;
            if (input.id === undefined) {
                //add new info
                CostAction.getInstance(soilDispatch).addData("v1/post/soil_cost_table/", input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    })
            } else {
                //update existing info
                CostAction.getInstance(soilDispatch).updateData(`v1/put/soil_cost_table/${input.id}`, input, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
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
        if (input.soil_car_quantity === "" || input.soil_per_car_price === "" || input.paid_amount === "" || input.contractor_name === "" || input.transaction_date === "") {
            return false;
        } else {
            return true;
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add Soil Cost"
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
                                    name="soil_car_quantity"
                                    placeholder="Soil Car Quantity"
                                    value={input.soil_car_quantity}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="soil_per_car_price"
                                    value={input.soil_per_car_price}
                                    onChange={onChange}
                                    placeholder="Soil Per Car Price" />
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
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {/* <label htmlFor=""></label> */}
                                <input type="text"
                                    className="form-control"
                                    name="contractor_name"
                                    value={input.contractor_name}
                                    onChange={onChange}
                                    placeholder="Soil Contractor Name" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}
