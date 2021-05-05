import InfoHolidays from "../../../../../components/UI/InfoHolidays/InfoHolidays";
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import DatePickerField from "../../../../../components/UI/DatePickerField/DatePickerField";

const MyProposalAdd = function () {

    const [proposalTypes] = useState([]);
    const [initialValues] = useState(null);
    const [numberDays] = useState(0);
    const [status] = useState({
        accept: 5,
        reject: 5,
        waiting: 4,
        days_per_year: 10,
        not_used_days: 10,
        used_days: 10
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="description">New proposal</h1>

                            <InfoHolidays status={status}/>

                            <div className="col-md-12">

                                <Formik
                                    enableReinitialize={true}
                                    initialValues={initialValues ?? {
                                        startDate: "",
                                        endDate: "",
                                        proposalTypeId: "",
                                        comment: ""

                                    }}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}>
                                    {({ errors, touched,isValid, dirty}) => (
                                        <Form>

                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="startDate" className="col-form-label">Start date</label>

                                                    <div className="col-md-6">
                                                        <DatePickerField id="startDate" name="startDate" className={`form-control ${
                                                            errors.startDate && touched.startDate ? "is-invalid" : ""}`} />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="endDate" className="col-form-label">End date</label>

                                                    <div className="col-md-6">
                                                        <DatePickerField id="endDate" name="endDate" className={`form-control ${
                                                            errors.endDate && touched.endDate ? "is-invalid" : ""}`} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="numberOfDays" className="control-label ">Number of days:</label>
                                                <span id="numberOfDays" className="val">{numberDays}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="proposalTypeId" className="col-form-label">Proposal type</label>
                                                <div>
                                                    <Field as="select" id="proposalTypeId" name="proposalTypeId" className={`form-control ${
                                                        errors.ownerId && touched.ownerId ? "is-invalid" : ""
                                                    }`} required>
                                                        <option value={""}>Open this select menu</option>
                                                        {proposalTypes.map(proposalType => (
                                                            <option value={proposalType.id}>{proposalType.name}</option>
                                                        ))}
                                                    </Field>
                                                    {errors.ownerId && touched.ownerId ? (
                                                        <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.ownerId}</strong>
                                                </span>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="comment" className="col-form-label">Comment</label>
                                                <div>
                                                    <Field as="textarea" rows="7" id="comment" name="comment" className={`form-control ${
                                                        errors.comment && touched.comment ? "is-invalid" : ""
                                                    }`}  />
                                                    {errors.comment && touched.comment ? (
                                                        <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.comment}</strong>
                                                </span>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" disabled={!(isValid && dirty)} className="btn btn-primary">Create proposal</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProposalAdd;