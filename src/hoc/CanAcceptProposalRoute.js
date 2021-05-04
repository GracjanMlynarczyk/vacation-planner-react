import useUser from "../hooks/useUser";
import { Route, Redirect } from 'react-router-dom';

export default function CanAcceptProposal(props) {
    const [ user ] = useUser();

    return (user !== null && user.canAcceptProposal) ? <Route {...props} /> : <Redirect to="/" />
}