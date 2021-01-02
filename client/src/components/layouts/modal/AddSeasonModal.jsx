import Modal from './Modal';
import React, { useContext } from 'react'
import AppAction from './../../../utils/actions/AppAction';
import { DispatchContext } from 'utils/context/AppContext';
import Response from './../../../utils/helpers/Response';
import SeasonAction from './../../../utils/actions/SeasonAction';
import Define from './../../../utils/helpers/Define';


export default function AddSeasonModal(props) {
    //global state
    const { appDispatch, seasonsDispatch } = useContext(DispatchContext);
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

            //check start a new season or brand new season 
            if (!JSON.parse(localStorage.getItem(Define.SEASONINFO_LOCAL))) {
                //brand new season
                AppAction.getInstance(appDispatch).START_LOADING();
                //add new info
                SeasonAction.getInstance(seasonsDispatch).addSeason("v1/post/seasons_table/", input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Season info added Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
                        setInput(initState);
                        window.location.reload();

                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });
            } else {
                //1. make inactive 
                //2. add new active season...
                const old_id = JSON.parse(localStorage.getItem(Define.SEASONINFO_LOCAL)).id
                SeasonAction.getInstance(seasonsDispatch).addSeason(`v1/season/seasons_table/${old_id}`, input)
                    .then(res => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Season Started Successfully `, "success"));
                        AppAction.getInstance(appDispatch).RELOAD();
                        setInput(initState);
                        window.location.reload();
                    }).catch(e => {
                        AppAction.getInstance(appDispatch).STOP_LOADING();
                        AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                    });
            }


        }
    }

    const isValidField = () => {
        if (input.title === "") {
            return false;
        } else {
            return true;
        }
    }

    return (
        <Modal
            id={props.id}
            title="Add New Season"
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
                                    name="title"
                                    placeholder="Season Title e.g. Season-1 (mar-2020 to dec-2020)"
                                    value={input.title}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Modal >
    )
}
