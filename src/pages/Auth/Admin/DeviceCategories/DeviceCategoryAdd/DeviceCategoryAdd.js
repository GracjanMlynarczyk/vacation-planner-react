import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import DeviceCategoryForm from "../components/DeviceCategoryForm/DeviceCategoryForm";
import {addDeviceCategory} from "../../../../../services/deviceCategoryService";

const DeviceCategoryAdd = function () {

    const history = useHistory();
    const dispatch = useDispatch();

    const [initialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        addDeviceCategory(values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Device categories', 'Device category added');
            history.push('/admin/deviceCategories');
        }).catch(() => {
             dispatch({ type: 'stop-loading'})
             createErrorNotifications('Device categories', 'Device category cannot added')
         })
    }


    return (
        <DeviceCategoryForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Add"
            edited={false}
        />
    );
};

export default DeviceCategoryAdd;