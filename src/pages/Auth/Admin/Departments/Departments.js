import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteDepartment, getDepartments} from "../../../../services/departmentService";
import {Link} from "react-router-dom";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {confirmModal} from "../../../../helpers/confirmModal";

const Departments = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    function handleDeleteDepartment(id) {
        dispatch({type: 'start-loading'})
        deleteDepartment(id).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Department", "Department deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("Department", "Department cannot delete")
        })
    }

    function deleteDepartmentConfirm(id) {
        confirmModal("Delete department", "You want delete this?", handleDeleteDepartment, id)
    }

    const headers = {
        name: {
            text: "Name",
            sortable: true,
            filterable: true
        },
        ownerName: {
            transform: (value, idx, row) => `${row['owner.firstName']} ${row['owner.lastName']}`
        },
        actions: {
            text: 'Actions',
            sortable: false,
            filterable: false,
            transform: (value, idx, row) => (
                <>
                    <Link className="btn btn-primary m-1" to={`/admin/departments/${row.id}`}>Show</Link>
                    <Link to={`/admin/departments/edit/${row.id}`} className="btn btn-secondary m-1" style={{ cursor: 'pointer' }}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => deleteDepartmentConfirm(row.id)} style={{ cursor: 'pointer' }}>Delete</button>
                </>
            ),
        },
    };

    const ordered = [
        'name',
        'ownerName',
        'actions'
    ];

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getDepartments().then((response) => {
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
            <div className="card-header">
                <Link className="btn btn-primary float-right" to="/admin/departments/add">Add department</Link>
            </div>
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

export default Departments;