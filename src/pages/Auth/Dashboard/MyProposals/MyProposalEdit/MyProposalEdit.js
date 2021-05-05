import {useEffect, useState} from "react";
import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {editProposal, getProposal} from "../../../../../services/proposalService";
import MyProposalForm from "../components/MyProposalForm/MyProposalForm"

const MyProposalEdit = function () {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [initialValues, setInitialValues] = useState(null);
    const [status] = useState({
        accept: 5,
        reject: 5,
        waiting: 4,
        days_per_year: 10,
        not_used_days: 10,
        used_days: 10
    });

    const onSubmit = (values) => {
        dispatch({ type: 'start-loading'})
        editProposal(id,values).then(() => {
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
        Promise.all([
            getProposal(id)
        ]).then(([proposal]) => {
            setInitialValues({
                startDate: Date.parse(proposal.startDate),
                endDate: Date.parse(proposal.endDate),
                proposalTypeId: proposal.proposalType.id,
                comment: proposal.comment,
            });
            dispatch({ type: 'stop-loading'})
        });

        return () => {
            setInitialValues({});
        }
        //eslint-disable-next-line
    }, [])

    if (initialValues === null) return null

    return (
        <MyProposalForm
            initialValues={initialValues}
            status={status}
            onSubmit={onSubmit}
            textButton="Edit"
        />
    );
}

export default MyProposalEdit;