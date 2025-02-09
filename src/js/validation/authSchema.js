import * as yup from "yup";

export const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email address")
      .matches(/@stud\.noroff\.no$/, "Email must include @stud.noroff.no")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    name: yup
      .string()
      .matches(
        /^[\w\s]+$/,
        "Name must not contain punctuation symbols apart from underscore",
      )
      .required("Name is required"),
  })
  .required();
