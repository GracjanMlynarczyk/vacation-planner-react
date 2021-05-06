import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getAllProposals} from "../../../../services/proposalService";
import {Link} from "react-router-dom";
import SmartTable from "../../../../components/UI/SmartTable/SmartTable";

const ShowAllProposals = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({type: 'start-loading'})
        getAllProposals().then((response) => {
            setData(response);
            dispatch({type: 'stop-loading'})
        });

        return () => {
            setData([]);
        }

        // eslint-disable-next-line
    },[]);

    const ordered = [
        'userProposal',
        'proposalStatus.name',
        'acceptedByProposal',
        'startDate',
        'endDate',
        'user.department.name',
        'proposalType.name',
        'actions'
    ];

    const headers = {
        userProposal: {
            text: 'User',
            sortable: true,
            filterable: true,
            transform: (value, idx, row) => `${row['user.firstName']} ${row['user.lastName']}`
        },
        'proposalStatus.name': {
            text: 'Proposal status',
            sortable: true,
            filterable: true
        },
        acceptedByProposal: {
            text: 'Accepted by',
            sortable: true,
            filterable: true,
            transform: (value, idx, row) => row.acceptedBy !== null ? `${row['acceptedBy.firstName']} ${row['acceptedBy.lastName']}` : null
        },
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
        'user.department.name': {
            text: 'Department',
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
                </>
            )
        },
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
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

export default ShowAllProposals;