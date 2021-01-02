import React, { useEffect, useContext } from 'react'
import moment from 'moment'
import { StateContext, DispatchContext } from 'utils/context/AppContext';
import CostAction from '../../../utils/actions/CostAction';
import Define from 'utils/helpers/Define';


export default function StaffListTable() {
    //global state
    const { stafflist } = useContext(StateContext);
    const { stafflistDispatch } = useContext(DispatchContext);

    //lifecycle method
    useEffect(() => {
        //now we will fetch all data
        const source = CostAction.getSource();
        CostAction.getInstance(stafflistDispatch)
            .getAll("staff_list_table")
            .then(res => {
                //console.log("Staff list table ", res.message, res.data);
            })
            .catch(e => {
                console.log(e.message);
            });
        //cleanup
        return () => {
            console.log("clean up called Staff list table")
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [stafflist.length]);
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table id="example" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Staff Name</th>
                                <th>Staff Salary</th>
                                <th>Staff Position</th>
                                <th>Staff Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stafflist.map((item) => {
                                    return (<tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.staff_name}</td>
                                        <td>{item.staff_salary}</td>
                                        <td>{item.staff_position}</td>
                                        <td>{moment(item.staff_join_date).format(Define.DATE_FORMAT_SIMPLE)}</td>
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
