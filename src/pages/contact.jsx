import { useState, useRef } from "react";
import { useToast } from "../context/toastContext";
import ConfirmFormModal from "../components/confirmformmodal";

const INITIAL = { nombre: "", email: "", mensaje: "" };

function ContactPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const modalRef = useRef(null);

  function validate(fields) {
    const e = {};
    if (fields.nombre.trim().length < 2)
      e.nombre = "El nombre debe tener al menos 2 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Ingresa un email válido.";
    if (fields.mensaje.trim().length < 10)
      e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return e;
  }

  function handleChange(e) {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    // Revalida en tiempo real solo si ya hubo un intento de envío
    if (Object.keys(errors).length > 0) setErrors(validate(next));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate(form);
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    // Abrir el modal en vez de enviar directamente
    modalRef.current?.open();
  }

  // Lógica tras la confirmación en el modal
  function executeSend(subscribed) {
    if (subscribed) {
      showToast("¡Mensaje enviado y suscripción VIP activada!", "success");
    } else {
      showToast("Mensaje enviado correctamente...", "info");
    }
    setForm(INITIAL);
    setErrors({});
  }

  const isValid = Object.keys(validate(form)).length === 0;

  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-200 mb-2">Contacto</h1>
      <p className="text-gray-500 text-sm mb-8">
        ¿Tienes preguntas o sugerencias? Escríbenos.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-400">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            aria-describedby={errors.nombre ? "error-nombre" : undefined}
            aria-invalid={!!errors.nombre}
            className={`border bg-[#1e1e24] text-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2
              ${
                errors.nombre
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-700 focus:ring-purple-400"
              }`}
          />
          {errors.nombre && (
            <p id="error-nombre" role="alert" className="text-xs text-red-500">
              {errors.nombre}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            aria-describedby={errors.email ? "error-email" : undefined}
            aria-invalid={!!errors.email}
            className={`border bg-[#1e1e24] text-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2
              ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-700 focus:ring-purple-400"
              }`}
          />
          {errors.email && (
            <p id="error-email" role="alert" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="mensaje"
            className="text-sm font-medium text-gray-400"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Tu mensaje aquí..."
            aria-describedby={errors.mensaje ? "error-mensaje" : undefined}
            aria-invalid={!!errors.mensaje}
            className={`border bg-[#1e1e24] text-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 resize-none
              ${
                errors.mensaje
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-700 focus:ring-purple-400"
              }`}
          />
          <div className="flex justify-between items-start mt-1">
            {errors.mensaje ? (
              <p
                id="error-mensaje"
                role="alert"
                className="text-xs text-red-500"
              >
                {errors.mensaje}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-500 shrink-0 ml-2">
              {form.mensaje.length} / 10 mín.
            </span>
          </div>
        </div>

        {/* Botón - disabled hasta que el form sea válido */}
        <button
          type="submit"
          disabled={!isValid}
          aria-disabled={!isValid}
          className="bg-[#4c1d95] text-white py-2 rounded-full text-sm font-medium
            transition-colors hover:bg-[#5b21b6]
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Enviar mensaje
        </button>
      </form>

      {/* Modal interactivo de Dark Pattern */}
      <ConfirmFormModal
        ref={modalRef}
        onConfirm={() => executeSend(true)}
        onCancel={() => executeSend(false)}
      />
    </main>
  );
}

export default ContactPage;
