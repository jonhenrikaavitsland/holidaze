import * as yup from "yup";

const schemaFields = {};

for (let i = 0; i < 10; i++) {
  schemaFields[`media${i}`] = yup
    .string()
    .url("Must be a valid and accessible URL.")
    .notRequired();
}

/**
 * Validation schema for venue creation or update.
 *
 * This schema validates an object containing the following fields:
 *
 * - **venue**: A string representing the name of the venue. It must be between 5 and 40 characters long.
 * - **address**: A string representing the venue's address. It must be between 8 and 100 characters long.
 * - **zipCode**: A string representing the zip code. It must be a number between 35500 and 35700.
 * - **price**: A positive integer representing the price per night. It must be between 1 and 9999.
 * - **sleeps**: A positive integer representing the maximum number of guests. It must be between 1 and 20.
 * - **location**: A string that must be one of the allowed values: "1", "2", "3", "4", or "5".
 * - **description**: An optional string providing a description of the venue. If provided, it must be at least 50 characters
 *   and no more than 5000 characters. Leading and trailing whitespace is trimmed; if the trimmed value is empty, it is treated as undefined.
 *
 * Additionally, the schema dynamically adds 10 optional media fields (`media0` through `media9`). Each media field, if provided,
 * must be a valid and accessible URL.
 *
 * @constant {yup.ObjectSchema}
 * @example
 * // Example usage:
 * const formData = {
 *   venue: "Sunny Beach House",
 *   address: "123 Ocean Drive",
 *   zipCode: "35600",
 *   price: 250,
 *   sleeps: 6,
 *   location: "3",
 *   description: "A beautiful venue by the sea, perfect for family vacations.",
 *   media0: "https://example.com/image1.jpg",
 *   // ... other media fields as needed
 * };
 *
 * schema.validate(formData)
 *   .then(validatedData => {
 *     // Proceed with validated data
 *   })
 *   .catch(validationError => {
 *     // Handle validation errors
 *   });
 */
export const schema = yup
  .object({
    venue: yup
      .string()
      .min(5, "Should be at least 5 characters.")
      .max(40, "Must be less than 40 characters.")
      .required("Please name your venue."),
    address: yup
      .string()
      .min(8, "Should be at least 8 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Please type the address of your venue."),
    zipCode: yup
      .string()
      .test(
        "is-valid-zip",
        "Zip Code must be a number between 35500 and 35700.",
        (value) => {
          if (!value) return false; // or handle empty string as needed
          const numberValue = Number(value);
          if (isNaN(numberValue)) return false;
          return numberValue >= 35500 && numberValue <= 35700;
        },
      )
      .required("Please input a Zip Code between 35500 and 35700."),
    price: yup
      .number()
      .positive()
      .integer()
      .min(1, "You can not charge less than €1 / night.")
      .max(9999, "Can not charge more above €9999 / night")
      .required("Please specify your rate / night"),
    sleeps: yup
      .number()
      .positive()
      .integer()
      .min(1, "You must serve at least one guest.")
      .max(20, "Max number of guests is 20.")
      .required("Please input your number of max guests."),
    location: yup
      .string()
      .oneOf(["1", "2", "3", "4", "5"], "Please pick a valid location.")
      .required("Please choose a location."),
    description: yup
      .string()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value,
      )
      .min(50, "Your description should be longer than 50 characters.")
      .max(5000, "Your description must be less than 1200 characters.")
      .notRequired(),
    ...schemaFields,
  })
  .required();
