import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getUsers} from "../../../../../services/userService";
import {addDepartment} from "../../../../../services/departmentService";
import DepartmentForm from "../components/DepartmentForm/DepartmentForm";

const DepartmentAdd = function () {

    const history = useHistory();
    const dispatch = useDispatch();
    const [ users, setUsers ] = useState([]);

    const [initialValues] = useState(null);

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        addDepartment(values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Departments', 'Department added');
            history.push('/admin/departments');
        }).catch(() => {
             dispatch({ type: 'stop-loading'})
             createErrorNotifications('Departments', 'Department cannot added')
         })
    }



    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getUsers().then((response) => {
            setUsers(response);
            dispatch({ type: 'stop-loading'})
        })

        return () => {
            setUsers([]);
        }

        //eslint-disable-next-line
    }, [])

    return (
        <DepartmentForm
            users={users}
            initialValues={initialValues}
            onSubmit={onSubmit}
            textButton="Add"
            edited={false}
        />
    );
};

export default DepartmentAdd;