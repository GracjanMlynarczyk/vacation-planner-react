import useUser from "../hooks/useUser";
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute(props) {
    const [ user ] = useUser();

    return (user !== null && user.isAdmin) ? <Route {...props} /> : <Redirect to="/" />
}