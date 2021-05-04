import useUser from "../../../../hooks/useUser";
import {useEffect, useState} from "react";
import {getUser} from "../../../../services/userService";
import {useDispatch} from "react-redux";
import InfoHolidays from "../../../../components/UI/InfoHolidays/InfoHolidays";

const UserPanel = function () {

    const [authUser] = useUser();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [status] = useState({
        accept: 5,
        reject: 5,
        waiting: 4,
        days_per_year: 10,
        not_used_days: 10,
        used_days: 10
    });

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getUser(authUser.id).then(response => {
            setUser(response)
            dispatch({ type: 'stop-loading'})
        })
        // eslint-disable-next-line
    }, [])

    if (user === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <InfoHolidays status={status} />
                    <div className="row">
                        <div className="col-md-12">
                            <h2>User panel</h2>
                            <div className="container">
                                <div className="row">
                                    <div className="table-responsive">
                                        <span>User data:</span>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">First name</th>
                                                <th scope="col">Last name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Position</th>
                                                <th scope="col">Birthday</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    {user.firstName}
                                                </td>
                                                <td>
                                                    {user.lastName}
                                                </td>
                                                <td>
                                                    {user.email}
                                                </td>
                                                <td>
                                                    {user.position.name}
                                                </td>
                                                <td>
                                                    {user.birthday}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span>User devices:</span>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Serial</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {user.devices.map( device => (
                                                <tr key={device.id}>
                                                    <td>
                                                        {device.name}
                                                    </td>
                                                    <td>
                                                        {device.category.name}
                                                    </td>
                                                    <td>
                                                        {device.status.name}
                                                    </td>
                                                    <td>
                                                        {device.serial}
                                                    </td>

                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPanel;