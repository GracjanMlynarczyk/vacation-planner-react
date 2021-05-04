import {editDepartment, getDepartment} from "../../../../../services/departmentService";
import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getUsers} from "../../../../../services/userService";
import {useParams} from 'react-router-dom';
import DepartmentForm from "../components/DepartmentForm/DepartmentForm";


const DepartmentEdit = function () {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [ users, setUsers ] = useState([]);

    const [initialValues, setInitialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        editDepartment(id, values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Departments', 'Department updated');
            history.push('/admin/departments');
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            createErrorNotifications('Departments', 'Department cannot update')
        })
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        Promise.all([
            getUsers(),
            getDepartment(id)
        ]).then(([users, department]) => {
            setUsers(users);
            setInitialValues({
                name: department.name,
                ownerId: department.owner_id,
            });
            dispatch({ type: 'stop-loading'})
        });

        return () => {
            setUsers([]);
            setInitialValues({});
        }

        //eslint-disable-next-line
    }, [])

    return (
        <DepartmentForm
            users={users}
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Edit"
            edited={true}
        />
    );
}

export default DepartmentEdit;