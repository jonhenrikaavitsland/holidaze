import { useState } from "react";
import useAuthStore from "../../js/store/useAuthStore";
import Heading from "../Heading";

export default function EditProfileModal() {
  const { user } = useAuthStore();
  const [newImage, setNewImage] = useState(user.avatar.url);
  const [inputUrl, setInputUrl] = useState(user.avatar.url);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const url = e.target.value;
    setInputUrl(url);

    if (!url) {
      setNewImage(user.avatar.url);
      setError("");
      return;
    }

    // Attempt to load the image
    const img = new Image();
    img.onload = () => {
      // When the image loads successfully, update the preview
      setNewImage(url);
      setError("");
    };
    img.onerror = () => {
      // Set an error message if the image fails to load
      setError("Failed to load image. Please enter a valid URL.");
    };
    img.src = url;
  };

  // Clear the input field, reset the preview image, and clear errors
  const handleClear = () => {
    setInputUrl("");
    setNewImage(user.avatar.url);
    setError("");
  };

  return (
    <div className="absolute w-2/3 md:max-w-xl lg:max-w-3xl z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-sky-blue pt-2.5 px-2.5 pb-10 rounded-xl flex flex-col gap-2.5 shadow-md shadow-natural-charcoal/40">
      <Heading level="3" className="text-center">
        Edit profile image
      </Heading>
      <p className="md:text-lg lg:text-xl lg:text-center">
        Upload a new image by filling in the box below. Click save when you are
        done.
      </p>
      <form className="flex flex-col pt-2.5 gap-5 lg:flex-row">
        {error ? (
          <div className="h-36 flex items-center">
            <p className="text-custom-coral font-bold mx-auto">{error}</p>
          </div>
        ) : (
          <figure>
            <img
              src={newImage}
              alt={user.name}
              className="h-36 aspect-square object-cover mx-auto"
            />
          </figure>
        )}
        <div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="uppercase text-sm font-serif font-bold me-2.5 py-2.5"
            >
              Clear
            </button>
          </div>
          <div className="my-auto grow shadow-md shadow-natural-charcoal/40 rounded-xl border border-natural-charcoal/40">
            <div className="flex flex-col md:flex-row bg-white p-1 rounded-xl">
              <label htmlFor="newImage" className="sr-only">
                New image url:
              </label>
              <input
                type="text"
                id="newImage"
                className="w-full ps-2.5"
                value={inputUrl}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="uppercase bg-accent-teal text-white font-serif font-bold text-xl-leading-none py-2 px-3.5 rounded-b-xl md:rounded-xl"
              >
                save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
