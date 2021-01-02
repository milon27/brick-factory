import React, { useState } from 'react'
import Page from './../../layouts/basic/Page';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import moment from 'moment'
import Define from './../../../utils/helpers/Define';
import DailyLabourCostInfoTable from './../../layouts/tables/DailyLabourCostInfoTable';
import AddDailyLabourCostModal from './../../layouts/modal/AddDailyLabourCostModal';
import Utils from 'utils/helpers/Utils';

export default function LabourDailyCost() {
    //local state
    const initState = {
        season_id: Utils.getCurrentSeason().id,
        labour_name: "",
        labour_daily_salary: "",
        paid_amount: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE),
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />

            <AddDailyLabourCostModal id="addDailyLabourCostInfo" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Daily Labour Cost Info Info</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addDailyLabourCostInfo">
                        Add Daily Labour Info</button>
                </div>
            </div>
            <div className="row my-3">
                <div className="col-md-12">
                    <DailyLabourCostInfoTable setInput={setInput} />
                </div>
            </div>
        </Page>
    )
}
