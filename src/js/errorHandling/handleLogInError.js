export default function handleLogInError(status) {
  let message;
  let title;

  switch (status) {
    case 400:
      title = "Invalid Input";
      message =
        "It looks like some information might be missing or entered incorrectly. Please double-check your details and try again.";
      break;
    case 401:
      title = "Incorrect Login Details";
      message =
        "We couldn’t verify your username or password. Please check your credentials and try again.";
      break;
    case 403:
      title = "Access Denied";
      message =
        "You don’t have permission to perform this action. If you believe this is an error, please contact support.";
      break;
    case 404:
      title = "Resource Not Found";
      message =
        "The page or resource you’re looking for couldn’t be found. It might have been moved or no longer exists.";
      break;
    case 429:
      title = "Too Many Attempts";
      message =
        "You’ve tried to log in too many times. Please take a short break and try again later.";
      break;
    default:
      title = "Unexpected Error";
      message =
        "Something went wrong on our end. Please try again, and if the problem persists, contact support.";
      break;
  }

  return { message, title };
}
