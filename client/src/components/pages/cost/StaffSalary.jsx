import React, { useState } from 'react'
import Page from './../../layouts/basic/Page';
import Alert from 'components/layouts/alert/Alert';
import Loading from 'components/layouts/alert/Loading';
import moment from 'moment'
import Define from './../../../utils/helpers/Define';
import StaffSalaryTable from 'components/layouts/tables/StaffSalaryTable';
import AddStaffSalaryModal from './../../layouts/modal/AddStaffSalaryModal';

export default function StaffSalary() {
    const initState = {
        staff_id: "",
        paid_amount: "",
        transaction_date: moment(new Date()).format(Define.DATE_FORMAT_SIMPLE),
    };
    const [input, setInput] = useState(initState);

    return (
        <Page>
            {/* loading.... */}
            <Alert />
            <Loading color="info" />

            <AddStaffSalaryModal id="addSalaryInfo" value={{ input, setInput, initState }} />

            <div className="row my-3">
                <div className="col-md-6">
                    <h3>Staff Salary Info</h3>
                    <p>Showing current month full history by default</p>
                </div>
                <div className="col-md-6 text-right">
                    {/* open modal form when click on it */}
                    <button type="button" className="btn btn-primary badge-pill px-4" data-toggle="modal" data-target="#addSalaryInfo">
                        Add Salary Info</button>
                </div>
            </div>
            <div className="row my-3">
                <div className="col-md-12">
                    <StaffSalaryTable setInput={setInput} />
                </div>
            </div>
        </Page>
    )
}
