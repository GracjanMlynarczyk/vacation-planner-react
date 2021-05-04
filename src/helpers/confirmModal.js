import {confirmAlert} from "react-confirm-alert";
import ConfirmButton from "../components/UI/ConfirmModal/ConfirmButton";
import React from "react";

export function confirmModal(title, text, handleYes, id) {
    confirmAlert({
        title: title,
        message: text,
        buttons: [
            {
                label: "No",
                returnType: false
            },
            {
                label: "Yes",
                onClick: () => {
                    handleYes(id);
                },
                returnType: true
            }
        ],
        customUI: ({onClose, title, buttons, message}) => (
            <ConfirmButton onClose={onClose} title={title} buttons={buttons} message={message} />
        )
    });

}