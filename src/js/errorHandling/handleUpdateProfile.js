export default function handleUpdateProfile(status) {
  let message;
  let title;

  switch (status) {
    case 400:
      title = "Invalid Update Request";
      message =
        "Your url might not be accessible or your url might be to long. Please check your input and try again.";
      break;
    default:
      title = "Unexpected Error";
      message =
        "An unexpected error occurred while updating your profile. Please try again later or contact support if the problem persists.";
      break;
  }

  return { message, title };
}
