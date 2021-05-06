import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import InfoHolidays from "../../../../../../components/UI/InfoHolidays/InfoHolidays";
import DatePickerField from "../../../../../../components/UI/DatePickerField/DatePickerField";
import {useEffect, useState} from "react";
import {getFreeDays} from "../../../../../../services/freeDayService";

const MyProposalForm = function (props) {

    const [freeDays, setFreeDays] = useState([]);
    const [holidays, setHolidays] = useState([]);

    const validationSchema = Yup.object().shape({
        startDate: Yup.string().required('Start date is required'),
        endDate: Yup.string().required('End date is required'),
        proposalTypeId: Yup.string().required('Proposal type is required'),
    });
    const isWeekday = date => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    useEffect(() => {
        getFreeDays().then( response => {
            setFreeDays(response);
            setHolidays([
                new Date(2021,5,7)
            ]);
        })
            //eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="description">{props.textButton} proposal</h1>

                            <InfoHolidays status={props.status}/>

                            <div className="col-md-12">

                                <Formik
                                    enableReinitialize={true}
                                    initialValues={props.initialValues ?? {
                                        startDate: new Date().setDate(new Date().getDate() + 1),
                                        endDate: new Date().setDate(new Date().getDate() + 1),
                                        proposalTypeId: "",
                                        comment: ""
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => props.onSubmit(values)}>

                                    {({errors, touched, isValid, dirty,values}) => (
                                        <Form>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="startDate" className="col-form-label">Start
                                                        date</label>
                                                    <div>
                                                        <DatePickerField id="startDate" name="startDate"
                                                                         className={`form-control ${
                                                                             errors.startDate && touched.startDate ? "is-invalid" : ""}`}
                                                                         required
                                                                         filterDate={isWeekday}
                                                                         excludeDates={holidays}
                                                                         selectsStart
                                                                         startDate={values.startDate}
                                                                         endDate={values.endDate}/>
                                                        {errors.startDate && touched.startDate ? (
                                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.startDate}</strong>
                                                </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="endDate" className="col-form-label">End date</label>

                                                    <div>
                                                        <DatePickerField id="endDate" name="endDate"
                                                                         className={`form-control ${
                                                                             errors.endDate && touched.endDate ? "is-invalid" : ""}`}
                                                                         required
                                                                         filterDate={isWeekday}
                                                                         selectsEnd
                                                                         startDate={values.startDate}
                                                                         endDate={values.endDate}
                                                                         minDate={values.startDate}/>
                                                        {errors.startDate && touched.startDate ? (
                                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.startDate}</strong>
                                                </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="numberOfDays" className="control-label ">Number of
                                                    days:</label>
                                                <span id="numberOfDays" className="val">{props.numberDays}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="proposalTypeId" className="col-form-label">Proposal
                                                    type</label>
                                                <div>
                                                    <Field as="select" id="proposalTypeId" name="proposalTypeId"
                                                           className={`form-control ${
                                                               errors.ownerId && touched.ownerId ? "is-invalid" : ""
                                                           }`} required>
                                                        <option value={""}>Open this select menu</option>
                                                        <option value="1"> Paid</option>
                                                        <option value="2"> Unpaid</option>
                                                        {/*{proposalTypes.map(proposalType => (*/}
                                                        {/*    <option value={proposalType.id}>{proposalType.name}</option>*/}
                                                        {/*))}*/}
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
                                                    <Field as="textarea" rows="7" id="comment" name="comment"
                                                           className={`form-control ${
                                                               errors.comment && touched.comment ? "is-invalid" : ""
                                                           }`}/>
                                                    {errors.comment && touched.comment ? (
                                                        <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.comment}</strong>
                                                </span>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary">{props.textButton}</button>
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

export default MyProposalForm;