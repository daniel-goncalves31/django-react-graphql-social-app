import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().min(3).required(),
  password: Yup.string().min(8).required(),
});
