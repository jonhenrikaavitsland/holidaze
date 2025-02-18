import * as yup from "yup";

/**
 * Validation schema for user registration.
 *
 * This schema validates an object containing the following fields:
 * - **email**: Must be a valid email address ending with `@stud.noroff.no`. An error message is provided if the email is invalid or missing.
 * - **password**: Must be at least 8 characters long. An error message is provided if the password is too short or missing.
 * - **name**: Must be a string that only contains word characters (letters, numbers, and underscores) and spaces, disallowing punctuation symbols (except underscore). An error message is provided if the name contains invalid characters or is missing.
 *
 * @constant {yup.ObjectSchema}
 * @property {string} email - The user's email address. Must be a valid email and include `@stud.noroff.no`.
 * @property {string} password - The user's password. Must be at least 8 characters long.
 * @property {string} name - The user's name. Must not contain punctuation symbols apart from underscore.
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
    name: yup
      .string()
      .matches(
        /^[\w\s]+$/,
        "Name must not contain punctuation symbols apart from underscore",
      )
      .required("Name is required"),
  })
  .required();
