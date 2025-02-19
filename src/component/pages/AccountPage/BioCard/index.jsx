/* eslint-disable react/prop-types */
import useUIStore from "../../../../js/store/useUIStore";

/**
 * Renders a bio card displaying a user's avatar, name, and email.
 *
 * The BioCard component shows the user's avatar as a circular background image,
 * along with their name and email in a vertically stacked layout. It also includes
 * an edit button that, when clicked, triggers the "Edit Profile" overlay by calling
 * the `openStateWithOverlay` function from the UI store.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.user - The user object containing profile details.
 * @param {object} props.user.avatar - The avatar object for the user.
 * @param {string} props.user.avatar.url - The URL of the user's avatar image.
 * @param {string} props.user.avatar.alt - The alternative text for the avatar image.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.email - The email address of the user.
 *
 * @example
 * const user = {
 *   avatar: {
 *     url: "https://example.com/avatar.jpg",
 *     alt: "User Avatar"
 *   },
 *   name: "Jane Doe",
 *   email: "jane.doe@example.com"
 * };
 *
 * <BioCard user={user} />
 *
 * @returns {JSX.Element} The rendered BioCard component.
 */
export default function BioCard({ user }) {
  const { openStateWithOverlay } = useUIStore();
  return (
    <div>
      <div className="relative flex flex-col gap-5 lg:gap-7.5 pt-2.5 md:pt-5 lg:pt-7.5 pb-10 lg:pb-15 border border-natural-charcoal/40 rounded-xl">
        <div
          className="w-1/2 max-h-50 max-w-50 aspect-square rounded-full shadow-md shadow-natural-charcoal/40 bg-cover bg-no-repeat bg-center mx-auto"
          style={{ backgroundImage: `url(${user.avatar.url})` }}
          aria-label={user.avatar.alt}
        />
        <div className="absolute z-20 top-0 right-0">
          <button
            className="p-2.5 rounded-xl hover:bg-deep-blue/20"
            onClick={() => {
              openStateWithOverlay("isEditProfileOpen");
            }}
          >
            <img src="/pen-solid.svg" alt="update image" className="h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2.5 lg:gap-3.75 text-center font-medium">
          <span className="capitalize text-xl-leading-none lg:text-2xl-leading-none">
            {user.name}
          </span>
          <span className="leading-none lg:text-xl-leading-none break-words">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
