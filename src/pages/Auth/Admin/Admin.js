import {NavLink, useHistory, useLocation} from "react-router-dom";
import { Switch } from 'react-router-dom';
import AdminRoute from "../../../hoc/AdminRoute";
import Users from "./Users/Users";
import Departments from "./Departments/Departments";
import {useEffect} from "react";
import Positions from "./Positions/Positions";
import DeviceCategories from "./DeviceCategories/DeviceCategories";
import Devices from "./Devices/Devices";
import FreeDays from "./FreeDays/FreeDays";

const Admin = function () {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/admin") {
            history.push("/admin/users");
        } else {
            history.push(location.pathname);
        }

        // eslint-disable-next-line
    }, []);

    return (
        <>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/users">Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/departments">Departments</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/positions">Positions</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/deviceCategories">Device Categories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/devices">Devices</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/freeDays">Free days</NavLink>
                    </li>
                </ul>

            <Switch>

                <AdminRoute path="/admin/departments">
                    <Departments />
                </AdminRoute>
                <AdminRoute path="/admin/users">
                    <Users />
                </AdminRoute>
                <AdminRoute path="/admin/positions">
                    <Positions />
                </AdminRoute>
                <AdminRoute path="/admin/deviceCategories">
                    <DeviceCategories />
                </AdminRoute>
                <AdminRoute path="/admin/devices">
                    <Devices />
                </AdminRoute>
                <AdminRoute path="/admin/freeDays">
                    <FreeDays />
                </AdminRoute>

            </Switch>
        </>
    );

}

export default Admin;