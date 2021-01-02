import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';
import moment from 'moment';
import Filter from './Filter';
import Define from './../../../utils/helpers/Define';

export default function LandLordCostTable(props) {
    //global state
    const { landlordcost } = useContext(StateContext);
    const { landlordcostDispatch, landlordlistDispatch } = useContext(DispatchContext);

    //local state
    let firstDayOfYear = moment().startOf('year').format(Define.DATE_FORMAT_SIMPLE);
    const [date, setDate] = useState([
        {
            startDate: new Date(firstDayOfYear),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    //lifecycle method
    useEffect(() => {
        const start = moment(date[0].startDate).format(Define.DATE_FORMAT_SIMPLE);
        const end = moment(date[0].endDate).format(Define.DATE_FORMAT_SIMPLE);

        const main_table = "land_loard_cost_table";
        const main_id = "land_lord_id";//we need this id
        const join_table = "land_loard_list_table";
        const join_id = "id";
        //now we will fetch all data of last 1 year

        const source = CostAction.getSource();
        CostAction.getInstance(landlordcostDispatch)
            .getAllJoinData(main_table, main_id, join_table, join_id, start, end)
            .then(res => {
                //console.log("land lord Cost list ", res.message, res.data);
                //do it after one is done
                CostAction.getInstance(landlordlistDispatch)
                    .getAll("land_loard_list_table")
                    .then(res => {
                        //console.log("land lord list 2", res.message, res.data);
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
    }, [date, landlordcost.length]);


    //local method
    const onClickHandle = (e) => {
        if (e.target.nodeName == "I") {
            const _id = e.target.id;
            let arr = landlordcost.filter((item) => {
                return item.id === parseInt(_id)
            });
            //console.log(arr[0])
            props.setInput(arr[0]);
        }
    }
    return (
        <>
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
                                    <th>Land Lord Name</th>
                                    <th>Rent Per Year</th>
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
                                    landlordcost.map((item) => {
                                        return (<tr key={item.id} >
                                            <td>{moment(item.transaction_date).format(Define.DATE_FORMAT)}</td>
                                            <td>{item.land_lord_name}</td>
                                            <td>{item.land_rent_per_year}</td>
                                            <td>{item.paid_amount}</td>
                                            <td>{(item.land_rent_per_year - item.paid_amount)}</td>
                                            <td><i id={item.id} className="fa fa-edit" data-toggle="modal" data-target="#LandLordCost"></i></td>
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
