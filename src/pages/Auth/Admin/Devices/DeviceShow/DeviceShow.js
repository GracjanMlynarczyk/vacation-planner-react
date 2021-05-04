import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getDevice} from "../../../../../services/deviceService";

const DeviceShow = function () {

    const [device, setDevice] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getDevice(id).then((response) => {
            setDevice(response);
            dispatch({ type: 'stop-loading'})
        })
        //eslint-disable-next-line
    }, [id]);

    if (device === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-12">
                            <h2>{device.name}</h2>
                            <div className="row">
                                <div className="col-3">Owner</div>
                                <div
                                    className="col-3">{ device.owner !== null ? `${device.owner.firstName} ${device.owner.lastName}` : null }</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Serial</div>
                                <div className="col-3">{device.serial}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Status</div>
                                <div className="col-3">{device.status.name}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Category</div>
                                <div className="col-3">{device.category.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DeviceShow;