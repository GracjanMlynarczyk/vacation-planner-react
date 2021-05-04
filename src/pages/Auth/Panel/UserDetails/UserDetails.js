import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserDetails} from "../../../../services/userService";
import useUser from "../../../../hooks/useUser";
import {useDispatch} from "react-redux";

const UserDetails = function () {

    const [userDetails, setUserDetails] = useState(null);
    const [authUser] = useUser();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getUserDetails(authUser.email).then(response => {
            setUserDetails(response.data);
            dispatch({ type: 'stop-loading'})
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            history.push('/');
        })
        // eslint-disable-next-line
    }, []);

    if (userDetails === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <Link className="btn btn-secondary float-right" to="/dashboard/panel/details/edit">Edit</Link>
                            <h2>User details</h2>
                            <div className="row">
                                <div className="col-md-3 font-weight-bold">General:</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Description:</div>
                                <div className="col-md-9">{userDetails.description }</div>
                                <hr/>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-3 font-weight-bold">Socials</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Github</div>
                                <div className="col-md-3">{ userDetails.social.github }</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Linkedin</div>
                                <div className="col-md-3">{ userDetails.social.linkedin }</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Youtube</div>
                                <div className="col-md-3">{ userDetails.social.youtube }</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Facebook</div>
                                <div className="col-md-3">{ userDetails.social.facebook }</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Instagram</div>
                                <div className="col-md-3">{ userDetails.social.instagram }</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">Twitter</div>
                                <div className="col-md-3">{ userDetails.social.twitter }</div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">500px</div>
                                <div className="col-md-3">{ userDetails.social.px }</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-3 font-weight-bold">Stack:</div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-3">Frontend</div>
                                <div className="col-md-3">
                                    <ul className="list-group">
                                        {userDetails.stack.frontend.map(frontend => (
                                            <li key={frontend} className="list-group-item">{frontend}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-3">Backend</div>
                                <div className="col-md-3">
                                    <ul className="list-group">
                                        {userDetails.stack.backend.map(backend => (
                                            <li key={backend} className="list-group-item">{backend}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-3 ">Database</div>
                                <div className="col-md-3">
                                    <ul className="list-group">
                                        {userDetails.stack.database.map(database => (
                                            <li key={database} className="list-group-item">{database}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-3">Other</div>
                                <div className="col-md-3">
                                    <ul className="list-group">
                                        {userDetails.stack.other.map(other => (
                                            <li key={other} className="list-group-item">{other}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;