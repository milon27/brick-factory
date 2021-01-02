import React, { useState, useContext } from 'react'
import Modal from './Modal';

import { DispatchContext } from 'utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import CostAction from '../../../utils/actions/CostAction';

export default function LandLordListModal(props) {
    //global state
    const { appDispatch, landlordlistDispatch } = useContext(DispatchContext);
    //local state
    const initState = {
        land_lord_name: "",
        land_quantity: "",
        land_rent_per_year: ""
    };
    const [input, setInput] = useState(initState);
    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const isValidField = () => {
        if (input.land_lord_name === "" || input.land_quantity === "" || input.land_rent_per_year === "") {
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
            CostAction.getInstance(landlordlistDispatch).addData("v1/post/land_loard_list_table/", input)
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
            title="Add New Land Lord"
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
                                    name="land_lord_name"
                                    placeholder="Land Lord Name"
                                    value={input.land_lord_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="land_quantity"
                                    value={input.land_quantity}
                                    onChange={onChange}
                                    placeholder="Land Quantity" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="land_rent_per_year"
                                    value={input.land_rent_per_year}
                                    onChange={onChange}
                                    placeholder="Total Rent Per Year" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}
