import * as Yup from "yup";

export const LoginSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        // .matches(/^[a-zA-Z0-9._%+-]+@securelytix\.com$/, "Must be a securelytix.com email")
        .required("Write email address"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(/[a-zA-Z]/, "Must include letters")
        .matches(/\d/, "Must include numbers")
        .required("Required"),
    })