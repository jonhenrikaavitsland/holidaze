import Heading from "../Heading";

export default function EditProfileModal() {
  return (
    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Heading level="3" className="md:text-center">
        Edit profile image
      </Heading>
    </div>
  );
}
