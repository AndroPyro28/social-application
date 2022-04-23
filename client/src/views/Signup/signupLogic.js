import React from 'react';
import * as yup from 'yup';
import axios from 'axios'

function signupLogic({toast}) {
    const onSubmit = async (values) => {
        const res = await axios.post("http://localhost:3001/api/signup", values, {
            withCredentials: true
        });

        const {success, msg} = res.data;
        console.log(msg, success);
        if(success) {
            return toast(msg, {type: 'success'});
        }
        toast(msg, {type: 'error'});
    }

    const errorText = 'This field is required!'

    const validationSchema = yup.object({
        firstname: yup.string().required(errorText),
        lastname: yup.string().required(errorText),
        email: yup.string().required(errorText).email('This is invalid email!'),
        password: yup.string().required(errorText).min(10),
        address: yup.string().required(errorText),
        confirmPassword: yup.string().required(errorText),
    })

    const initialValues = () => {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            address: '',
            confirmPassword: '',
        }
    }

    return {initialValues, validationSchema, onSubmit}
}

export default signupLogic;
