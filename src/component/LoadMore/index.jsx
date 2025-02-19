/* eslint-disable react/prop-types */
import Heading from "../Heading";

/**
 * Renders a pagination control component that allows users to navigate between pages.
 *
 * This component displays a heading and a series of buttons for pagination, including "First" and "Last" buttons,
 * as well as dynamically generated intermediate page buttons based on the total page count provided in the `meta` object.
 * Clicking a button calls the `setCurrentPage` function with the corresponding page number.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.setCurrentPage - Callback function to update the current page.
 * @param {object} props.meta - An object containing pagination metadata.
 * @param {number} props.meta.pageCount - Total number of pages available.
 * @param {string} props.headingContent - The content to display as the heading above the pagination buttons.
 *
 * @example
 * // Example usage:
 * <LoadMore
 *   setCurrentPage={(page) => console.log('Page selected:', page)}
 *   meta={{ pageCount: 5 }}
 *   headingContent="Load More Items"
 * />
 *
 * @returns {JSX.Element} The rendered pagination control component.
 */

export default function LoadMore({ setCurrentPage, meta, headingContent }) {
  return (
    <div className="flex flex-col gap-2 text-center mt-5">
      <Heading level="3">{headingContent}</Heading>
      <div className="flex gap-5 leading-none flex-wrap justify-center">
        <button
          className="hover:bg-deep-blue/20 py-2.5 pe-1 "
          onClick={() => setCurrentPage(1)}
        >
          First
        </button>
        {meta.pageCount > 2 &&
          Array.from({ length: meta.pageCount - 2 }, (_, i) => i + 2).map(
            (page) => (
              <button
                className="hover:bg-deep-blue/20 py-2.5 px-3.5 "
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}
        <button
          className="hover:bg-deep-blue/20 py-2.5 ps-1.5 "
          onClick={() => setCurrentPage(meta.pageCount)}
        >
          Last
        </button>
      </div>
    </div>
  );
}
