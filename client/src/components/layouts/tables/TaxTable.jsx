import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import Define from './../../../utils/helpers/Define';
import CostAction from 'utils/actions/CostAction';
import Pagination from './Pagination';
import Utils from 'utils/helpers/Utils';

export default function TaxTable(props) {
    //global state
    const { app, tax } = useContext(StateContext);
    const { taxDispatch } = useContext(DispatchContext);
    //local state
    const [page, setPage] = useState(1);
    const endArray = useState(false);
    const [end, setEnd] = endArray;


    //lifecycle method
    useEffect(() => {
        const table = "tax_cost_table";
        const season_id = Utils.getCurrentSeason().id;

        let source = CostAction.getSource();

        if (!end) {
            CostAction.getInstance(taxDispatch)
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
        //clear up
        return () => {
            console.log("clean up called tax")
            source.cancel();
        }
    }, [page, app.reload]);

    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = tax.filter((item) => {
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
                                <th>Tax Cost Title</th>
                                <th>Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        {/* <tfoot>
                            <tr>
                                <th>Total</th>
                                <th></th>
                                <th>{total.sum_total_amount}</th>
                                <th>{total.sum_paid_amount}</th>
                                <th>{total.sum_total_amount - total.sum_paid_amount}</th>
                                <th></th>
                            </tr>
                        </tfoot> */}
                        <tbody onClick={onClickHandle}>
                            {
                                tax.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.tax_title}</td>
                                        <td>{item.total_amount}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{item.total_amount - item.paid_amount}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addTaxCostID"></i></td>
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
