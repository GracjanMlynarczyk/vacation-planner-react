const InfoHolidays = function (props) {


    return (
        <div className="alert alert-info">
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-8 align-right">Accept proposal:</div>
                        <div className="col-md-4 bold align-left">{props.status.accept}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-8 align-right">Reject proposal:</div>
                        <div className="col-md-4 bold align-left">{props.status.reject}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-8 align-right">Waiting proposal:</div>
                        <div className="col-md-4 bold align-left">{props.status.waiting}</div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-8 align-right">Holiday days to use yearly:</div>
                        <div className="col-md-4 bold align-left">{props.status.days_per_year ?? 0}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-8 align-right">Unused holiday days:</div>
                        <div className="col-md-4 bold align-left">{props.status.not_used_days}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-8 align-right">Used holiday days:</div>
                        <div className="col-md-4 bold align-left">{props.status.used_days}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InfoHolidays;