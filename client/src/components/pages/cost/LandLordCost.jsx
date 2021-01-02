import React, { useState } from 'react';
import Page from './../../layouts/basic/Page';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import LandLordCostTable from '../../layouts/tables/LandLordCostTable';
import LandLordCostModal from './../../layouts/modal/LandLordCostModal';

import moment from 'moment';
import Define from './../../../utils/helpers/Define';

export default function LandLordCost() {

    const initState = {
        land_lord_id: "",
        paid_amount: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE),
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <LandLordCostModal id="LandLordCost" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Land Lord Cost Info</h3>
                    <p>Showing current year full history by default</p>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#LandLordCost">
                        Add Land Lord Cost</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <LandLordCostTable setInput={setInput} />
                </div>
            </div>

        </Page>
    )
}
