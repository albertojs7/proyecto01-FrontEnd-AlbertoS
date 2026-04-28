import { useRef, forwardRef, useImperativeHandle } from 'react'

// forwardRef permite que el padre llame a modal.current.open()
const ConfirmModal = forwardRef(function ConfirmModal({ onConfirm, onCancel, pokemonName }, ref) {
  const dialogRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal()
    },
    close() {
      dialogRef.current?.close()
    },
  }))

  function handleConfirm() {
    dialogRef.current?.close()
    onConfirm()
  }

  function handleCancel() {
    dialogRef.current?.close()
    onCancel?.()
  }

  // Cierra si el usuario hace click fuera del dialog
  function handleBackdrop(e) {
    if (e.target === dialogRef.current) handleCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdrop}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="m-auto rounded-2xl shadow-xl p-0 w-full max-w-sm backdrop:bg-black/40 bg-white"
    >
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="modal-title" className="text-lg font-bold text-gray-800">
            ¿Quitar de favoritos?
          </h2>
          <p id="modal-desc" className="text-sm text-gray-500">
            Vas a quitar a <span className="font-semibold capitalize">{pokemonName}</span> de
            tu lista. Puedes volver a agregarlo cuando quieras.
          </p>
        </div>

        {/*
          DARK PATTERN INTENCIONAL: "confirmación negativa"
          El botón de acción destructiva (Quitar) está estilizado de forma prominente
          en rojo y ubicado a la derecha (posición de confirmación esperada por el usuario),
          mientras que Cancelar aparece apagado a la izquierda.
          Esto induce al usuario a confirmar la acción sin leer con cuidado,
          cuando lo correcto sería que Cancelar fuera el botón prominente.
        */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Quitar
          </button>
        </div>
      </div>
    </dialog>
  )
})

export default ConfirmModal