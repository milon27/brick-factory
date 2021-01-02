import React, { useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import Utils from 'utils/helpers/Utils';
import CostAction from '../../../utils/actions/CostAction';
import Define from './../../../utils/helpers/Define';

export default function ShorderTable(props) {
    //global state
    const { sharderList } = useContext(StateContext);
    const { sharderListDispatch } = useContext(DispatchContext);

    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName === "I") {
            const _id = e.target.id;
            let arr = sharderList.filter((item) => {
                return item.id === parseInt(_id)
            });
            //console.log(arr[0])
            props.setInput(arr[0]);
        }
    }

    //lifecycle method
    /**
     * 
      SELECT shorder_info_table.*,COALESCE(sum(brick_built_cost_table.weekly_early_bill_paid), 0) FROM shorder_info_table LEFT JOIN brick_built_cost_table on brick_built_cost_table.shorder_id=shorder_info_table.id where `shorder_type`='MIL_TYPE' GROUP by brick_built_cost_table.shorder_id order by shorder_info_table.id

     */

    useEffect(() => {
        const type = Define.NO_TYPE;
        const season_id = Utils.getCurrentSeason().id;

        const source = CostAction.getSource();
        CostAction.getInstance(sharderListDispatch)
            .getBrickBuiltCost(type, season_id)
            .then(res => {
                //console.log("sharder list ", res.message, res.data);
                //do it after one is done
            })
            .catch(e => {
                console.log(e.message);
            });

        //cleanup
        return () => {
            console.log("clean up called sharder list")
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 

    }, [sharderList.length]);

    return (
        <>
            <div className="card shadow mb-4">

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Sharder Name</th>
                                    <th>Sharder Type</th>
                                    <th>Advance Paid Amount</th>
                                    <th>Cleared Advance Amount</th>
                                    <th>Due Cleared Amount</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            {/* <tfoot>
                                <tr>
                                    <th>{total.sum_total_coal_weight}</th>
                                    <th>{total.sum_total_amount}</th>
                                    <th>{total.sum_paid_amount}</th>
                                    <th>{total.sum_total_amount - total.sum_paid_amount}</th>
                                    <th></th>
                                </tr>
                            </tfoot> */}
                            <tbody onClick={onClickHandle}>
                                {
                                    sharderList.map((item) => {
                                        return (<tr key={item.id} >
                                            <td>{item.shorder_name}</td>
                                            <td>{item.shorder_type}</td>
                                            <td>{item.early_paid_amount}</td>
                                            <td>{item.cleared_early_amount}</td>
                                            <td>{(item.early_paid_amount - item.cleared_early_amount).toString()}</td>
                                            <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#addNewShorder" data-backdrop="static" ></i></td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}
