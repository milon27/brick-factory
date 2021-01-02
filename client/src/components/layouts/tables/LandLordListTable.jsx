import React, { useEffect, useContext } from 'react'
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';

export default function LandLordListTable() {
    //global state
    const { landlordlist } = useContext(StateContext);
    const { landlordlistDispatch } = useContext(DispatchContext);

    //lifecycle method
    useEffect(() => {
        //now we will fetch all data
        const source = CostAction.getSource();
        CostAction.getInstance(landlordlistDispatch)
            .getAll("land_loard_list_table")
            .then(res => {
                //console.log("land lord list ", res.message, res.data);
            })
            .catch(e => {
                console.log(e.message);
            });
        //cleanup
        return () => {
            console.log("clean up called land lord list")
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [landlordlist.length]);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table id="example" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Land Lord ID</th>
                                <th>Land Lord Name</th>
                                <th>Land Quantity</th>
                                <th>Rent Per Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                landlordlist.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.land_lord_name}</td>
                                        <td>{item.land_quantity}</td>
                                        <td>{item.land_rent_per_year}</td>
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
