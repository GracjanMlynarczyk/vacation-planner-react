import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getProposal} from "../../../../../services/proposalService";

const MyProposalShow = function () {

    const [proposal, setProposal] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getProposal(id).then((response) => {
            setProposal(response);
            dispatch({ type: 'stop-loading'})
        })
        //eslint-disable-next-line
    }, [id]);

    if (proposal === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Proposal</h4>
                            <div className="container">
                                <div className="row">
                                    <div className="table-responsive">
                                        Vacation start
                                        <table className="table">
                                            <td>
                                                {proposal.startDate}
                                            </td>
                                        </table>
                                        Vacation end
                                        <table className="table">
                                            <td>
                                                {proposal.endDate}
                                            </td>
                                        </table>
                                        Number of days
                                        <table className="table">
                                            <td>
                                                {proposal.number_of_days}
                                            </td>
                                        </table>
                                        Comment
                                        <table className="table">
                                            <td>
                                                {proposal.comment}
                                            </td>
                                        </table>
                                        Proposal type
                                        <table className="table">
                                            <td>
                                                {proposal.proposalType.name}
                                            </td>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProposalShow;