import React, { useContext, useState, useEffect } from 'react'
import Modal from './Modal';
import Define from './../../../utils/helpers/Define';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from './../../../utils/actions/CostAction';
import AppAction from './../../../utils/actions/AppAction';
import Response from 'utils/helpers/Response';
import Utils from 'utils/helpers/Utils';


export default function AddBrickBuiltCostModal(props) {
    const types = [Define.MIL_TYPE, Define.KACHA_TYPE, Define.PAKA_TYPE, Define.JAB_TYPE];
    //props
    const { input, setInput, initState } = props.value;
    //global
    const { sharderList } = useContext(StateContext);
    const { sharderListDispatch, brickbuiltcostDispatch, appDispatch } = useContext(DispatchContext);
    //local state
    const [newSharderList, setNewSharderList] = useState([]);

    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const isValidField = () => {
        if (input.cost_type === "" || input.shorder_id === ""
            || input.weekly_bill === "" || input.weekly_brick_quantity === ""
            || input.weekly_cash_bill_paid === "" || input.weekly_early_bill_paid === ""
        ) {
            return false;
        } else {
            return true;
        }
    }
    const onSubmit = () => {
        const table_name = 'brick_built_cost_table';
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            if (input.id === null) {
                //add new item
                AppAction.getInstance(appDispatch).START_LOADING();
                CostAction.getInstance(brickbuiltcostDispatch).addData(`v1/post/${table_name}/`, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `BB Cost added Successfully `, "success"));
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });
            } else {
                //update existing info
                //remove the extra filed (cleared_early_amount)
                var newinput = { ...input }
                delete newinput.shorder_name;
                delete newinput.shorder_type;
                delete newinput.early_paid_amount;
                //url,udate_input,payload
                CostAction.getInstance(brickbuiltcostDispatch).updateData(`v1/put/${table_name}/${input.id}`, newinput, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `BB cost info updated Successfully `, "success"));
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
    //lifecycle method
    useEffect(() => {
        const season_id = Utils.getCurrentSeason().id;
        const source = CostAction.getSource();
        CostAction.getInstance(sharderListDispatch)
            .getAllData("shorder_info_table", season_id)
            .then(res => {
                //console.log("shorder list==", res.message, res.data);
            })
            .catch(e => {
                console.log(e.message);
            });

        //clean up method
        return () => {
            console.log("clean up called shorder list in add BB cost");
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [sharderList.length]);


    useEffect(() => {
        setNewSharderList(sharderList.filter(item => item.shorder_type === input.cost_type))
    }, [input.cost_type]);


    return (
        <Modal
            id={props.id}
            title="Add Brick Built Cost Info"
            btnTitle="Submit Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor="">Select Shorder Type</label> */}
                                <select id="selectTypeID" className="form-control" value={input.cost_type} name="cost_type" onChange={onChange} >
                                    <option value="">Select cost type</option>
                                    {types.map(item => {
                                        return <option key={item} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor="">Select Shorder Type</label> */}
                                <select id="selectShorderID" className="form-control" value={input.shorder_id} name="shorder_id" onChange={onChange} >
                                    <option value="">Select Shorder</option>
                                    {newSharderList.map(item => {
                                        return <option key={item.id} value={item.id}>{item.shorder_name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="weekly_bill"
                                    value={input.weekly_bill}
                                    onChange={onChange}
                                    placeholder="Weekly Bill" />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="weekly_brick_quantity"
                                    value={input.weekly_brick_quantity}
                                    onChange={onChange}
                                    placeholder="weekly brick quantity" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="weekly_cash_bill_paid"
                                    value={input.weekly_cash_bill_paid}
                                    onChange={onChange}
                                    placeholder="weekly cash bill paid" />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="weekly_early_bill_paid"
                                    value={input.weekly_early_bill_paid}
                                    onChange={onChange}
                                    placeholder="weekly early bill paid" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
