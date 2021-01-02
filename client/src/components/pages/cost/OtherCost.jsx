import React, { useState } from 'react'
import Page from './../../layouts/basic/Page';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import OtherCostTable from 'components/layouts/tables/OtherCostTable';
import AddOtherCostModal from './../../layouts/modal/AddOtherCostModal';
import moment from 'moment'
import Define from 'utils/helpers/Define';
import Utils from 'utils/helpers/Utils';


export default function OtherCost() {
    //local state
    let initState = {
        season_id: Utils.getCurrentSeason().id,
        other_cost_title: "",
        other_cost_details: "",
        total_amount: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE),
    };
    const [input, setInput] = useState(initState);


    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddOtherCostModal id="addOtherCostID" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Daily Other Cost Info</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addOtherCostID">
                        Add Daily Other Cost</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <OtherCostTable setInput={setInput} />
                </div>
            </div>
        </Page>
    )
}
