import {useEffect, useState} from "react";
import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {addProposal, getProposal} from "../../../../../services/proposalService";
import MyProposalForm from "../components/MyProposalForm/MyProposalForm"

const MyProposalAdd = function () {

    const dispatch = useDispatch();
    const history = useHistory();
    const [proposals, setProposals] = useState([]);
    const [initialValues] = useState(null);
    const [status] = useState({
        accept: 5,
        reject: 5,
        waiting: 4,
        days_per_year: 10,
        not_used_days: 10,
        used_days: 10
    });

    const onSubmit = function (values) {
        dispatch({ type: 'start-loading'})
        addProposal(values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Proposal', 'Proposal added');
            history.push('/dashboard/proposals');
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            createErrorNotifications('Proposal', 'Proposal cannot add')
        })
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getProposal().then((response) => {
            setProposals(response);
            dispatch({ type: 'stop-loading'})
        })

        return () => {
            setProposals([]);
        }
        //eslint-disable-next-line
    }, [])

    return (
       <MyProposalForm
           initialValues={initialValues}
           status={status}
           onSubmit={onSubmit}
           textButton="New"
           edited={false}

       />
    );
}

export default MyProposalAdd;