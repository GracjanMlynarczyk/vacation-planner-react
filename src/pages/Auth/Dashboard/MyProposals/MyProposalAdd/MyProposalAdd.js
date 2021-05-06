import {useEffect, useState} from "react";
import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {addProposal, getProposalTypes} from "../../../../../services/proposalService";
import MyProposalForm from "../components/MyProposalForm/MyProposalForm"

const MyProposalAdd = function () {

    const dispatch = useDispatch();
    const history = useHistory();
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

    return (
       <MyProposalForm
           status={status}
           onSubmit={onSubmit}
           textButton="Add"
       />
    );
}

export default MyProposalAdd;