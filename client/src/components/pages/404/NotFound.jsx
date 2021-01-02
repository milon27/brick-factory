import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();
    const goToHome = (e) => {
        e.preventDefault();
        history.push("/");
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center py-5">
                    <h1>page not found</h1>
                    <p>You are in a wrong place. go to home!</p>
                    <button className="btn btn-danger" onClick={goToHome}>Go To HOME</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;