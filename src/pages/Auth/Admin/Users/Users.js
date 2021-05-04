import React, {useEffect, useState} from "react";
import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import 'react-smart-data-table/dist/react-smart-data-table.css'
import {Link} from "react-router-dom";
import {deleteUser, getUsers} from "../../../../services/userService";
import {useDispatch} from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {confirmModal} from "../../../../helpers/confirmModal"; // Import css

const Users = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const ordered = [
        'firstName',
        'lastName',
        'email',
        'department.name',
        'position.name',
        'birthday',
        'is_admin',
        'actions'
    ];


    const handleDeleteUser = function (id) {
        dispatch({type: 'start-loading'})
        deleteUser(id).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("User", "User deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("User", "User cannot delete")
        })

    };

    const deleteUserConfirm = function (id) {
        confirmModal("Delete user", "You want delete this?", handleDeleteUser, id)
    }


    const headers = {
        firstName: {
            text: 'Firstname',
            sortable: true,
            filterable: true
        },
        lastName: {
            text: 'Lastname',
            sortable: true,
            filterable: true
        },
        email: {
            text: 'Email',
            sortable: true,
            filterable: true
        },
        'department.name': {
            text: 'Department',
            sortable: true,
            filterable: true
        },
        'position.name': {
            text: 'Position',
            sortable: true,
            filterable: true
        },
        birthday: {
            text: 'Birthday',
            sortable: true,
            filterable: true
        },
        is_admin: {
            text: 'Is admin',
            sortable: true,
            filterable: false
        },
        actions: {
            text: 'Actions',
            sortable: false,
            filterable: false,
            transform: (value, idx, row) => (
                <>
                    {(row.active) ? <Link to={`/admin/users/${row.id}`} className="btn btn-primary m-1">Show</Link> : <Link to={`/admin/users/accept/${row.id}`} className="btn btn-warning m-1">Accept</Link>}
                    <Link to={`/admin/users/edit/${row.id}`} className="btn btn-secondary m-1" style={{ cursor: 'pointer' }}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => deleteUserConfirm(row.id)} style={{ cursor: 'pointer' }}>Delete</button>
                </>
            ),
        },
    }


    useEffect(() => {
        dispatch({type: 'start-loading'})
        getUsers().then((response) => {
            setData(response);
            dispatch({type: 'stop-loading'})
        });

        return () => {
            setData([]);
        }

        // eslint-disable-next-line
    },[]);

    return (
        <div className="card">
            <div className="card-body">
                <SmartTable
                    data={data}
                    headers={headers}
                    ordered={ordered}
                />
            </div>
        </div>
    );
}

export default Users;
