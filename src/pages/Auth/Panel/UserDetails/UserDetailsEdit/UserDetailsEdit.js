import {useEffect, useState} from "react";
import useUser from "../../../../../hooks/useUser";
import {useDispatch} from "react-redux";
import {editUserDetails, getUserDetails} from "../../../../../services/userService";
import {Field, Form, Formik} from "formik";
import {createSuccessNotifications} from "../../../../../helpers/notificationHelper";
import {useHistory} from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    date: Yup.string().typeError('Date must be string'),
    description: Yup.string().typeError('Date must be string'),
    github: Yup.string().typeError('Date must be string'),
    linkedin: Yup.string().typeError('Date must be string'),
    youtube: Yup.string().typeError('Date must be string'),
    facebook: Yup.string().typeError('Date must be string'),
    instagram: Yup.string().typeError('Date must be string'),
    twitter: Yup.string().typeError('Date must be string'),
    px: Yup.string().typeError('Date must be string'),
    frontend: Yup.string().typeError('Date must be string'),
    backend: Yup.string().typeError('Date must be string'),
    database: Yup.string().typeError('Date must be string'),
    other: Yup.string().typeError('Date must be string'),
});

const UserDetailsEdit = function () {

    const [userDetails, setUserDetails] = useState(null);
    const [initializeData, setInitializeData] = useState(null);
    const [authUser] = useUser();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getUserDetails(authUser.email).then(response => {
            setUserDetails(response.data);
            setInitializeData({
                description: response.data.description,
                github: response.data.social.github,
                linkedin: response.data.social.linkedin,
                youtube: response.data.social.youtube,
                facebook: response.data.social.facebook,
                instagram: response.data.social.instagram,
                twitter: response.data.social.twitter,
                px: response.data.social.px,
                frontend: response.data.stack.frontend.join(),
                backend: response.data.stack.backend.join(),
                database: response.data.stack.database.join(),
                other: response.data.stack.other.join(),
            });
            dispatch({ type: 'stop-loading'})
        }).catch(() => {
            dispatch({ type: 'stop-loading'})
        })

        // eslint-disable-next-line
    }, []);

    if (userDetails === null || initializeData === null) return null

    function onSubmit(values) {
        dispatch({ type: 'start-loading'})
        editUserDetails(values).then(() => {
            dispatch({ type: 'stop-loading'})
            history.push('/dashboard/panel/details');
            createSuccessNotifications('User details', 'User details updated')
        });
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Edit user details</h2>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initializeData}
                                validationSchema={validationSchema}
                                onSubmit={(values) => onSubmit(values)}>
                                {({ errors, touched,isValid, dirty}) => (
                                    <Form>
                                        <h5>General</h5>
                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-md-2 col-form-label text-md-right">Description</label>
                                            <div className="col-md-10">
                                                <Field as="textarea" rows="7" id="description" name="description" className={`form-control ${
                                                    errors.description && touched.description ? "is-invalid" : ""
                                                }`}  />
                                                {errors.description && touched.description ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.description}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <hr />
                                        <h5>Socials</h5>
                                        <div className="form-group row">
                                            <label htmlFor="github" className="col-md-4 col-form-label text-md-right">Github</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="github" name="github" className={`form-control ${
                                                    errors.github && touched.github ? "is-invalid" : ""
                                                }`}  />
                                                {errors.github && touched.github ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.github}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="linkedin" className="col-md-4 col-form-label text-md-right">Linkedin</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="linkedin" name="linkedin" className={`form-control ${
                                                    errors.linkedin && touched.linkedin ? "is-invalid" : ""
                                                }`}  />
                                                {errors.linkedin && touched.linkedin ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.linkedin}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="youtube" className="col-md-4 col-form-label text-md-right">Youtube</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="youtube" name="youtube" className={`form-control ${
                                                    errors.youtube && touched.youtube ? "is-invalid" : ""
                                                }`}  />
                                                {errors.youtube && touched.youtube ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.youtube}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="facebook" className="col-md-4 col-form-label text-md-right">Facebook</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="facebook" name="facebook" className={`form-control ${
                                                    errors.facebook && touched.facebook ? "is-invalid" : ""
                                                }`}  />
                                                {errors.facebook && touched.facebook ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.facebook}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="instagram" className="col-md-4 col-form-label text-md-right">Instagram</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="instagram" name="instagram" className={`form-control ${
                                                    errors.instagram && touched.instagram ? "is-invalid" : ""
                                                }`}  />
                                                {errors.instagram && touched.instagram ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.instagram}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="twitter" className="col-md-4 col-form-label text-md-right">Twitter</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="twitter" name="twitter" className={`form-control ${
                                                    errors.twitter && touched.twitter ? "is-invalid" : ""
                                                }`}  />
                                                {errors.twitter && touched.twitter ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.twitter}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="px" className="col-md-4 col-form-label text-md-right">500px</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="px" name="px" className={`form-control ${
                                                    errors.px && touched.px ? "is-invalid" : ""
                                                }`}  />
                                                {errors.px && touched.px ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.px}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <hr />
                                        <h5>Stack</h5>

                                        <div className="form-group row">
                                            <label htmlFor="frontend" className="col-md-4 col-form-label text-md-right">Frontend</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="frontend" name="frontend" className={`form-control ${
                                                    errors.frontend && touched.frontend ? "is-invalid" : ""
                                                }`}  />
                                                {errors.frontend && touched.frontend ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.frontend}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="backend" className="col-md-4 col-form-label text-md-right">Backend</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="backend" name="backend" className={`form-control ${
                                                    errors.backend && touched.backend ? "is-invalid" : ""
                                                }`}  />
                                                {errors.backend && touched.frontend ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.backend}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="database" className="col-md-4 col-form-label text-md-right">Database</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="database" name="database" className={`form-control ${
                                                    errors.database && touched.database ? "is-invalid" : ""
                                                }`}  />
                                                {errors.database && touched.database ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.database}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="other" className="col-md-4 col-form-label text-md-right">Others</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="other" name="other" className={`form-control ${
                                                    errors.other && touched.other ? "is-invalid" : ""
                                                }`}  />
                                                {errors.other && touched.other ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.other}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" disabled={!(isValid && dirty)} className="btn btn-primary">Update</button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserDetailsEdit;