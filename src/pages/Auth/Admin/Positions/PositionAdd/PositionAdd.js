import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import PositionForm from "../components/PositionForm/PositionForm";
import {addPosition} from "../../../../../services/positionService";

const PositionAdd = function () {

    const history = useHistory();
    const dispatch = useDispatch();

    const [initialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        addPosition(values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Positions', 'Position added');
            history.push('/admin/positions');
        }).catch(() => {
             dispatch({ type: 'stop-loading'})
             createErrorNotifications('Positions', 'Position cannot added')
         })
    }


    return (
        <PositionForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Add"
            edited={false}
        />
    );
};

export default PositionAdd;