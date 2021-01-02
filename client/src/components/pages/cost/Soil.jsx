import React, { useState } from 'react'
import Page from 'components/layouts/basic/Page'
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import SoilTable from 'components/layouts/tables/SoilTable';
import AddSoilCostModal from 'components/layouts/modal/AddSoilCostModal';
import moment from 'moment';
import Define from 'utils/helpers/Define';
import Utils from 'utils/helpers/Utils';

export default function Soil() {
    //local state
    const initState = {
        season_id: Utils.getCurrentSeason().id,
        soil_car_quantity: "",
        soil_per_car_price: "",
        paid_amount: "",
        contractor_name: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE)
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddSoilCostModal id="addSoilCostID" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Soil Payment Info</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addSoilCostID">
                        Add Soil Payment Info</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <SoilTable setInput={setInput} />
                </div>
            </div>

        </Page>
    )
}
