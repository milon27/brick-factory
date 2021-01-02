import React from 'react'
import Page from './../../layouts/basic/Page';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import StaffListTable from 'components/layouts/tables/StaffListTable';
import AddNewStaffModal from './../../layouts/modal/AddNewStaffModal';

export default function StaffList() {
    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />
            {/* form modal */}
            <AddNewStaffModal id="addNewStaffID" />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Office Staff List</h3>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addNewStaffID">
                        Add New Staff</button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-12">
                    <StaffListTable />
                </div>
            </div>
        </Page>
    )
}
