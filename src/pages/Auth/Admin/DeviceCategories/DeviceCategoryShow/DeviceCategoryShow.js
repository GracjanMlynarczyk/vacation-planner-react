import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getDeviceCategory} from "../../../../../services/deviceCategoryService";

const DeviceCategoryShow = function () {

    const [deviceCategory, setDeviceCategory] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getDeviceCategory(id).then((response) => {
            setDeviceCategory(response);
            dispatch({ type: 'stop-loading'})
        })
        //eslint-disable-next-line
    }, [id]);

    if (deviceCategory === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-12">
                            <h2>{deviceCategory.name}</h2>
                            {deviceCategory.devices.length > 0 ? (
                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Owner</th>
                                                <th scope="col">Device Status</th>
                                                <th scope="col">Serial</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {deviceCategory.devices.map(device => (
                                                <tr key={device.id}>
                                                    <td>{device.name}</td>
                                                    <td>{`${device.owner.firstName} ${device.owner.lastName}`}</td>
                                                    <td>{device.status.name}</td>
                                                    <td>{device.serial}}</td>
                                                    <td><Link className="btn btn-secondary"
                                                           to={`/admin/devices/edit/${device.id}`}>Edit</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : null }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DeviceCategoryShow;