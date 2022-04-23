import { Formik, Form } from "formik";
import FormikControl from "../../formik/FormikControl";
import loginLogic from "./loginLogic.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SignupContainer} from '../Signup/SignupContainer';

function Login() {
  
  const { onSubmit, validationSchema, initialValues } = loginLogic({toast});

  return (
    <SignupContainer>
      <ToastContainer autoClose={1500} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {

          return (
            <Form autoComplete="off" className="form">
              <h1>Log in form</h1>

              <FormikControl
                name="email"
                label="Email"
                type="email"
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

              <button type="submit">Log in</button>
              <a href="/signup">Don't have an account? Sign up</a>

            </Form>
          );
        }}
      </Formik>
    </SignupContainer>
  );
}

export default Login;
