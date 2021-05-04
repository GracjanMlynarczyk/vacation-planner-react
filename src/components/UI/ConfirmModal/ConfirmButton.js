import React from "react";

const ConfirmButton = (props) => (
    <div className="card">
        <div className="card-header">{props.title}</div>
        <div className="card-body">
            <p>{props.message}</p>
            <hr />
            {props.buttons.map(button => <button key={button.label} onClick={
                (button.hasOwnProperty('onClick')) ? () => {
                    button.onClick();
                    props.onClose();
                } : props.onClose
            } className={
                (button.returnType) ? "btn float-right btn-warning m-1" : "btn btn-primary m-1"
            }>{button.label}</button>)}

        </div>
    </div>
)




export default ConfirmButton;