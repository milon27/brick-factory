import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';
import moment from 'moment';
import Filter from './Filter';
import Define from './../../../utils/helpers/Define';

export default function StaffSalaryTable(props) {

    //global state
    const { staffsalary } = useContext(StateContext);
    const { staffsalaryDispatch, stafflistDispatch } = useContext(DispatchContext);

    //local state
    let firstDayOfMonth = moment().startOf('month').format(Define.DATE_FORMAT_SIMPLE);
    const [date, setDate] = useState([
        {
            startDate: new Date(firstDayOfMonth),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    //lifecycle method
    useEffect(() => {
        const start = moment(date[0].startDate).format(Define.DATE_FORMAT_SIMPLE);
        const end = moment(date[0].endDate).format(Define.DATE_FORMAT_SIMPLE);

        const main_table = "staff_salary_table";
        const main_id = "staff_id";//we need this id
        const join_table = "staff_list_table";
        const join_id = "id";
        //now we will fetch all data of last 1 year

        const source = CostAction.getSource();
        CostAction.getInstance(staffsalaryDispatch)
            .getAllJoinData(main_table, main_id, join_table, join_id, start, end)
            .then(res => {
                //console.log("staff salary list ", res.message, res.data);
                //do it after one is done
                CostAction.getInstance(stafflistDispatch)
                    .getAll("staff_list_table")
                    .then(res => {
                        //console.log("staff list inside cost", res.message, res.data);
                    })
                    .catch(e => {
                        console.log(e.message);
                    });
            })
            .catch(e => {
                console.log(e.message);
            });

        //cleanup
        return () => {
            console.log("clean up called land lord Cost")
            source.cancel();
        }
    }, [date, staffsalary.length]);


    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = staffsalary.filter((item) => {
                return item.id === parseInt(_id)
            });
            props.setInput(arr[0]);
        }
    }
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <Filter date={date} setDate={setDate} />
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Staff Name</th>
                                <th>Staff Salary</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        {/* <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <th>{total.sum_total_coal_weight}</th>
                                    <th>{total.sum_total_amount}</th>
                                    <th>{total.sum_paid_amount}</th>
                                    <th>{total.sum_total_amount - total.sum_paid_amount}</th>
                                    <th></th>
                                </tr>
                            </tfoot> */}
                        <tbody onClick={onClickHandle}>
                            {
                                staffsalary.map((item) => {
                                    return (<tr key={item.id} >
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.staff_name}</td>
                                        <td>{item.staff_salary}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{(item.staff_salary - item.paid_amount)}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addSalaryInfo"></i></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
