import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import DeviceForm from "../components/DeviceForm/DeviceForm";
import {getDeviceCategories} from "../../../../../services/deviceCategoryService";
import {editDevice, getDevice} from "../../../../../services/deviceService";


const DeviceEdit = function () {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [ categories, setCategories ] = useState([]);

    const [initialValues, setInitialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        editDevice(id, values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Devices', 'Device updated');
            history.push('/admin/devices');
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            createErrorNotifications('Devices', 'Device cannot update')
        })
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        Promise.all([
            getDeviceCategories(),
            getDevice(id)
        ]).then(([categories, device]) => {
            setCategories(categories);
            setInitialValues(device);
            dispatch({ type: 'stop-loading'})
        });

        return () => {
            setCategories([]);
            setInitialValues({});
        }

        //eslint-disable-next-line
    }, [])

    return (
        <DeviceForm
            categories={categories}
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Edit"
            edited={true}
        />
    );
}

export default DeviceEdit;