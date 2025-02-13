/* eslint-disable react/prop-types */
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
