import { useEffect, useState } from "react";
import api from "../api/api";
import EventoForm from "../components/EventoForm";

function EventosCrud() {
  const [eventos, setEventos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const [formulario, setFormulario] = useState({
    nombre: "",
    fecha: "",
    lugar: "",
    capacidad: "",
    boletosDisponibles: "",
    estadoEvento: "ACTIVO",
  });

  useEffect(() => {
    cargarEventos();
  }, []);

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 3000);
  };

  const cargarEventos = async () => {
    try {
      const respuesta = await api.get("/eventos");
      setEventos(respuesta.data);
    } catch (error) {
      mostrarMensaje("Error al cargar eventos", "error");
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    const capacidad = Number(formulario.capacidad);
    const disponibles = Number(formulario.boletosDisponibles);

    if (capacidad <= 0) {
      mostrarMensaje("La capacidad debe ser mayor a cero", "error");
      return false;
    }

    if (disponibles < 0) {
      mostrarMensaje("Los boletos disponibles no pueden ser negativos", "error");
      return false;
    }

    if (disponibles > capacidad) {
      mostrarMensaje(
        "Los boletos disponibles no pueden superar la capacidad",
        "error"
      );
      return false;
    }

    return true;
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const datos = {
      ...formulario,
      capacidad: Number(formulario.capacidad),
      boletosDisponibles: Number(formulario.boletosDisponibles),
    };

    try {
      if (editando) {
        await api.put(`/eventos/${idEditando}`, datos);
        mostrarMensaje("Evento actualizado correctamente", "success");
      } else {
        await api.post("/eventos", datos);
        mostrarMensaje("Evento creado correctamente", "success");
      }

      limpiarFormulario();
      cargarEventos();
    } catch (error) {
      mostrarMensaje("Error al guardar el evento", "error");
    }
  };

  const editar = (evento) => {
    setFormulario({
      nombre: evento.nombre,
      fecha: evento.fecha,
      lugar: evento.lugar,
      capacidad: evento.capacidad,
      boletosDisponibles: evento.boletosDisponibles,
      estadoEvento: evento.estadoEvento,
    });

    setEditando(true);
    setIdEditando(evento.idEvento);
  };

  const eliminar = async (idEvento) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este evento?");

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`/eventos/${idEvento}`);
      mostrarMensaje("Evento eliminado correctamente", "success");
      cargarEventos();
    } catch (error) {
      mostrarMensaje("Error al eliminar el evento", "error");
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      fecha: "",
      lugar: "",
      capacidad: "",
      boletosDisponibles: "",
      estadoEvento: "ACTIVO",
    });

    setEditando(false);
    setIdEditando(null);
  };

  return (
    <main className="page">
      <h1>CRUD de Eventos</h1>
      <p>
        Aquí se gestiona la entidad Evento del dominio. Esta pantalla permite
        listar, crear, actualizar y eliminar eventos.
      </p>

      {mensaje && <div className={`message ${tipoMensaje}`}>{mensaje}</div>}

      <EventoForm
        formulario={formulario}
        manejarCambio={manejarCambio}
        guardar={guardar}
        editando={editando}
        limpiarFormulario={limpiarFormulario}
      />

      <h2>Listado de eventos</h2>

      {eventos.length === 0 ? (
        <div className="empty">No hay eventos registrados.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Capacidad</th>
              <th>Disponibles</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.idEvento}>
                <td>{evento.idEvento}</td>
                <td>{evento.nombre}</td>
                <td>{evento.fecha}</td>
                <td>{evento.lugar}</td>
                <td>{evento.capacidad}</td>
                <td>{evento.boletosDisponibles}</td>
                <td>{evento.estadoEvento}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => editar(evento)}>Editar</button>
                    <button
                      className="btn-danger"
                      onClick={() => eliminar(evento.idEvento)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default EventosCrud;