import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { useSignUpMutation } from "../../graphql/generated";
import AuthImage from "../../images/auth.svg";
import { handleErrors } from "../../utils/error_handler";
import { signUpSchema } from "../../utils/schemas/signUp";
import Input from "../shared/Input";
interface Props {}

const SignUp: React.FC<Props> = () => {
  const [signUp, { loading }] = useSignUpMutation();
  const { setCurrentUser } = useUserContext();

  const onSubmit = async (values: any) => {
    const { confirmPassword, ...signupInput } = values;
    try {
      const response = await signUp({
        variables: { signupInput },
      });
      console.log(response.data);
      if (response.data && response.data.signup && response.data?.signup.user) {
        setCurrentUser({ ...response.data.signup.user });
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
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: signUpSchema,
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
            <p className="font-extrabold text-gray-800 text-2xl leading-tight">
              Hello, <br />
              <span className="text-purple-600">Create Your Account!</span>
            </p>
          </div>
          <Input
            label="name"
            type="name"
            error={formik.errors.name}
            touched={formik.touched.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            label="username"
            type="text"
            error={formik.errors.username}
            touched={formik.touched.username}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex space-x-6">
            <Input
              label="password"
              type="password"
              error={formik.errors.password}
              touched={formik.touched.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              label="confirmPassword"
              type="password"
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <Input
            label="email"
            type="email"
            error={formik.errors.email}
            touched={formik.touched.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            disabled={!formik.isValid || loading}
            className="block w-full py-2 mt-6 bg-purple-400 rounded shadow text-white font-semibold tracking-widest transition ease-linear duration-300 text-md hover:bg-purple-600"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="block text-center mt-3 underline text-purple-400 text-xs"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
