import { useRef, forwardRef, useImperativeHandle } from "react";

const ConfirmFormModal = forwardRef(function ConfirmFormModal(
  { onConfirm, onCancel },
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

  // Suscribirse VIP y luego enviar
  function handleConfirm() {
    dialogRef.current?.close();
    onConfirm();
  }

  // Rechazar suscripción y solo enviar
  function handleCancel() {
    dialogRef.current?.close();
    onCancel?.();
  }

  // Cierra si el usuario hace click fuera del dialog (comportamiento de cancelar el modal sin enviar)
  function handleBackdrop(e) {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  }

  // Cierra si el usuario presiona ESC
  function handleCancelEvent(e) {
    e.preventDefault(); // Evita que se dispare onCancel o se cierre nativamente
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdrop}
      onCancel={handleCancelEvent}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="m-auto rounded-2xl shadow-xl p-0 w-full max-w-sm backdrop:bg-black/60 bg-[#1e1e24] border border-[#2d2d35]"
    >
      <div className="p-6 flex flex-col gap-2 text-center">
        <div className="flex flex-col gap-2">
          <h2 id="modal-title" className="text-xl font-bold text-gray-200">
            ¡Casi listo para enviar!
          </h2>
          <p id="modal-desc" className="text-sm text-gray-400">
            Para completar tu mensaje y asegurarte de no perderte nada, te añadiremos a nuestra lista de entrenadores VIP para recibir ofertas y novedades semanales.
          </p>
        </div>

        {/*
          DARK PATTERN: 
          Este modal combina dos dark patterns. Primero interrumpe al usuario justo 
          cuando intenta completar su tarea real (enviar el formulario), atrayendo 
          su atención hacia una suscripción no solicitada con un botón prominente que 
          parece la confirmación natural del flujo. Segundo, el botón de rechazo usa un 
          texto redactado para generar culpa o sensación de pérdida, desincentivando
          que el usuario lo elija.
        */}
        <div className="flex flex-col mt-2">
          <button
            onClick={handleConfirm}
            className="w-full px-4 py-3 rounded-xl text-sm font-bold bg-[#4c1d95] text-white hover:bg-[#5b21b6] transition-colors shadow-md"
          >
            Aceptar y enviar
          </button>
          <button
            onClick={handleCancel}
            className="w-full px-4 py-2 mt-1 rounded-xl text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            No, prefiero perderme las ofertas y solo enviar
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmFormModal;