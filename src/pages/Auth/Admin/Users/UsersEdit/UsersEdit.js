import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import { getDepartments } from '../../../../../services/departmentService';
import { getPositions } from '../../../../../services/positionService';
import { getUser, editUser } from '../../../../../services/userService';
import { useHistory } from 'react-router-dom';
import { createErrorNotifications, createSuccessNotifications } from '../../../../../helpers/notificationHelper'
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
    department_id: Yup.number().required('Department is required').typeError('Invalid department'),
    position_id: Yup.number().required('Position is required').typeError('Invalid position'),
    is_admin: Yup.boolean().typeError('Invalid is admin'),
    days_per_year: Yup.number().min(0, 'Number days per year cannot less than 0')
        .required('Days per year is required')
        .typeError('Days per year must be an integer'),
    holidayDay: Yup.object().shape({
        not_used_days: Yup.number().min(0, 'Not used days per year cannot less than 0')
            .required('Not used days per year is required')
            .typeError('Not used days per year must be an integer')
    })
});

const UsersEdit = function () {

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [ departments, setDepartments ] = useState([]);
    const [ positions, setPositions ] = useState([]);
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        dispatch({ type: 'start-loading'})

        Promise.all([
            getDepartments(),
            getPositions(),
            getUser(id)
        ]).then(([departments, positions, user]) => {
            setDepartments(departments);
            setPositions(positions);
            setInitialValues(user);
            dispatch({ type: 'stop-loading'})
        });

        return () => {
            setDepartments([]);
            setPositions([]);
            setInitialValues({});
        }

        //eslint-disable-next-line
    }, [id])

    if (initialValues === null) return null

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>Edit user</h2>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                dispatch({ type: 'start-loading'});
                                editUser(id, values).then(() => {
                                    dispatch({ type: 'stop-loading'})
                                    createSuccessNotifications('User', 'User edited');
                                    history.push('/admin/users');
                                }).catch((e) => {
                                    dispatch({ type: 'stop-loading'})
                                    createErrorNotifications('User', 'User cannot edit');
                                });
                            }}>
                            {({ errors, touched,isValid}) => (
                                <Form>
                                    <div className="form-group row">
                                        <label htmlFor="firstName" className="col-md-4 col-form-label text-md-right">First name</label>

                                        <div className="col-md-6">
                                            <Field type="text" id="firstName" className={`form-control`} name="firstName" readOnly />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="lastName" className="col-md-4 col-form-label text-md-right">Last name</label>

                                        <div className="col-md-6">
                                            <Field type="text" id="lastName" className="form-control" name="lastName" readOnly />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>

                                        <div className="col-md-6">
                                            <Field type="email" id="email" className="form-control" name="email" readOnly />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="position_id" className="col-md-4 col-form-label text-md-right">Position</label>
                                        <div className="col-md-6">
                                            <Field as="select" id="position_id" name="position_id" className={`form-control ${
                                                errors.position_id && touched.position_id ? "is-invalid" : ""
                                            }`} required>
                                                <option value={null}>Open this select menu</option>
                                                {positions.map(position => (<option key={position.id} value={position.id}>{position.name}</option>) )}
                                            </Field>
                                            {errors.position_id && touched.position_id ? (
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.position_id}</strong>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="department_id" className="col-md-4 col-form-label text-md-right">Department</label>
                                        <div className="col-md-6">
                                            <Field as="select" id="department_id" name="department_id" className={`form-control ${
                                                errors.department_id && touched.department_id ? "is-invalid" : ""
                                            }`} required>
                                                <option value={null}>Open this select menu</option>
                                                {departments.map(department => (<option key={department.id} value={department.id}>{department.name}</option>) )}
                                            </Field>
                                            {errors.department_id && touched.department_id ? (
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.department_id}</strong>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-4">
                                            <div className="custom-control custom-switch">
                                                <Field name="is_admin" type="checkbox" id="customSwitch1" className={`custom-control-input ${
                                                    errors.is_admin && touched.is_admin ? "is-invalid" : ""
                                                }`} />
                                                <label className="custom-control-label" htmlFor="customSwitch1">Is Admin</label>
                                                {errors.is_admin && touched.is_admin ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.is_admin}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="days_per_year" className="col-md-4 col-form-label text-md-right">Days per year</label>
                                        <div className="col-md-6">
                                            <Field type="number" min={0} id="days_per_year" name="days_per_year" className={`form-control ${
                                                errors.days_per_year && touched.days_per_year ? "is-invalid" : ""
                                            }`} required />
                                            {errors.days_per_year && touched.days_per_year ? (
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.days_per_year}</strong>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="form-group row">
                                        <label htmlFor="holidayDay.used_days" className="col-md-4 col-form-label text-md-right">Used days</label>
                                        <div className="col-md-6">
                                            <Field type="number" min={0} id="holidayDay.used_days" className="form-control" name="holidayDay.used_days" readOnly />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="holidayDay.not_used_days" className="col-md-4 col-form-label text-md-right">Not used days</label>
                                        <div className="col-md-6">
                                            <Field type="number" min={0} id="holidayDay.not_used_days" name="holidayDay.not_used_days" className={`form-control ${
                                                errors.holidayDay && touched.holidayDay ? "is-invalid" : ""
                                            }`} required />
                                            {errors.holidayDay && touched.holidayDay ? (
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.holidayDay.not_used_days}</strong>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" disabled={!isValid} className="btn btn-primary">Update</button>
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

export default UsersEdit;