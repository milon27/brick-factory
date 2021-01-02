import React, { useState } from 'react'
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import ShorderTable from 'components/layouts/tables/ShorderTable';
import Page from '../../layouts/basic/Page';
import AddNewShorderModal from 'components/layouts/modal/AddNewShorderModal';
import Utils from 'utils/helpers/Utils';

export default function ShorderList() {
    const initState = {
        id: null,
        season_id: Utils.getCurrentSeason().id,
        shorder_name: "",
        shorder_type: "",
        early_paid_amount: "",
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddNewShorderModal id="addNewShorder" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Shorder List</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addNewShorder" data-backdrop="static">
                        Add New Shorder</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <ShorderTable setInput={setInput} />
                </div>
            </div>
        </Page>
    )
}
