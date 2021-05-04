import {useEffect, useState} from "react";
import {acceptUser, getUser} from "../../../../../services/userService";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {createErrorNotifications, createSuccessNotifications} from "../../../../../helpers/notificationHelper";

const UsersAccept = function () {

    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object().shape({
        holidays_days: Yup.number().min(0, 'Number days per year cannot less than 0')
            .required('Days per year is required')
            .typeError('Days per year must be an integer'),
    });

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        getUser(id).then((response) => {
            setInitialValues({
                holidays_days: response.position.holidays_days
            })
            setUser(response);
            dispatch({ type: 'stop-loading'})
        })
        //eslint-disable-next-line
    }, [id])

    if (user !== null && user.active === 1) return <Redirect to="/admin/users" />

    if (user === null || initialValues === null) return null



    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>Accept user</h2>

                    <div className="row">
                        <div className="col-md-12">
                            <h4>{`${user.firstName} ${user.lastName}`}</h4>
                            <div className="row">
                                <div className="col-3">Email</div>
                                <div className="col-5">{user.email}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Department</div>
                                <div className="col-5">{user.department.name}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">Position</div>
                                <div className="col-5">{user.position.name}</div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            dispatch({ type: 'start-loading'})
                            acceptUser(id, values).then((response) => {
                                dispatch({ type: 'stop-loading'})
                                createSuccessNotifications('User', 'User accepted');
                                history.push('/admin/users');
                            }).catch(() => {
                                dispatch({ type: 'stop-loading'})
                                createErrorNotifications('User', 'User cannot accept');
                            })
                        }}>
                        {({ errors, touched,isValid, dirty}) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="holidays_days" className="col-form-label text-md-right">Holidays days per year</label>
                                    <Field type="number" min={0} id="holidays_days" name="holidays_days" className={`form-control ${
                                        errors.holidays_days && touched.holidays_days ? "is-invalid" : ""
                                    }`} required />
                                    {errors.holidays_days && touched.holidays_days ? (
                                        <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.holidays_days}</strong>
                                                </span>
                                    ) : null}
                                </div>

                                <div className="form-group mb-0">
                                    <button type="submit" disabled={!(isValid && dirty)} className="btn btn-primary">Accept</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );

}

export default UsersAccept;