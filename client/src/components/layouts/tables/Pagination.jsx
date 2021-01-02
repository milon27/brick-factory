import React from 'react'

const Pagination = ({ setPage, endArray }) => {

    const [end, setEnd] = endArray

    const inc = () => {
        if (!end) {
            setPage(next => next + 1);
        }

    }
    const dec = () => {
        setPage(prev => prev === 1 ? 1 : (prev - 1));
        setEnd(false)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-outline-primary" type="button" onClick={() => { dec() }}>Go Previous Page</button>
                </div>
                <div className="col-md-6 text-right">
                    <button className="btn btn-outline-primary" type="button" onClick={() => { inc() }}>Go Next Page</button>
                </div>
            </div>
        </div>
    )
}

export default Pagination;
