import React from 'react'

export default function Modal(props) {

    const resetInput = () => {
        props.resetInput.setInput(props.resetInput.initState);
    }

    return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetInput}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetInput} >Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.callback}>{props.btnTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
