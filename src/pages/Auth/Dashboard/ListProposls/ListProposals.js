import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {changeStatusProposal, getProposalsToAccept} from "../../../../services/proposalService";
import {createErrorNotifications, createSuccessNotifications} from "../../../../helpers/notificationHelper";
import {Link} from "react-router-dom";
import InfoHolidays from "../../../../components/UI/InfoHolidays/InfoHolidays";
import SmartTable from "../../../../components/UI/SmartTable/SmartTable";
import {waiting} from "../../../../helpers/constants/proposalStatusConstants";

const ListProposals = function () {
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
        getProposalsToAccept().then((response) => {
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
        'user.holidayDay.not_used_days',
        'user.holidayDay.used_days',
        'startDate',
        'endDate',
        'number_of_days',
        'proposalType.name',
        'actions'
    ];


    const handleChangeStatusProposal = function (id, status) {
        dispatch({type: 'start-loading'})
        changeStatusProposal(id, status).then(() => {
            setData((prevState) => prevState.filter((row) => row.id !== id));
            dispatch({type: 'stop-loading'})
            createSuccessNotifications("Proposals", "Proposal status changed");
        }).catch(() => {
            dispatch({type: 'stop-loading'})
            createErrorNotifications("Proposals", "Proposal cannot change status")
        })
    };



    const headers = {
        userProposal: {
            text: 'User',
            sortable: true,
            filterable: true,
            transform: (value, idx, row) => `${row['user.firstName']} ${row['user.lastName']}`
        },
        'user.holidayDay.not_used_days': {
            text: 'Not used days',
            sortable: true,
            filterable: true
        },
        'user.holidayDay.used_days': {
            text: 'Used days',
            sortable: true,
            filterable: true
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
                            <button className="btn btn-secondary m-1" onClick={() => handleChangeStatusProposal(row.id, 'Accepted')} style={{ cursor: 'pointer' }}>Accept</button>
                            <button className="btn btn-warning m-1" onClick={() => handleChangeStatusProposal(row.id, 'Rejected')} style={{ cursor: 'pointer' }}>Reject</button>
                        </>
                    ) : null}
                </>
            )
        },
    }

    return (
        <div className="container-fluid">
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

export default ListProposals;