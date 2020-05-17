import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  name: Yup.string().min(3).required().trim(),
  username: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/,
      "The password must have letter and numbers"
    )
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});
