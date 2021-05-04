import useUser from "../hooks/useUser";
import { Route, Redirect } from 'react-router-dom';

export default function CanShowAllProposals(props) {
    const [ user ] = useUser();

    return (user !== null && user.canShowAllProposals) ? <Route {...props} /> : <Redirect to="/" />
}