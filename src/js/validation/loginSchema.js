import * as yup from "yup";

/**
 * Validation schema for user login.
 *
 * This schema validates an object containing the following fields:
 * - **email**: Must be a valid email address ending with `@stud.noroff.no` and is required.
 * - **password**: Must be a string with a minimum length of 8 characters and is required.
 *
 * @constant {yup.ObjectSchema}
 * @property {string} email - The user's email address. Must be a valid email and include `@stud.noroff.no`.
 * @property {string} password - The user's password. Must be at least 8 characters long.
 */
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
  })
  .required();
