import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getDepartment} from "../../../../../services/departmentService";
import {useDispatch} from "react-redux";

const DepartmentShow = function () {

    const [department, setDepartment] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getDepartment(id).then((response) => {
            setDepartment(response);
            dispatch({ type: 'stop-loading'})
        })
        //eslint-disable-next-line
    }, [id]);

    if (department === null) return null

    return (

        <div className="container">
            <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-12">
                            <h2>{department.name}</h2>
                            <div className="row">
                                <div className="col-3">Team Leader</div>
                                <div
                                    className="col-3">{`${department.owner.firstName} ${department.owner.lastName}`}</div>
                            </div>
                            <hr />
                                {department.users.length > 0 ? (
                                    <div className="row">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">FirstName</th>
                                                    <th scope="col">LastName</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Position</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {department.users.map(user => (
                                                    <tr key={user.id}>
                                                        <td>{user.firstName}</td>
                                                        <td>{user.lastName}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.position.name}</td>
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

export default DepartmentShow;