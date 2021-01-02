import React, { useContext, useState, useEffect } from 'react'
import Utils from 'utils/helpers/Utils';
import { StateContext } from './../../../utils/context/AppContext';

const CostSummery = () => {
    //global sate
    const { app } = useContext(StateContext);
    //local state
    const [coal, setCoal] = useState({});
    const [soil, setSoil] = useState({});
    const [labour, setLabour] = useState({});

    const season_id = Utils.getCurrentSeason().id;

    useEffect(() => {
        fetch(`sum/coal_cost_table/total_coal_weight/total_amount/paid_amount/${season_id}`)
            .then(response => response.json())
            .then(data => {
                setCoal(data.response)
            });

        fetch(`sum/soil_cost_table/total_amount/total_amount/paid_amount/${season_id}`)
            .then(response => response.json())
            .then(data => {
                setSoil(data.response)
            });
        fetch(`sum/labour_daily_salary_table/labour_daily_salary/paid_amount/${season_id}`)
            .then(response => response.json())
            .then(data => {
                setLabour(data.response)
            });


        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [app.reload]);


    return (
        <>

            <div className="row">
                <div className="col-md-4">
                    <div className="card border border-light shadow-sm">
                        <div className="card-body ">
                            <h5 className="card-title text-primary">Labour Cost Summery</h5>
                            <p className="card-text">Total Labour: {labour.total_things} </p>
                            <p className="card-text">Total Salary: {labour.total_amount} </p>
                            <p className="card-text">Total Paid Salary: {labour.total_paid}</p>
                            <p className="card-text">Total Due Salary:  {(labour.total_amount - labour.total_paid).toString()}</p>
                            <a href="/labour-cost" className="btn btn-outline-primary">View Details</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border border-light  shadow-sm">
                        <div className="card-body ">
                            <h5 className="card-title text-primary">Coal Cost Summery</h5>
                            <p className="card-text">Total Coal Weight: {coal.total_things} </p>
                            <p className="card-text">Total Price: {coal.total_amount} </p>
                            <p className="card-text">Total Paid Price: {coal.total_paid}  </p>
                            <p className="card-text">Total Due Price: {(coal.total_amount - coal.total_paid).toString()}</p>
                            <a href="/coal" className="btn btn-outline-primary">View Details</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border border-light  shadow-sm">
                        <div className="card-body ">
                            <h5 className="card-title text-primary">Soil Cost Summery</h5>
                            <p className="card-text">Total Car :  {soil.total_things}</p>
                            <p className="card-text">Total Price: {soil.total_amount}</p>
                            <p className="card-text">Total Paid Price: {soil.total_paid} </p>
                            <p className="card-text">Total Due Price: {(soil.total_amount - soil.total_paid).toString()}</p>
                            <a href="/soil" className="btn btn-outline-primary">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-0 mt-3">
                <div className="col-md-12 p-0">
                    <img className="rounded" style={{ width: '100%' }} src="https://source.unsplash.com/user/erondu/800x300" alt="Brick Factory" />
                </div>
            </div>
        </>
    )
}
export default CostSummery;
