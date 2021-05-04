import useUser from "../hooks/useUser";
import { Route, Redirect } from 'react-router-dom';

export default function AuthenticatedRoute(props) {
    const [ user ] = useUser();

    return (user) ? <Route {...props} /> : <Redirect to="/" />
}