import { useHistory } from 'react-router-dom';
import useUser from "../../hooks/useUser";

const Welcome = function () {
    const [ user ] = useUser();
    const history = useHistory();

    if (user) history.push('/dashboard/proposals')

    return (
        <div className="container mt-5">
            <div className="col-md-12">
                <div className="row">
                    <h1>Welcome to the employee panel</h1>
                </div>

            </div>
        </div>
    );

}

export default Welcome;