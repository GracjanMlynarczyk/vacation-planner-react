import {useState} from "react";
import DatePickerField from "../../../../../components/UI/DatePickerField/DatePickerField";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {addFreeDay} from "../../../../../services/freeDayService";

const FreeDayAdd = function () {

    const [data] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        date: Yup.string().required('Date is required'),
        repeatable: Yup.boolean()
    });

    const onSubmit = function (values) {
        dispatch({ type: 'start-loading'})
        addFreeDay(values).then(() => {
            dispatch({ type: 'stop-loading'})
            createSuccessNotifications('Free days', 'Free day added');
            history.push('/admin/freeDays');
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
            createErrorNotifications('Free days', 'Free day cannot add')
        })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>Add free day</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={data ?? {
                            date: "",
                            repeatable: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => onSubmit(values)}>
                        {({ errors, touched,isValid, dirty}) => (
                            <Form>

                                <div className="form-group row">
                                    <label htmlFor="date" className="col-md-4 col-form-label text-md-right">Date</label>

                                    <div className="col-md-6">
                                        <DatePickerField id="date" name="date" className={`form-control ${
                                            errors.date && touched.date ? "is-invalid" : ""
                                        }`} required />
                                        {errors.date && touched.date ? (
                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.date}</strong>
                                                </span>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 offset-4">
                                        <div className="custom-control custom-switch">
                                            <Field name="repeatable" type="checkbox" id="repeatable" className={`custom-control-input ${
                                                errors.repeatable && touched.repeatable ? "is-invalid" : ""
                                            }`} />
                                            <label className="custom-control-label" htmlFor="repeatable">Repeatable</label>
                                            {errors.repeatable && touched.repeatable ? (
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.repeatable}</strong>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" disabled={!(isValid && dirty)} className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default FreeDayAdd;