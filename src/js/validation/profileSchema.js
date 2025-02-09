import * as yup from "yup";

export const schema = yup
  .object({
    image: yup
      .string()
      .url("Must be a valid and accessible URL.")
      .required("Please fill in your image URL."),
  })
  .required();
