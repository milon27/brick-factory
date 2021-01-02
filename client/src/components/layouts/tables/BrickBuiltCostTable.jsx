import React, { useEffect, useContext } from 'react'
import moment from 'moment';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';
import Define from 'utils/helpers/Define';
import Utils from 'utils/helpers/Utils';

export default function BrickBuiltCostTable(props) {
    //global state
    const { app, brickbuiltcost } = useContext(StateContext);
    const { sharderListDispatch, brickbuiltcostDispatch } = useContext(DispatchContext);

    //lifecycle method
    useEffect(() => {
        //now we will fetch all data

        const maintable = "brick_built_cost_table";
        const mainID = "shorder_id";
        const jointable = "shorder_info_table";
        const joinID = "id";

        const season_id = Utils.getCurrentSeason().id;
        const source = CostAction.getSource();

        CostAction.getInstance(brickbuiltcostDispatch).getByJoinData(maintable, mainID, jointable, joinID, season_id)
            .then(res => {
                //console.log("brick_built_cost_table ", res.message, res.data);
                //load all the sharder ....

                CostAction.getInstance(sharderListDispatch)
                    .getAllData("shorder_info_table", season_id)
                    .then(res => {
                        //console.log("shorder list==", res.message, res.data);
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
            console.log("clean up called brick_built_cost_table");
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [brickbuiltcost.length, app.reload]);

    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = brickbuiltcost.filter((item) => {
                return item.id === parseInt(_id)
            });
            props.setInput(arr[0]);
        }
    }


    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                Filter Option...
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table id="example" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Cost Type</th>
                                <th>Sharder Name</th>
                                <th>Weekly Brick Quantity</th>
                                <th>Weekly Bill</th>
                                <th>Weekly Cash Bill Paid</th>
                                <th>Weekly Early Bill Paid</th>
                                <th>Weekly Due Bill</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tfoot>
                            {/*<tr>
                                 <th>Total</th>
                                <th>{total.sum_total_coal_weight}</th>
                                <th>{total.sum_total_amount}</th>
                                <th>{total.sum_paid_amount}</th>
                                <th>{total.sum_total_amount - total.sum_paid_amount}</th>
                                <th></th>
                                <th></th> 
                            </tr>*/}
                        </tfoot>
                        <tbody onClick={onClickHandle}>
                            {

                                brickbuiltcost.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                        <td>{item.cost_type}</td>
                                        <td>{item.shorder_name}</td>
                                        <td>{item.weekly_brick_quantity}</td>
                                        <td>{item.weekly_bill}</td>
                                        <td>{item.weekly_cash_bill_paid}</td>
                                        <td>{item.weekly_early_bill_paid}</td>
                                        <td>{(item.weekly_bill - (item.weekly_cash_bill_paid + item.weekly_early_bill_paid)).toString()}</td>
                                        <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addBBCost"></i></td>
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
