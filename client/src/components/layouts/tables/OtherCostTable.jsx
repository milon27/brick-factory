import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import Define from './../../../utils/helpers/Define';
import CostAction from 'utils/actions/CostAction';
import Utils from 'utils/helpers/Utils';
import Pagination from './Pagination';
export default function OtherCostTable(props) {
    //global state
    const { app, otherCost } = useContext(StateContext);
    const { otherCostDispatch } = useContext(DispatchContext);
    //local state
    const [page, setPage] = useState(1);
    const endArray = useState(false);
    const [end, setEnd] = endArray;

    //lifecycle method
    useEffect(() => {//otherCostDispatch//DAILY_OTHER_COST_TABLE
        const table = "daily_other_cost_table";
        const season_id = Utils.getCurrentSeason().id;

        //now we will fetch all data of last 1 year
        const source = CostAction.getSource();
        if (!end) {
            CostAction.getInstance(otherCostDispatch)
                .getPaginateData(table, season_id, page)
                .then(res => {
                    //console.log(`${table}list `, res.message, res.data);
                    setEnd(false)
                })
                .catch(e => {
                    console.log(`${table} error `, e.message);
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
            let arr = otherCost.filter((item) => {
                return item.id === parseInt(_id)
            });
            props.setInput(arr[0]);
        }
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <Pagination endArray={endArray} setPage={setPage} />
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table id="example" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Other Cost Title</th>
                                <th>Other Cost Description</th>
                                <th>Total Amount</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        {/* <tfoot>
                            <tr>
                                <th>Total</th>
                                <th></th>
                                <th></th>
                                <th>{total.sum_total_amount}</th>
                                <th></th>
                            </tr>
                        </tfoot> */}
                        <tbody onClick={onClickHandle}>
                            {
                                otherCost.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.other_cost_title}</td>
                                        <td>{item.other_cost_details}</td>
                                        <td>{item.total_amount}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addOtherCostID"></i></td>
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
