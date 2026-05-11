import { useEffect, useState } from "react";
import api from "../api/api";

function ClientesCrud() {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    estado: "ACTIVO",
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 3000);
  };

  const cargarClientes = async () => {
    try {
      const respuesta = await api.get("/clientes");
      setClientes(respuesta.data);
    } catch (error) {
      mostrarMensaje("Error al cargar clientes", "error");
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    if (!formulario.nombre.trim()) {
      mostrarMensaje("El nombre es obligatorio", "error");
      return false;
    }

    if (!formulario.email.includes("@")) {
      mostrarMensaje("El email no es válido", "error");
      return false;
    }

    if (!formulario.telefono.trim()) {
      mostrarMensaje("El teléfono es obligatorio", "error");
      return false;
    }

    return true;
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      if (editando) {
        await api.put(`/clientes/${idEditando}`, formulario);
        mostrarMensaje("Cliente actualizado correctamente", "success");
      } else {
        await api.post("/clientes", formulario);
        mostrarMensaje("Cliente creado correctamente", "success");
      }

      limpiarFormulario();
      cargarClientes();
    } catch (error) {
      mostrarMensaje("Error al guardar el cliente", "error");
    }
  };

  const editar = (cliente) => {
    setFormulario({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      estado: cliente.estado,
    });

    setEditando(true);
    setIdEditando(cliente.idCliente);
  };

  const eliminar = async (idCliente) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este cliente?");

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`/clientes/${idCliente}`);
      mostrarMensaje("Cliente eliminado correctamente", "success");
      cargarClientes();
    } catch (error) {
      mostrarMensaje("Error al eliminar el cliente", "error");
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      email: "",
      telefono: "",
      estado: "ACTIVO",
    });

    setEditando(false);
    setIdEditando(null);
  };

  return (
    <main className="page">
      <h1>CRUD de Clientes</h1>
      <p>
        Esta pantalla permite gestionar los clientes que luego podrán realizar
        compras de boletos.
      </p>

      {mensaje && <div className={`message ${tipoMensaje}`}>{mensaje}</div>}

      <form onSubmit={guardar} className="form-card">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Nombre del cliente"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            placeholder="cliente@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={manejarCambio}
            placeholder="3001234567"
            required
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formulario.estado}
            onChange={manejarCambio}
            required
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </div>

        <div className="full-width actions">
          <button type="submit">
            {editando ? "Actualizar cliente" : "Crear cliente"}
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

      <h2>Listado de clientes</h2>

      {clientes.length === 0 ? (
        <div className="empty">No hay clientes registrados.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.idCliente}>
                <td>{cliente.idCliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.estado}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => editar(cliente)}>Editar</button>
                    <button
                      className="btn-danger"
                      onClick={() => eliminar(cliente.idCliente)}
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

export default ClientesCrud;