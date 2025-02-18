import * as yup from "yup";

/**
 * Validation schema for verifying an image URL.
 *
 * This schema expects an object with the following property:
 * - **image**: A string that must be a valid URL. If the value is not a valid URL, the error message "Must be a valid and accessible URL." is returned.
 *
 * @constant {yup.ObjectSchema}
 * @property {string} image - The URL of the image.
 */
export const schema = yup
  .object({
    image: yup.string().url("Must be a valid and accessible URL."),
  })
  .required();
