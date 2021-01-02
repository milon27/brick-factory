import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import Define from './../../../utils/helpers/Define';
import CostAction from 'utils/actions/CostAction';
import Pagination from './Pagination';
import Utils from 'utils/helpers/Utils';


export default function SoilTable(props) {
    //global state
    const { app, soil } = useContext(StateContext);
    const { soilDispatch } = useContext(DispatchContext);
    //local state
    const [page, setPage] = useState(1);
    const endArray = useState(false);
    const [end, setEnd] = endArray;


    //lifecycle method
    useEffect(() => {
        const table = "soil_cost_table";
        const season_id = Utils.getCurrentSeason().id;

        const source = CostAction.getSource();
        if (!end) {
            CostAction.getInstance(soilDispatch).getPaginateData(table, season_id, page)
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [page, app.reload]);

    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = soil.filter((item) => {
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
                                <th>Car Quantity</th>
                                <th>Per Car Price</th>
                                <th>Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Contractor Name</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        {/* <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{total.sum_soil_car_quantity}</th>
                                <th></th>
                                <th>{total.sum_total_amount}</th>
                                <th>{total.sum_paid_amount}</th>
                                <th>{total.sum_total_amount - total.sum_paid_amount}</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot> */}
                        <tbody onClick={onClickHandle}>
                            {
                                soil.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.soil_car_quantity}</td>
                                        <td>{item.soil_per_car_price}</td>
                                        <td>{item.total_amount}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{item.total_amount - item.paid_amount}</td>
                                        <td>{item.contractor_name}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addSoilCostID"></i></td>
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
