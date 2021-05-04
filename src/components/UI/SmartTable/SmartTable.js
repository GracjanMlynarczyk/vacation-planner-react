import SmartDataTable from "react-smart-data-table";
import 'react-smart-data-table/dist/react-smart-data-table.css';
import React, { useState } from "react";

const SmartTable = function (props) {
    const [filterValue, setFilterValue] = useState('');
    const [perPage, setPerPage] = useState(0);

    const emptyTable = (
        <div>
            There is no data available to display.
        </div>
    )

    function handleOnChange(e) {
        setFilterValue(e.target.value);
    }

    function handlePerPageChange(e) {
        setPerPage(parseInt(e.target.value));
    }

    return (
        <div>
            <div className="form-row mb-1">
                <div className="col-md-8">
                    <input
                        className="form-control"
                        type="text"
                        name="filterValue"
                        value={filterValue}
                        placeholder="Filter results..."
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="perPage"
                        value={perPage}
                        className="form-control"
                        onChange={(e) => handlePerPageChange(e)}>
                            <option value="0">Per Page</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                    </select>
                </div>


            </div>
            <div className="table-responsive">
                <SmartDataTable
                    data={props.data}
                    headers={props.headers}
                    className="table"
                    filterValue={filterValue}
                    perPage={perPage}
                    sortable
                    withHeader
                    hideUnordered={true}
                    orderedHeaders={props.ordered}
                    parseBool={{
                        yesWord: <span className="badge badge-success">Yes</span>,
                        noWord: <span className="badge badge-danger">No</span>,
                    }}
                    emptyTable={emptyTable}
                />
            </div>
        </div>
    );

}

export default SmartTable;