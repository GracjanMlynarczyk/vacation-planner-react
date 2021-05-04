import {Link} from "react-router-dom";
import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {confirmModal} from "../../../../helpers/confirmModal";

import {deleteDevice, getDevices} from "../../../../services/deviceService";

const DeviceCategories = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    function handleDeleteDevice(id) {
        dispatch({type: 'start-loading'})
        deleteDevice(id).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Devices", "Device deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("Devices", "Device cannot delete")
        })

    }

    function deleteDeviceConfirm(id) {
        confirmModal("Delete device", "You want delete this?", handleDeleteDevice, id)
    }

    const headers = {
        name: {
            text: "Name",
            sortable: true,
            filterable: true
        },
        user: {
            text: "User",
            sortable: true,
            filterable: true,
            transform: (value, idx, row) => `${row['owner.firstName']} ${row['owner.lastName']}`
        },
        'status.name':{
            text: "Status",
            sortable: true,
            filterable: true,
        },
        serial: {
            text: "Serial",
            sortable: true,
            filterable: true,
        },
        'category.name': {
            text: "Category",
            sortable: true,
            filterable: true,
        },
        actions: {
            text: 'Actions',
            sortable: false,
            filterable: false,
            transform: (value, idx, row) => (
                <>
                    <Link className="btn btn-primary m-1" to={`/admin/devices/${row.id}`}>Show</Link>
                    <Link to={`/admin/devices/edit/${row.id}`} className="btn btn-secondary m-1" style={{ cursor: 'pointer' }}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => deleteDeviceConfirm(row.id)} style={{ cursor: 'pointer' }}>Delete</button>
                </>
            ),
        },
    };

    const ordered = [
        'name',
        'user',
        'status.name',
        'serial',
        'category.name',
        'actions'
    ];

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getDevices().then((response) => {
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
                <Link className="btn btn-primary float-right" to="/admin/devices/add">Add device</Link>
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

export default DeviceCategories;