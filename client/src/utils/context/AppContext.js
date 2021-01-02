import React, { createContext, useReducer } from 'react';
import AuthReducer, { user_init_state } from '../reducer/AuthReducer';
import AppReducer, { app_init_state } from '../reducer/AppReducer'
import CostReducer, { costInitState } from 'utils/reducer/CostReducer';
import SeasonReducer, { season_init_state } from 'utils/reducer/SeasonReducer';

export const StateContext = createContext();
export const DispatchContext = createContext();

//constant of this page

const AppContext = (props) => {
    const [app, appDispatch] = useReducer(AppReducer, app_init_state);//{}
    const [user, userDispatch] = useReducer(AuthReducer, user_init_state);//{}
    const [coal, coalDispatch] = useReducer(CostReducer, costInitState);//[]
    const [soil, soilDispatch] = useReducer(CostReducer, costInitState);//[]
    const [tax, taxDispatch] = useReducer(CostReducer, costInitState);//[]
    const [otherCost, otherCostDispatch] = useReducer(CostReducer, costInitState);//[]
    const [landlordlist, landlordlistDispatch] = useReducer(CostReducer, costInitState);//[]
    const [landlordcost, landlordcostDispatch] = useReducer(CostReducer, costInitState);//[]
    const [stafflist, stafflistDispatch] = useReducer(CostReducer, costInitState);//[]
    const [staffsalary, staffsalaryDispatch] = useReducer(CostReducer, costInitState);//[]
    const [labourdailycost, labourdailycostDispatch] = useReducer(CostReducer, costInitState);//[]
    const [sharderList, sharderListDispatch] = useReducer(CostReducer, costInitState);//[]
    const [brickbuiltcost, brickbuiltcostDispatch] = useReducer(CostReducer, costInitState);//[]
    //season
    const [seasons, seasonsDispatch] = useReducer(SeasonReducer, season_init_state);//[]

    const global_state = {
        app,
        user,
        coal, soil, tax, otherCost,
        landlordlist, landlordcost,
        stafflist, staffsalary,
        labourdailycost,
        sharderList,
        brickbuiltcost,
        seasons
    };
    const global_dispatch = {
        appDispatch,
        userDispatch,
        coalDispatch, soilDispatch, taxDispatch, otherCostDispatch,
        landlordlistDispatch, landlordcostDispatch,
        stafflistDispatch, staffsalaryDispatch,
        labourdailycostDispatch,
        sharderListDispatch,
        brickbuiltcostDispatch,
        seasonsDispatch
    };

    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};


export default AppContext;