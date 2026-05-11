import { useEffect, useState } from "react";
import api from "../api/api";

function ComprarBoleto() {
  const [clientes, setClientes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const [formulario, setFormulario] = useState({
    idCliente: "",
    idEvento: "",
    cantidadBoletos: 1,
    tipoBoleto: "GENERAL",
    precioUnitario: 0,
    metodoPago: "EFECTIVO",
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 4000);
  };

  const cargarDatos = async () => {
    try {
      const respuestaClientes = await api.get("/clientes");
      const respuestaEventos = await api.get("/eventos");

      setClientes(respuestaClientes.data);
      setEventos(respuestaEventos.data);
    } catch (error) {
      mostrarMensaje(
        "Error al cargar datos. Revisa que el backend esté encendido.",
        "error"
      );
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    if (!formulario.idCliente) {
      mostrarMensaje("Debes seleccionar un cliente", "error");
      return false;
    }

    if (!formulario.idEvento) {
      mostrarMensaje("Debes seleccionar un evento", "error");
      return false;
    }

    if (Number(formulario.cantidadBoletos) <= 0) {
      mostrarMensaje("La cantidad de boletos debe ser mayor a cero", "error");
      return false;
    }

    if (Number(formulario.precioUnitario) <= 0) {
      mostrarMensaje("El precio unitario debe ser mayor a cero", "error");
      return false;
    }

    return true;
  };

  const comprar = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const datos = {
      idCliente: Number(formulario.idCliente),
      idEvento: Number(formulario.idEvento),
      cantidadBoletos: Number(formulario.cantidadBoletos),
      tipoBoleto: formulario.tipoBoleto,
      precioUnitario: Number(formulario.precioUnitario),
      metodoPago: formulario.metodoPago,
    };

    try {
      const respuesta = await api.post("/compras", datos);

      mostrarMensaje(
        `Compra realizada correctamente. Total: $${respuesta.data.total}`,
        "success"
      );

      setFormulario({
        idCliente: "",
        idEvento: "",
        cantidadBoletos: 1,
        tipoBoleto: "GENERAL",
        precioUnitario: 0,
        metodoPago: "EFECTIVO",
      });

      cargarDatos();
    } catch (error) {
      const textoError =
        error.response?.data?.message ||
        error.response?.data ||
        "Error al realizar la compra";

      mostrarMensaje(textoError, "error");
    }
  };

  const eventoSeleccionado = eventos.find(
    (evento) => evento.idEvento === Number(formulario.idEvento)
  );

  const total =
    Number(formulario.cantidadBoletos) * Number(formulario.precioUnitario);

  return (
    <main className="page">
      <h1>Comprar Boleto</h1>
      <p>
        Esta es la transacción principal del sistema. Conecta Cliente, Evento,
        Compra y Boleto.
      </p>

      {mensaje && <div className={`message ${tipoMensaje}`}>{mensaje}</div>}

      <form onSubmit={comprar} className="form-card">
        <div className="form-group">
          <label>Cliente</label>
          <select
            name="idCliente"
            value={formulario.idCliente}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.idCliente} value={cliente.idCliente}>
                {cliente.nombre} - {cliente.estado}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Evento</label>
          <select
            name="idEvento"
            value={formulario.idEvento}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione un evento</option>
            {eventos.map((evento) => (
              <option key={evento.idEvento} value={evento.idEvento}>
                {evento.nombre} - disponibles: {evento.boletosDisponibles}
              </option>
            ))}
          </select>
        </div>

        {eventoSeleccionado && (
          <div className="full-width message success">
            Evento seleccionado: {eventoSeleccionado.nombre} | Lugar:{" "}
            {eventoSeleccionado.lugar} | Fecha: {eventoSeleccionado.fecha} |
            Boletos disponibles: {eventoSeleccionado.boletosDisponibles}
          </div>
        )}

        <div className="form-group">
          <label>Cantidad de boletos</label>
          <input
            type="number"
            name="cantidadBoletos"
            value={formulario.cantidadBoletos}
            onChange={manejarCambio}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de boleto</label>
          <select
            name="tipoBoleto"
            value={formulario.tipoBoleto}
            onChange={manejarCambio}
            required
          >
            <option value="GENERAL">GENERAL</option>
            <option value="VIP">VIP</option>
            <option value="PREFERENCIAL">PREFERENCIAL</option>
          </select>
        </div>

        <div className="form-group">
          <label>Precio unitario</label>
          <input
            type="number"
            name="precioUnitario"
            value={formulario.precioUnitario}
            onChange={manejarCambio}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Método de pago</label>
          <select
            name="metodoPago"
            value={formulario.metodoPago}
            onChange={manejarCambio}
            required
          >
            <option value="EFECTIVO">EFECTIVO</option>
            <option value="TARJETA">TARJETA</option>
            <option value="TRANSFERENCIA">TRANSFERENCIA</option>
          </select>
        </div>

        <div className="full-width message success">
          Total estimado de la compra: ${total}
        </div>

        <div className="full-width">
          <button type="submit">Confirmar compra</button>
        </div>
      </form>
    </main>
  );
}

export default ComprarBoleto;