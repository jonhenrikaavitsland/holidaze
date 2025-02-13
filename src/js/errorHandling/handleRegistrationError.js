export default function handleRegistrationError(status) {
  let message;
  let title;

  switch (status) {
    case 400:
      title = "Account Already Exists";
      message =
        "An account with this email or name already exists. Please log in or try to register again.";
      break;
    case 422:
      title = "Unprocessable Registration Data";
      message =
        "Some fields do not meet our requirements. Please review your input and try again.";
      break;
    case 429:
      title = "Too Many Attempts";
      message =
        "You've attempted to register too many times. Please take a break and try again later.";
      break;
    default:
      title = "Unexpected Error";
      message =
        "Something went wrong on our end. Please try again, and if the problem persists, contact support.";
      break;
  }

  return { message, title };
}
