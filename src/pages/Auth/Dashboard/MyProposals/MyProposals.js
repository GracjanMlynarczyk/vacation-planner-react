import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteProposal, getMyProposals} from "../../../../services/proposalService";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {confirmModal} from "../../../../helpers/confirmModal";
import {Link} from "react-router-dom";
import InfoHolidays from "../../../../components/UI/InfoHolidays/InfoHolidays";
import {waiting} from "../../../../helpers/constants/proposalStatusConstants";

const MyProposals = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const [status] = useState({
        accept: 5,
        reject: 5,
        waiting: 4,
        days_per_year: 10,
        not_used_days: 10,
        used_days: 10
    });

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getMyProposals().then((response) => {
            setData(response);
            dispatch({type: 'stop-loading'})
        });

        return () => {
            setData([]);
        }

        // eslint-disable-next-line
    },[]);

    const ordered = [
        'startDate',
        'endDate',
        'proposalStatus.name',
        'number_of_days',
        'proposalType.name',
        'actions'
    ];


    const handleDeleteProposal = function (id) {
        dispatch({type: 'start-loading'})
        deleteProposal(id).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Proposals", "Proposal deleted");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("Proposals", "Proposal cannot delete")
        })

    };

    const deleteProposalConfirm = function (id) {
        confirmModal("Delete proposal", "You want delete this?", handleDeleteProposal, id)
    }


    const headers = {
        startDate: {
            text: 'Start vacation',
            sortable: true,
            filterable: true
        },
        endDate: {
            text: 'Stop vacation',
            sortable: true,
            filterable: true
        },
        'proposalStatus.name': {
            text: 'Proposal status',
            sortable: true,
            filterable: true
        },
        number_of_days: {
            text: 'Number of days',
            sortable: true,
            filterable: true
        },
        'proposalType.name': {
            text: 'Proposal type',
            sortable: true,
            filterable: true
        },
        actions: {
            text: 'Actions',
            sortable: false,
            filterable: false,
            transform: (value, idx, row) => (
                <>
                    <Link to={`/dashboard/proposals/${row.id}`} className="btn btn-primary m-1">Show</Link>
                    {row['proposalStatus.name'] === waiting ? (
                        <>
                            <Link to={`/dashboard/proposals/edit/${row.id}`} className="btn btn-secondary m-1" style={{ cursor: 'pointer' }}>Edit</Link>
                            <button className="btn btn-danger m-1" onClick={() => deleteProposalConfirm(row.id)} style={{ cursor: 'pointer' }}>Delete</button>
                        </>
                    ) : null}
                </>
            )
        },
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <InfoHolidays status={status} />
                    <hr />
                    <SmartTable
                        data={data}
                        headers={headers}
                        ordered={ordered}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyProposals;