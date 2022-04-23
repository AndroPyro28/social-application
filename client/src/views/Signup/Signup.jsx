import styled from "styled-components";
import { Formik, Form } from "formik";
import FormikControl from "../../formik/FormikControl";
import signupLogic from "./signupLogic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SignupContainer} from './SignupContainer';
import { StyledDiv } from "./Div";
function Signup() {
  
  const { onSubmit, validationSchema, initialValues } = signupLogic({toast});

  const validatePassword = (password, confirmPassword) => {
    return password !== confirmPassword ? "Password & confirm password does not match!" : null;
  }

  return (
    <SignupContainer>
      <ToastContainer autoClose={1500} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {

           const {password, confirmPassword} = formik.values;

          return (
            <Form autoComplete="off" className="form">
              <h1>Sign up form</h1>

              <FormikControl
                name="firstname"
                label="First Name"
                type="text"
                control="input"
                className="input__field"
              />

              <FormikControl
                name="lastname"
                label="Last Name"
                type="text"
                control="input"
                className="input__field"
              />

              <FormikControl
                name="email"
                label="Email"
                type="email"
                control="input"
                className="input__field"
              />

              <FormikControl
                name="address"
                label="Address"
                type="text"
                control="input"
                className="input__field"
              />

              <FormikControl
                name="password"
                label="Password"
                type="password"
                control="input"
                className="input__field"
              />

              <FormikControl
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                control="input"
                className="input__field"
                validate={(e) => validatePassword(password, confirmPassword)}
              />

              <button type="submit">Sign up</button>
              <a href="/login">Already have an account? Log in</a>

            </Form>
          );
        }}
      </Formik>
    </SignupContainer>
  );
}

export default Signup;
