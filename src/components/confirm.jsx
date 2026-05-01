import { useRef, forwardRef, useImperativeHandle } from "react";

const ConfirmModal = forwardRef(function ConfirmModal(
  { onConfirm, onCancel, pokemonName },
  ref,
) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal();
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  function handleConfirm() {
    dialogRef.current?.close();
    onConfirm();
  }

  function handleCancel() {
    dialogRef.current?.close();
    onCancel?.();
  }

  // Cierra si el usuario hace click fuera del dialog
  function handleBackdrop(e) {
    if (e.target === dialogRef.current) handleCancel();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdrop}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="m-auto rounded-2xl shadow-xl p-0 w-full max-w-sm backdrop:bg-black/60 bg-[#1e1e24] border border-[#2d2d35]"
    >
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="modal-title" className="text-lg font-bold text-gray-200">
            ¿Quitar de favoritos?
          </h2>
          <p id="modal-desc" className="text-sm text-gray-400">
            Vas a quitar a{" "}
            <span className="font-semibold capitalize text-gray-300">{pokemonName}</span> de
            tu lista. Puedes volver a agregarlo cuando quieras.
          </p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-[#4c1d95] text-white hover:bg-[#5b21b6] transition-colors"
          >
            Quitar
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmModal;
