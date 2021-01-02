import React, { useContext, useEffect } from 'react'
import moment from 'moment';
import Modal from './Modal';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import CostAction from '../../../utils/actions/CostAction';


export default function LandLordCostModal(props) {
    //global state
    const { appDispatch, landlordcostDispatch } = useContext(DispatchContext);
    const { landlordlist, landlordcost } = useContext(StateContext);

    //props
    const { input, setInput, initState } = props.value;

    //lifecycle method
    useEffect(() => {
        if (input.id === undefined) {
            //console.log("not disabled");
            document.getElementById("selectNameID").disabled = false;
        } else {
            console.log("disabled");
            document.getElementById("selectNameID").disabled = true;
        }
    }, [input.id]);

    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const isValidField = () => {
        if (input.land_lord_id === "" || input.paid_amount === "") {
            return false;
        } else {
            return true;
        }
    }

    const alredyAdded = () => {
        let arr = landlordcost.filter(item => {
            let time = moment(item.transaction_date).isSame(input.transaction_date, 'year');  // true
            return (item.land_lord_id == input.land_lord_id) && (time);
        });
        if (arr.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const onSubmit = () => {
        alredyAdded();
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            AppAction.getInstance(appDispatch).START_LOADING();
            if (input.id === undefined) {
                //try to add new object
                if (alredyAdded()) {
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Already Added this information.", "try to edit existing information", "danger"));
                    AppAction.getInstance(appDispatch).STOP_LOADING();
                } else {
                    CostAction.getInstance(landlordcostDispatch).addData("v1/post/land_loard_cost_table/", input)
                        .then(res => {
                            AppAction.getInstance(appDispatch).STOP_LOADING();
                            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Cost info added Successfully `, "success"));
                            setInput(initState);
                        }).catch(e => {
                            AppAction.getInstance(appDispatch).STOP_LOADING();
                            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                        });
                }

            } else {
                const newinput = {};
                newinput.id = input.id;
                newinput.paid_amount = parseFloat(input.paid_amount);
                newinput.land_lord_id = input.land_lord_id;
                //try to update old object
                CostAction.getInstance(landlordcostDispatch).updateData(`v1/put/land_loard_cost_table/${input.id}`, newinput, input)
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
            title="Add Land Lord Cost"
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
                                <select id="selectNameID" className="form-control" value={input.land_lord_id} name="land_lord_id" onChange={onChange} >
                                    <option value="">select name</option>
                                    {landlordlist.map(item => {
                                        return <option key={item.id} value={item.id}>{item.land_lord_name}</option>
                                    })}
                                </select>
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
