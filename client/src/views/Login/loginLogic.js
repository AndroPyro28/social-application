import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

const loginLogic = ({ toast }) => {
  const onSubmit = async (values) => {
    const res = await axios.post("http://localhost:3001/api/login", values, {
      withCredentials: true,
    });

    const { assignedToken, success, msg } = res.data;

    if (!success) {
      return toast(msg, {
        type: "error",
      });
    }
    Cookies.set("userToken", assignedToken, {
      expires: 1,
    });

    return window.location.assign(`/home`);
  };

  const initialValues = () => {
    return {
      email: "",
      password: "",
    };
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("This is invalid email")
      .required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  return {
    validationSchema,
    initialValues,
    onSubmit,
  };
  
};

export default loginLogic;
