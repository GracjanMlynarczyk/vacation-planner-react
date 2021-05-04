import {useState} from "react";
import DatePicker from 'react-datepicker'
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

const FreeDayAdd = function () {

    const [data, setData] = useState(null);

    const validationSchema = Yup.object().shape({
        date: Yup.string().required('Department is required'),
        ownerId: Yup.number().required('Department leader is required').typeError('Invalid department leader')
    });

    const onSubmit = function (values) {
        console.log(values);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>Add free day</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={data ?? {
                            name: "",
                            ownerId: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => onSubmit(values)}>
                        {({ errors, touched,isValid, dirty}) => (
                            <Form>


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