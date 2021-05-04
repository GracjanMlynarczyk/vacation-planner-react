import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {deletePosition, getPositions} from "../../../../services/positionService";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {confirmModal} from "../../../../helpers/confirmModal";

const Positions = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();


    function handleDeletePosition(id) {
        dispatch({type: 'start-loading'})
        deletePosition(id).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Position", "Position deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("Position", "Position cannot delete")
        })

    }

    function deleteDepartmentConfirm(id) {
        confirmModal("Delete position", "You want delete this?", handleDeletePosition, id)
    }

    const headers = {
        name: {
            text: "Name",
            sortable: true,
            filterable: true
        },
        holidays_days: {
            text: "Holidays days",
            sortable: true,
            filterable: true
        },
        can_accept_proposals: {
            text: "Can accept proposals",
            sortable: true,
            filterable: true
        },
        actions: {
            text: 'Actions',
            sortable: false,
            filterable: false,
            transform: (value, idx, row) => (
                <>
                    <Link to={`/admin/positions/${row.id}`} className="btn btn-primary m-1" style={{ cursor: 'pointer' }}>Show</Link>
                    <Link to={`/admin/positions/edit/${row.id}`} className="btn btn-secondary m-1" style={{ cursor: 'pointer' }}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => deleteDepartmentConfirm(row.id)} style={{ cursor: 'pointer' }}>Delete</button>
                </>
            ),
        },
    };



    const ordered = [
        'name',
        'holidays_days',
        'can_accept_proposals',
        'actions'
    ];

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getPositions().then((response) => {
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
                <Link className="btn btn-primary float-right" to="/admin/positions/add">Add position</Link>
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

export default Positions;