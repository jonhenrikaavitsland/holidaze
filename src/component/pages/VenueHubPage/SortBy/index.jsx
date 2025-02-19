/* eslint-disable react/prop-types */

/**
 * Renders a "Sort By" control that allows users to select a sorting criterion.
 *
 * This component displays a form with a labeled select dropdown. When the user changes the selected option,
 * the provided `setSortBy` callback is called with the new value, allowing the parent component to update the sorting order.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.setSortBy - Callback function to update the sort criterion based on the user's selection.
 *
 * @example
 * // Example usage:
 * <SortBy setSortBy={(value) => console.log("Sort by:", value)} />
 *
 * @returns {JSX.Element} The rendered sort-by control.
 */
export default function SortBy({ setSortBy }) {
  return (
    <div>
      <form>
        <fieldset className="flex justify-end">
          <legend className="sr-only">sort by</legend>
          <div className="flex gap-5 items-end">
            <label
              htmlFor="sort-b"
              className="font-medium text-sm-leading-none"
            >
              Sort by:
            </label>
            <select
              className="capitalize bg-white pt-4 cursor-pointer"
              name="sort-by"
              id="sort-by"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">date</option>
              <option value="venue">venue</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
