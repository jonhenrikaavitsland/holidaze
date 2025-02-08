import useAlertStore from "../../js/store/useAlertStore";
import Heading from "../Heading";

export default function AlertModal() {
  const { title, message, type, onOk, onCancel, className } = useAlertStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <section className="flex flex-col gap-5 bg-white mx-5 p-5 max-w-96 rounded-xl shadow-md shadow-natural-charcoal/40">
        {title && (
          <Heading level="2" className="text-center">
            {title}
          </Heading>
        )}
        {message && <p>{message}</p>}
        <div className="flex justify-between sm:flex-col gap-5 mt-5">
          <button
            className={`${className} py-2 rounded-xl font-serif uppercase font-medium shadow-md shadow-natural-charcoal/40`}
            onClick={onOk}
          >
            Ok
          </button>
          {type === "ok-cancel" && (
            <button
              className="bg-deep-blue/20 py-2 w-full rounded-xl font-serif uppercase font-medium shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/30"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
