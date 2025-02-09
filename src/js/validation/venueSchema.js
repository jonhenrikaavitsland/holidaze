import * as yup from "yup";

const schemaFields = {};

for (let i = 0; i < 10; i++) {
  schemaFields[`media${i}`] = yup
    .string()
    .url("Must be a valid and accessible URL.")
    .notRequired();
}

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
      .number()
      .positive()
      .integer()
      .min(35500, "Must me at least 35500.")
      .max(35700, "Must be lower than 35700.")
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
      .max(1200, "Your description must be less than 1200 characters.")
      .notRequired(),
    ...schemaFields,
  })
  .required();
