import React from 'react'
import Page from './../../layouts/basic/Page';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import LandLordListTable from '../../layouts/tables/LandLordListTable';
import LandLordListModal from './../../layouts/modal/LandLordListModal';

export default function LandLordList() {
    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <LandLordListModal id="landLordListID" />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Land Lord List</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#landLordListID">
                        Add Land Lord Info</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <LandLordListTable />
                </div>
            </div>
        </Page>
    )
}
