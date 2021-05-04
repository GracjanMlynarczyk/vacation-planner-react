import {useEffect, useState} from "react";
import {getUser} from "../../../../../services/userService";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

const UsersShow = function () {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    useEffect(() => {
        dispatch({ type: 'start-loading'})

        getUser(id).then((response) => {
            setUser(response);
            dispatch({ type: 'stop-loading'})
        })

        //eslint-disable-next-line
    }, [id])

    if(user === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-12">
                            <h2>{`${user.firstName} ${user.lastName}`}</h2>
                            <div className="row">
                                <div className="col-3">Email</div>
                                <div className="col-3">{user.email}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Department</div>
                                <div className="col-3">{user.department.name}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Position</div>
                                <div className="col-3">{user.position.name}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Holidays days per year</div>
                                <div className="col-3">{user.days_per_year}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Is Admin</div>
                                <div className="col-3">
                                    {user.is_admin ? <span className="badge badge-success">Yes</span> : <span className="badge badge-danger">No</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">Beginning of employment</div>
                                <div className="col-3">{user.beginning_of_employment}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Birthday</div>
                                <div className="col-3">{user.birthday}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-3">Used days</div>
                                <div className="col-3">{user.holidayDay.used_days}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Not used days</div>
                                <div className="col-3">{user.holidayDay.not_used_days}</div>
                            </div>
                            <hr />
                            {user.devices.length > 0 ? (
                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Device Category</th>
                                                <th scope="col">Device Status</th>
                                                <th scope="col">Serial</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {user.devices.map(device => (
                                                <tr key={device.id}>
                                                    <td>{device.name}</td>
                                                    <td>{device.category.name}</td>
                                                    <td>{device.status.name}</td>
                                                    <td>{device.serial}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersShow;
