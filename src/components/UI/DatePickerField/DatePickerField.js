import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import {getFreeDays} from "../../../services/freeDayService";

export const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    const isWeekday = date => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    getFreeDays()
    return (
        <DatePicker
            {...field}
            {...props}
            autoComplete="off"
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
            dateFormat="yyyy-MM-dd"
            filterDate={isWeekday}
        />
    );
};

export default DatePickerField;
