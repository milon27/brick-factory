import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { DispatchContext, StateContext } from 'utils/context/AppContext'
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';
import LogoutModal from '../modal/LogoutModal';
import AuthAction from 'utils/actions/AuthAction';

export default function Page(props) {
    const { user } = useContext(StateContext);
    const { userDispatch } = useContext(DispatchContext);

    useEffect(() => {
        //check the token expire time
        const isExpired = moment(user.token_expirein).isBefore();//if true-> then logout
        if (isExpired) {
            console.log("Token is expired.login again.");
            AuthAction.getInstance(userDispatch).Logout();
        }
    });

    // check already logged in or not
    if (user === null || user.logged_in === undefined || user.logged_in === false) {
        return <Redirect to="/login" />
    }
    //render.
    return (
        <div>
            {/* <!-- content start --> */}

            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar />
                {/* <!-- EndofSidebar --> */}
                {/* <!-- Content Wrapper --> */}
                <ContentWrapper >
                    {props.children}
                </ContentWrapper>
                {/* <!-- End of Content Wrapper --> */}
            </div>
            {/* <!-- End of Page Wrapper --> */}
            {/* <!-- Scroll to Top Button--> */}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            {/* <!-- Logout Modal--> */}
            <LogoutModal />
            {/* <!-- content end --> */}
        </div>
    )
}
