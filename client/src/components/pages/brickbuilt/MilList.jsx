import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import React, { useState } from 'react'
import Page from './../../layouts/basic/Page';
import AddBrickBuiltCostModal from './../../layouts/modal/AddBrickBuiltCostModal';
import moment from 'moment';
import Define from './../../../utils/helpers/Define';
import BrickBuiltCostTable from './../../layouts/tables/BrickBuiltCostTable';
import Utils from 'utils/helpers/Utils';

export default function MilList() {
    //local
    const initState = {
        id: null,
        season_id: Utils.getCurrentSeason().id,
        cost_type: "",//sharder type
        shorder_id: "",
        weekly_brick_quantity: "",
        weekly_bill: "",
        weekly_cash_bill_paid: "",
        weekly_early_bill_paid: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE),
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddBrickBuiltCostModal id="addBBCost" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Brick Built Cost</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addBBCost" data-backdrop="static">
                        Add Brick Built Cost</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <BrickBuiltCostTable setInput={setInput} />
                </div>
            </div>
        </Page>
    )
}
