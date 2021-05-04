import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const PositionForm = function (props) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Position is required'),
        holidays_days: Yup.number().min(0, 'Number days per year cannot less than 0')
            .required('Days per year is required')
            .typeError('Days per year must be an integer'),
        can_accept_proposals: Yup.boolean().typeError('Must be boolean')
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>{props.textButton} position</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={props.initialValues ?? {
                            name: "",
                            holidays_days: "",
                            can_accept_proposals: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => props.onSubmit(values)}>
                        {({ errors, touched,isValid, dirty}) => (
                            <Form>
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                    <div className="col-md-6">
                                        <Field type="text" id="name" name="name" className={`form-control ${
                                            errors.name && touched.name ? "is-invalid" : ""
                                        }`} required />
                                        {errors.name && touched.name ? (
                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.name}</strong>
                                                </span>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="holidays_days" className="col-md-4 col-form-label text-md-right">Holidays days</label>
                                    <div className="col-md-6">
                                        <Field type="number" min={0} id="holidays_days" name="holidays_days" className={`form-control ${
                                            errors.holidays_days && touched.holidays_days ? "is-invalid" : ""
                                        }`} required />
                                        {errors.holidays_days && touched.holidays_days ? (
                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.holidays_days}</strong>
                                                </span>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 offset-4">
                                        <div className="custom-control custom-switch">
                                            <Field name="can_accept_proposals" type="checkbox" id="customSwitch1" className={`custom-control-input ${
                                                errors.can_accept_proposals && touched.can_accept_proposals ? "is-invalid" : ""
                                            }`} />
                                            <label className="custom-control-label" htmlFor="customSwitch1">Can accept proposals</label>
                                            {errors.can_accept_proposals && touched.can_accept_proposals ? (
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.can_accept_proposals}</strong>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" disabled={!(isValid && dirty) && !props.edited} className="btn btn-primary">{props.textButton}</button>
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

export default PositionForm;