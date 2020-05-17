import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { useLoginMutation } from "../../graphql/generated";
import AuthImage from "../../images/auth.svg";
import { handleErrors } from "../../utils/error_handler";
import { loginSchema } from "../../utils/schemas/login";
import Input from "../shared/Input";
interface Props {}

const Login: React.FC<Props> = () => {
  const [login, { loading }] = useLoginMutation();
  const { setCurrentUser } = useUserContext();

  const onSubmit = async ({ username, password }: any) => {
    try {
      const response = await login({
        variables: { username, password },
      });
      console.log(response.data);
      if (response.data && response.data.login && response.data.login.user) {
        setCurrentUser({ ...response.data.login.user });
        toast.success("Logged successfully!");
        console.log("submited");
      } else {
        toast.error("Something went wrong");
        console.log("error");
      }
    } catch (error) {
      handleErrors(error);
      console.log("error2");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="w-full h-screen flex">
      <div className="bg-purple-100 w-6/12 h-full flex items-center justify-center">
        <img src={AuthImage} alt="auth" className="h-2/3 w-2/3 object-cover" />
      </div>
      <div className="bg-purple-300 w-6/12 h-full flex items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="w-9/12 rounded shadow-lg bg-white px-5 py-6"
        >
          <div className="flex justify-center mb-6">
            <p className="font-extrabold text-gray-800 text-3xl leading-tight">
              Hello, <br />
              <span className="text-purple-600">Welcome back!</span>
            </p>
          </div>
          <Input
            label="username"
            type="text"
            error={formik.errors.username}
            touched={formik.touched.username}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            label="password"
            type="password"
            error={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            disabled={!formik.isValid || loading}
            className="block w-full py-2 mt-6 bg-purple-400 rounded shadow text-white font-semibold tracking-widest transition ease-linear duration-300 text-md hover:bg-purple-600"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="block text-center mt-3 underline text-purple-400 text-xs"
          >
            Do not have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
