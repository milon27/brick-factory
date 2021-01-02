import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';
import Define from 'utils/helpers/Define';
import Utils from 'utils/helpers/Utils';
import Pagination from './Pagination';



export default function CoalTable(props) {
    //global state
    const { app, coal } = useContext(StateContext);
    const { coalDispatch } = useContext(DispatchContext);
    //local state
    const [page, setPage] = useState(1);
    const endArray = useState(false);
    const [end, setEnd] = endArray;


    //lifecycle method
    useEffect(() => {
        //now we will fetch all data
        const table = "coal_cost_table";
        const season_id = Utils.getCurrentSeason().id;
        const source = CostAction.getSource();
        if (!end) {
            CostAction.getInstance(coalDispatch).getPaginateData(table, season_id, page)
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
    }, [page, app.reload]);//reload because -> total amount change after edit .so need to reload.

    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = coal.filter((item) => {
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
                                <th>Total Coal Weight</th>
                                <th>Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Delear Name</th>
                                <th>Edit</th>
                            </tr>
                        </thead>

                        <tbody onClick={onClickHandle}>
                            {
                                coal.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.total_coal_weight}</td>
                                        <td>{item.total_amount}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{item.total_amount - item.paid_amount}</td>
                                        <td>{item.coal_dealer_name}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addCoalCostID"></i></td>
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
