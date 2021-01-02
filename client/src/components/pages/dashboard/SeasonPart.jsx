import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment'
import AddSeasonModal from 'components/layouts/modal/AddSeasonModal';
import Define from './../../../utils/helpers/Define';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import { DispatchContext, StateContext } from './../../../utils/context/AppContext';
import SeasonAction from './../../../utils/actions/SeasonAction';
import SwitchSeasonModal from 'components/layouts/modal/SwitchSeasonModal';
import Utils from 'utils/helpers/Utils';


export default function SeasonPart() {
    //global sate
    const { seasons, user } = useContext(StateContext);
    const { seasonsDispatch } = useContext(DispatchContext);
    //local state
    const initState = {
        title: "",
        active: 1,
        start: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE),
        end: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE)
    };
    const [input, setInput] = useState(initState);

    //local method
    const openModal = () => {
        document.getElementById("seasonBtn").click();
    }

    //lifecycle method
    useEffect(() => {
        const source = SeasonAction.getSource();
        //no season in local, check in the database now
        SeasonAction.getInstance(seasonsDispatch).getAllSeason('seasons_table')
            .then(res => {

                //console.log("season list==", res);
                //check do we have any active list or not
                const active_season = res.data.find(item => item.active === 1)
                if (res.data.length === 0) {//no season found create new season
                    openModal("addSeasonID")
                } else if (!active_season) {//no active found ,select a season now
                    // console.log("select a season...this case will not be happend");
                } else {
                    //save into local storage
                    localStorage.setItem(Define.SEASONINFO_LOCAL, JSON.stringify(active_season));
                }
            })
            .catch(e => {
                console.log(e.message);
            });

        //clean up 
        return () => {
            source.cancel();
        }

    }, [seasons.length])



    if (user === null || user.logged_in === undefined || user.logged_in === false) {
        return <></>
    }
    return (
        <>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddSeasonModal id="addSeasonID" value={{ input, setInput, initState }} />
            <button id="seasonBtn" type="button" className="d-none" data-toggle="modal" data-target="#addSeasonID" data-backdrop="static">
                Add and Start Season</button>
            {/* stich season */}
            <SwitchSeasonModal />

            <div className="row my-3">
                <div className="col-md-6">
                    <h4>Dashboard</h4>
                    <p>Current Season: {Utils.getCurrentSeason().title}</p>
                </div>
                <div className="col-md-6 text-right">
                    <button type="button" data-toggle="modal" data-target="#switchSeason" data-backdrop="static" className="btn btn-outline-primary badge-pill px-4 mr-2">
                        Switch Season
                    </button>
                    {/* open modal form when click on it */}

                    <button type="button" data-toggle="modal" data-target="#addSeasonID" data-backdrop="static" className="btn btn-primary badge-pill px-4">
                        Start New Season
                    </button>
                </div>
            </div>


        </>
    )

}
