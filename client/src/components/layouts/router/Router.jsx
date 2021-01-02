import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../../pages/auth/Login'
import Dashboard from '../../pages/dashboard/Dashboard'
import NotFound from '../../pages/404/NotFound'
import Coal from '../../pages/cost/Coal';
import Soil from './../../pages/cost/Soil';
import Tax from './../../pages/cost/Tax';
import OtherCost from './../../pages/cost/OtherCost';
import LandLordList from './../../pages/cost/LandLordList';
import LandLordCost from 'components/pages/cost/LandLordCost';
import StaffList from 'components/pages/cost/StaffList';
import StaffSalary from 'components/pages/cost/StaffSalary';
import LabourDailyCost from './../../pages/cost/LabourDailyCost';
import ShorderList from 'components/pages/brickbuilt/ShorderList';
import MilList from 'components/pages/brickbuilt/MilList';
import DbSetup from './../../pages/setupdb/DbSetup';


class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/Coal" component={Coal} />
                    <Route exact path="/soil" component={Soil} />
                    <Route exact path="/tax" component={Tax} />
                    <Route exact path="/other-cost" component={OtherCost} />
                    <Route exact path="/land-lord-list" component={LandLordList} />
                    <Route exact path="/land-lord-cost" component={LandLordCost} />
                    <Route exact path="/staff-list" component={StaffList} />
                    <Route exact path="/staff-salary" component={StaffSalary} />
                    <Route exact path="/labour-cost" component={LabourDailyCost} />
                    <Route exact path="/shorder-list" component={ShorderList} />
                    <Route exact path="/mil-cost" component={MilList} />
                    <Route exact path="/db-setup" component={DbSetup} />
                    <Route default component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;