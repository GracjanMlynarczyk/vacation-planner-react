import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import DeviceForm from "../components/DeviceForm/DeviceForm";
import {addDevice} from "../../../../../services/deviceService";
import {getDeviceCategories} from "../../../../../services/deviceCategoryService";

const DeviceAdd = function () {

    const history = useHistory();
    const dispatch = useDispatch();
    const [ categories, setCategories ] = useState([]);

    const [initialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        addDevice(values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Devices', 'Device added');
            history.push('/admin/devices');
        }).catch(() => {
             dispatch({ type: 'stop-loading'})
             createErrorNotifications('Devices', 'Device cannot added')
         })
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getDeviceCategories().then((response) => {
            setCategories(response);
            dispatch({ type: 'stop-loading'})
        })

        return () => {
            setCategories([]);
        }

        //eslint-disable-next-line
    }, [])

    return (
        <DeviceForm
            categories={categories}
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Add"
            edited={false}
        />
    );
};

export default DeviceAdd;