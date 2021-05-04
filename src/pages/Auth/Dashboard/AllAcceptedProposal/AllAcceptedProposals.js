import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getAcceptedProposals} from "../../../../services/proposalService";
import SmartTable from "../../../../components/UI/SmartTable/SmartTable";

const AllAcceptedProposals = function () {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'start-loading'})
        getAcceptedProposals().then((response) => {
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
        'userProposal',
        'user.department.name'
    ];


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
        userProposal: {
            text: 'User',
            sortable: true,
            filterable: true,
            transform: (value, idx, row) => `${row['user.firstName']} ${row['user.lastName']}`
        },
        'user.department.name': {
            text: 'Department',
            sortable: true,
            filterable: true
        }
    }

    return (
        <div className="container-fluid">
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

export default AllAcceptedProposals;