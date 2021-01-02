import React, { useState } from 'react';
import Page from 'components/layouts/basic/Page';
import AddCoalCostModal from 'components/layouts/modal/AddCoalCostModal';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import CoalTable from 'components/layouts/tables/CoalTable';
import moment from 'moment';
import Define from 'utils/helpers/Define';
import Utils from 'utils/helpers/Utils';

export default function Coal() {

    //local state
    const initState = {
        season_id: Utils.getCurrentSeason().id,
        total_amount: "",
        paid_amount: "",
        total_coal_weight: "",
        coal_dealer_name: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE)
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddCoalCostModal id="addCoalCostID"
                value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Coal Payment Info</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addCoalCostID">
                        Add Coal Payment Info</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <CoalTable setInput={setInput} />
                </div>
            </div>

        </Page>
    )
}
