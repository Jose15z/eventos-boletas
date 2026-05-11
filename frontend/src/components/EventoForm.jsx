function EventoForm({
  formulario,
  manejarCambio,
  guardar,
  editando,
  limpiarFormulario,
}) {
  return (
    <form onSubmit={guardar} className="form-card">
      <div className="form-group">
        <label>Nombre del evento</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          placeholder="Ej: Concierto Armenia Fest"
          required
        />
      </div>

      <div className="form-group">
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formulario.fecha}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="form-group">
        <label>Lugar</label>
        <input
          type="text"
          name="lugar"
          value={formulario.lugar}
          onChange={manejarCambio}
          placeholder="Ej: Coliseo del Café"
          required
        />
      </div>

      <div className="form-group">
        <label>Capacidad</label>
        <input
          type="number"
          name="capacidad"
          value={formulario.capacidad}
          onChange={manejarCambio}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Boletos disponibles</label>
        <input
          type="number"
          name="boletosDisponibles"
          value={formulario.boletosDisponibles}
          onChange={manejarCambio}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label>Estado del evento</label>
        <select
          name="estadoEvento"
          value={formulario.estadoEvento}
          onChange={manejarCambio}
          required
        >
          <option value="ACTIVO">ACTIVO</option>
          <option value="CANCELADO">CANCELADO</option>
          <option value="FINALIZADO">FINALIZADO</option>
        </select>
      </div>

      <div className="full-width actions">
        <button type="submit">
          {editando ? "Actualizar evento" : "Crear evento"}
        </button>

        {editando && (
          <button
            type="button"
            className="btn-secondary"
            onClick={limpiarFormulario}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default EventoForm;