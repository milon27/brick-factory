import React from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default function Filter(props) {

    return (
        <div className="row">
            <div className="col-md-12">
                <button type="button" className="btn btn-outline-primary badge-pill px-3"
                    data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                >Filter By Date Range</button>

                <div className="collapse mt-3" id="collapseExample">
                    <div className="card card-body">
                        <DateRangePicker
                            onChange={item => props.setDate([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={props.date}
                            direction="horizontal"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
