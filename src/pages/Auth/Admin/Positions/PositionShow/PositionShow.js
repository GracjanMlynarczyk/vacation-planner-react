import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getPosition} from "../../../../../services/positionService";

const PositionShow = function () {

    const [position, setPosition] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getPosition(id).then((response) => {
            setPosition(response);
            dispatch({ type: 'stop-loading'})
        })
        //eslint-disable-next-line
    }, [id]);

    if (position === null) return null

    return (

        <div className="container">
            <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-12">
                            <h2>{position.name}</h2>
                            <div className="row">
                                <div className="col-3">Holidays Days</div>
                                <div className="col-3">{position.holidays_days}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Can accept proposal</div>
                                <div className="col-3">
                                    {position.can_accept_proposal ? <span className="badge badge-success">Yes</span> : <span className="badge badge-danger">No</span>}
                                </div>
                            </div>
                            <hr />
                            {position.users.length > 0 ? (
                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">FirstName</th>
                                                <th scope="col">LastName</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Department</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {position.users.map(user => (
                                                <tr key={id}>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.department.name}</td>
                                                </tr>
                                            ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PositionShow;