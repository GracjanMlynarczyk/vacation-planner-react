import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const DeviceForm = function (props) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        serial: Yup.string().required('Serial is required'),
        device_category_id: Yup.number().required('Device category is required').typeError('Invalid device category')
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>{props.textButton} device</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={props.initialValues ?? {
                            name: "",
                            serial: "",
                            device_category_id: ""
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
                                    <label htmlFor="serial" className="col-md-4 col-form-label text-md-right">Serial</label>

                                    <div className="col-md-6">
                                        <Field type="text" id="serial" name="serial" className={`form-control ${
                                            errors.serial && touched.serial ? "is-invalid" : ""
                                        }`} required />
                                        {errors.serial && touched.serial ? (
                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.serial}</strong>
                                                </span>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="device_category_id" className="col-md-4 col-form-label text-md-right">Device category</label>
                                    <div className="col-md-6">
                                        <Field as="select" id="device_category_id" name="device_category_id" className={`form-control ${
                                            errors.device_category_id && touched.device_category_id ? "is-invalid" : ""
                                        }`} required>
                                            <option value={""}>Open this select menu</option>
                                            {props.categories ? (props.categories.map(category => (<option key={category.id} value={category.id}>{`${category.name}`}</option>))) : null }
                                        </Field>
                                        {errors.device_category_id && touched.device_category_id ? (
                                            <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.device_category_id}</strong>
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

export default DeviceForm;