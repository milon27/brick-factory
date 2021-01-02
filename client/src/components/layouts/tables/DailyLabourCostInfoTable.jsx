import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';
import moment from 'moment';
import Define from './../../../utils/helpers/Define';
import Pagination from './Pagination';
import Utils from 'utils/helpers/Utils';

export default function DailyLabourCostInfoTable(props) {
    //global state
    const { app, labourdailycost } = useContext(StateContext);
    const { labourdailycostDispatch } = useContext(DispatchContext);

    //local state
    const [page, setPage] = useState(1);
    const endArray = useState(false);
    const [end, setEnd] = endArray


    //lifecycle method
    useEffect(() => {
        const table = "labour_daily_salary_table";
        const season_id = Utils.getCurrentSeason().id;

        //now we will fetch all data of last 1 year
        const source = CostAction.getSource();
        if (!end) {
            CostAction.getInstance(labourdailycostDispatch)
                .getPaginateData(table, season_id, page)
                .then(res => {
                    //console.log(`${table}list `, res.message, res.data);
                    setEnd(false)
                })
                .catch(e => {
                    console.log(`${table} error `, e);
                    setEnd(true)
                    setPage(prev => prev - 1)
                });
        }
        //cleanup
        return () => {
            console.log(`${table} clean up `);
            source.cancel();
        } // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [page, app.reload]);


    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = labourdailycost.filter((item) => {
                return item.id === parseInt(_id)
            });
            props.setInput(arr[0]);
        }
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-header">
                <Pagination endArray={endArray} setPage={setPage} />
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Labour Name</th>
                                <th>Labour Daily Salary</th>
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
                                labourdailycost.map((item) => {
                                    return (<tr key={item.id} >
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.labour_name}</td>
                                        <td>{item.labour_daily_salary}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{(item.labour_daily_salary - item.paid_amount)}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addDailyLabourCostInfo"></i></td>
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
