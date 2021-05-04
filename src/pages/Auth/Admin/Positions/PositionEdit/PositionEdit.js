import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import PositionForm from "../components/PositionForm/PositionForm";
import {editPosition, getPosition} from "../../../../../services/positionService";


const PositionEdit = function () {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        editPosition(id, values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Positions', 'Position updated');
            history.push('/admin/positions');
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            createErrorNotifications('Positions', 'Position cannot update')
        })
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})

        getPosition(id).then((response) => {
            setInitialValues(response);
            dispatch({ type: 'stop-loading'})
        });

        return () => {
            setInitialValues({});
        }

        //eslint-disable-next-line
    }, [])

    return (
        <PositionForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Edit"
            edited={true}
        />
    );
}

export default PositionEdit;