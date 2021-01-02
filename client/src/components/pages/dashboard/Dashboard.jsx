import React from 'react';
import Page from 'components/layouts/basic/Page';
import SeasonPart from './SeasonPart';
import CostSummery from './CostSummery';


const Dashboard = () => {

    return (
        <Page>
            <SeasonPart />
            <CostSummery />
        </Page>
    );
};

export default Dashboard;