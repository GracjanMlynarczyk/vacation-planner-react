import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const DepartmentForm = function (props) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Department is required'),
        ownerId: Yup.number().required('Department leader is required').typeError('Invalid department leader')
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>{props.textButton} department</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={props.initialValues ?? {
                            name: "",
                            ownerId: "",
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
                                    <label htmlFor="ownerId" className="col-md-4 col-form-label text-md-right">Department leader</label>
                                    <div className="col-md-6">
                                        <Field as="select" id="ownerId" name="ownerId" className={`form-control ${
                                            errors.ownerId && touched.ownerId ? "is-invalid" : ""
                                        }`} required>
                                            <option value={""}>Open this select menu</option>
                                            {props.users ? (props.users.map(user => (<option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>))) : null }
                                        </Field>
                                        {errors.ownerId && touched.ownerId ? (
                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.ownerId}</strong>
                                                </span>
                                        ) : null}
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

export default DepartmentForm;