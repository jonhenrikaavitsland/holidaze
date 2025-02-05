/* eslint-disable react/prop-types */
import Heading from "../Heading";

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
