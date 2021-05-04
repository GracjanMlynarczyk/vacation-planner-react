import {Link} from "react-router-dom";
import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {confirmModal} from "../../../../helpers/confirmModal";
import {deleteDeviceCategory, getDeviceCategories} from "../../../../services/deviceCategoryService";

const DeviceCategories = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    function handleDeleteDeviceCategory(id) {
        dispatch({type: 'start-loading'})
        deleteDeviceCategory(id).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Device categories", "Device category deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("DDevice categories", "Device category cannot delete")
        })

    }

    function deleteDeviceCategoryConfirm(id) {
        confirmModal("Delete device category", "You want delete this?", handleDeleteDeviceCategory, id)
    }

    const headers = {
        name: {
            text: "Name",
            sortable: true,
            filterable: true
        },
        actions: {
            text: 'Actions',
            sortable: false,
            filterable: false,
            transform: (value, idx, row) => (
                <>
                    <Link className="btn btn-primary m-1" to={`/admin/deviceCategories/${row.id}`}>Show</Link>
                    <Link to={`/admin/deviceCategories/edit/${row.id}`} className="btn btn-secondary m-1" style={{ cursor: 'pointer' }}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => deleteDeviceCategoryConfirm(row.id)} style={{ cursor: 'pointer' }}>Delete</button>
                </>
            ),
        },
    };

    const ordered = [
        'name',
        'actions'
    ];

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getDeviceCategories().then((response) => {
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
                <Link className="btn btn-primary float-right" to="/admin/deviceCategories/add">Add device category</Link>
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