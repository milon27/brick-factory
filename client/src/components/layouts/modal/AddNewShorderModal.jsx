import React, { useContext, useEffect } from 'react'
import Modal from './Modal';
import { DispatchContext } from 'utils/context/AppContext';
import AppAction from 'utils/actions/AppAction';
import Response from 'utils/helpers/Response';
import CostAction from 'utils/actions/CostAction';
import Define from './../../../utils/helpers/Define';

export default function AddNewShorderModal(props) {
    const types = [Define.MIL_TYPE, Define.KACHA_TYPE, Define.PAKA_TYPE, Define.JAB_TYPE];
    //props
    const { input, setInput, initState } = props.value;
    //global
    //const { sharderList } = useContext(StateContext);
    const { sharderListDispatch, appDispatch } = useContext(DispatchContext);
    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const isValidField = () => {
        if (input.shorder_name === "" || input.early_paid_amount === "") {
            return false;
        } else {
            return true;
        }
    }
    const onSubmit = () => {
        const table_name = 'shorder_info_table';
        if (!isValidField()) {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Empty Field Found", "Enter all feild value and try again", "danger"));
        } else {
            if (input.id === null) {
                //add new item
                AppAction.getInstance(appDispatch).START_LOADING();
                CostAction.getInstance(sharderListDispatch).addData(`v1/post/${table_name}/`, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Sharder info added Successfully `, "success"));
                        setInput(initState);
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });
            } else {
                //update existing info
                //remove the extra filed (cleared_early_amount)
                var newinput = { ...input }
                delete newinput.cleared_early_amount;
                //url,udate_input,payload
                CostAction.getInstance(sharderListDispatch).updateData(`v1/put/${table_name}/${input.id}`, newinput, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Sharder info updated Successfully `, "success"));
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
        if (input.id === null) {
            //console.log("not disabled");
            document.getElementById("selectTypeID").disabled = false;
        } else {
            console.log("disabled");
            document.getElementById("selectTypeID").disabled = true;
        }
    }, [input.shorder_type]);

    return (
        <Modal
            id={props.id}
            title="Add New Sharder"
            btnTitle="Submit Now"
            callback={onSubmit}
            resetInput={{ setInput, initState }}
        >
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                {/* <label htmlFor=""></label> */}
                                <input type="text"
                                    className="form-control"
                                    name="shorder_name"
                                    value={input.shorder_name}
                                    onChange={onChange}
                                    placeholder="Shorder Name e.g. Rahim (1-no Mil) / Karim (Kacha)" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                {/* <label htmlFor=""></label> */}
                                <input type="number"
                                    className="form-control"
                                    name="early_paid_amount"
                                    value={input.early_paid_amount}
                                    onChange={onChange}
                                    placeholder="Early Paid Amount" />
                            </div>
                            <div className="form-group col-md-6">
                                {/* <label htmlFor="">Select Shorder Type</label> */}
                                <select id="selectTypeID" className="form-control" value={input.shorder_type} name="shorder_type" onChange={onChange} >
                                    <option value="">Select shorder type</option>
                                    {types.map(item => {
                                        return <option key={item} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
