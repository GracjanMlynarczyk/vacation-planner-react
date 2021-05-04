import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getFreeDays} from "../../../../services/freeDayService";
import {confirmModal} from "../../../../helpers/confirmModal";
import {deleteUser} from "../../../../services/userService";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";

const FreeDays = function () {

    const [freeDays, setFreeDays] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getFreeDays().then((response) => {
            setFreeDays(response);
            dispatch({type: 'stop-loading'})
        });

        return () => {
            setFreeDays([]);
        }

        // eslint-disable-next-line
    },[]);

    const handleDeleteFreeDay = function (id) {
        dispatch({type: 'start-loading'})
        deleteUser(id).then(() => {
            setFreeDays((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Free days", "Free day deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("Free days", "Free day cannot delete")
        })

    };

    function deleteFreeDayConfirm(id) {
        confirmModal("Delete free day", "You want delete this?", handleDeleteFreeDay, id)
    }

    return (
            <div className="card">
                <div className="card-header">
                    <Link to="/admin/freeDays/add" className="btn btn-primary float-right">Add free day</Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Day</th>
                                <th scope="col">Month</th>
                                <th scope="col">Year</th>
                                <th scope="col">Repeatable</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {freeDays.map(freeDay => (
                                <tr key={freeDay.id}>
                                    <td>{freeDay.day}</td>
                                    <td>{freeDay.month}</td>
                                    <td>{freeDay.year}</td>
                                    <td>{freeDay.repeatable ? <span className="badge badge-success">Yes</span> : <span className="badge badge-danger">No</span>}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger m-1" onClick={() => deleteFreeDayConfirm(freeDay.id)} style={{ cursor: 'pointer' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}

export default FreeDays;