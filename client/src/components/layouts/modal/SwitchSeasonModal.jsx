import React, { useContext, useState } from 'react'
import { DispatchContext, StateContext } from './../../../utils/context/AppContext';
import Modal from './Modal';
import SeasonAction from './../../../utils/actions/SeasonAction';
import Utils from 'utils/helpers/Utils';
import AppAction from 'utils/actions/AppAction';
import Response from 'utils/helpers/Response';

export default function SwitchSeasonModal() {
    //global sate
    const { seasons } = useContext(StateContext);
    const { seasonsDispatch, appDispatch } = useContext(DispatchContext);
    //local state
    const initState = Utils.getCurrentSeason();
    const [input, setInput] = useState(initState);//input=id (season id)
    //local method
    const switchSeason = (e) => {
        e.preventDefault();

        if (input === undefined || input.id === undefined || input.id === "") {
            AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, "Select Season", `Select A Season First `, "danger"));
        } else {
            const seasonobj = seasons.find(item => item.id === parseInt(input.id));
            AppAction.getInstance(appDispatch).START_LOADING();
            SeasonAction.getInstance(seasonsDispatch)
                .SwitchSeason(seasonobj)
                .then(res => {
                    AppAction.getInstance(appDispatch).STOP_LOADING();
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(true, res.message, `Season Switched Successfully `, "success"));
                    AppAction.getInstance(appDispatch).RELOAD();
                    setInput(initState);
                    window.location.reload();
                }).catch(e => {
                    AppAction.getInstance(appDispatch).STOP_LOADING();
                    AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                });
        }
    }
    //local method
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <Modal id="switchSeason"
            title="Select A Season"
            btnTitle="Switch Now"
            callback={switchSeason}
            resetInput={{ setInput, initState }}
        >
            <div className="modal-body">
                <select className="form-control" name="id" value={input.id} onChange={onChange} >
                    <option value="">Select Season</option>
                    {seasons.map(item => {
                        return <option key={item.id} value={item.id}>{item.title}</option>
                    })}
                </select>
            </div>
        </Modal >
    )
}
