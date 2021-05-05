import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {registerUser} from "../../services/userService";
import {useDispatch} from "react-redux";
import {getDepartments} from "../../services/departmentService";
import {getPositions} from "../../services/positionService";
import DatePickerField from "../../components/UI/DatePickerField/DatePickerField";
import useUser from "../../hooks/useUser";
import {Redirect} from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    departmentId: Yup.number().required('Department is required').typeError('Invalid department'),
    positionId: Yup.number().required('Position is required').typeError('Invalid position'),
});

const Register = function () {

    const [initializeData, setInitializeData] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [positions, setPositions] = useState(null);
    const dispatch = useDispatch();
    const [user, setUser] = useUser(null);

    function onSubmit(values) {
        dispatch({ type: 'start-loading'})
        registerUser(values).then(() => {
            dispatch({ type: 'stop-loading'})
            setUser("dfsdfsdf");
        });
    }

    useEffect(() => {
        dispatch({ type: 'start-loading'})
        Promise.all([
            getDepartments(),
            getPositions()
        ]).then(([departments, positions]) => {
            setDepartments(departments);
            setPositions(positions);
            setInitializeData({
                firstName: "Gracjan",
                lastName: "Młynarczyk",
                email: "gracjan.mlynarczyk@codetain.com",
                positionId: "",
                departmentId: "",
                beginningOfEmployment: "",
                birthday: "",
                socialId: "sasdfasfasfasdfsdf"
            })
            dispatch({ type: 'stop-loading'})
        })
        // eslint-disable-next-line
    }, []);

    if (initializeData === null) return null

    if (user !== null) return <Redirect to="/" />

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <Formik
                                enableReinitialize={true}
                                initialValues={initializeData}
                                validationSchema={validationSchema}
                                onSubmit={(values) => onSubmit(values)}>
                                {({ errors, touched,isValid,dirty}) => (
                                    <Form>

                                        <div className="form-group row">
                                            <label htmlFor="firstName" className="col-md-4 col-form-label text-md-right">Firstname</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="firstName" name="firstName" className="form-control" readOnly />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="lastName" className="col-md-4 col-form-label text-md-right">Lastname</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="lastName" name="lastName" className="form-control" readOnly />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>
                                            <div className="col-md-6">
                                                <Field type="text" id="email" name="email" className="form-control" readOnly />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="positionId" className="col-md-4 col-form-label text-md-right">Position</label>
                                            <div className="col-md-6">
                                                <Field as="select" id="positionId" name="positionId" className={`form-control ${
                                                    errors.positionId && touched.positionId ? "is-invalid" : ""
                                                }`} required>
                                                    <option value={null}>Open this select menu</option>
                                                    {positions.map(position => (<option key={position.id} value={position.id}>{position.name}</option>) )}
                                                </Field>
                                                {errors.positionId && touched.positionId ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.positionId}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="departmentId" className="col-md-4 col-form-label text-md-right">Department</label>
                                            <div className="col-md-6">
                                                <Field as="select" id="departmentId" name="departmentId" className={`form-control ${
                                                    errors.departmentId && touched.departmentId ? "is-invalid" : ""
                                                }`} required>
                                                    <option value={null}>Open this select menu</option>
                                                    {departments.map(department => (<option key={department.id} value={department.id}>{department.name}</option>) )}
                                                </Field>
                                                {errors.departmentId && touched.departmentId ? (
                                                    <span className="invalid-feedback" role="alert">
                                                    <strong>{errors.departmentId}</strong>
                                                </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="beginningOfEmployment" className="col-md-4 col-form-label text-md-right">Beginning of employment</label>
                                            <div className="col-md-6">
                                                <DatePickerField showYearDropdown id="beginningOfEmployment" name="beginningOfEmployment" className={`form-control ${
                                                    errors.beginningOfEmployment && touched.beginningOfEmployment ? "is-invalid" : ""
                                                }`} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="birthday" className="col-md-4 col-form-label text-md-right">Birthday</label>

                                            <div className="col-md-6">
                                                <DatePickerField showYearDropdown id="birthday" name="birthday" className={`form-control ${
                                                    errors.birthday && touched.birthday ? "is-invalid" : ""
                                                }`} />
                                            </div>
                                        </div>

                                        <Field type="text" id="socialId" name="socialId" hidden />

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" disabled={!(isValid && dirty)} className="btn btn-primary">Register</button>
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

export default Register;