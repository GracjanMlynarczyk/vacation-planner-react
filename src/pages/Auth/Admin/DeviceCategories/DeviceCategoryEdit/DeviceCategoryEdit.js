import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {editDeviceCategory, getDeviceCategory} from "../../../../../services/deviceCategoryService";
import DeviceCategoryForm from "../components/DeviceCategoryForm/DeviceCategoryForm";


const DeviceCategoryEdit = function () {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [initialValues, setInitialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        editDeviceCategory(id, values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Device categories', 'Device category updated');
            history.push('/admin/deviceCategories');
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            createErrorNotifications('Device categories', 'Device category cannot update')
        })
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})

        getDeviceCategory(id).then((response) => {
            setInitialValues(response);
            dispatch({ type: 'stop-loading'})
        });

        return () => {
            setInitialValues({});
        }

        //eslint-disable-next-line
    }, [])

    return (
        <DeviceCategoryForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Edit"
            edited={true}
        />
    );
}

export default DeviceCategoryEdit;