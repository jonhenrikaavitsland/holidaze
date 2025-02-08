import useAlertStore from "../../js/store/useAlertStore";

export default function AlertModal() {
  const { title, message, type, onOk, onCancel } = useAlertStore();
  return (
    <div className="bg-white rounded-xl shadow-md shadow-natural-charcoal/40">
      <section>{title && <h2>{title}</h2>}</section>
      {message && <p>{message}</p>}
      <div className="alert-modal-buttons">
        <button onClick={onOk}>Ok</button>
        {type === "ok-cancel" && <button onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
}
