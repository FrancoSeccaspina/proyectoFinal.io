import { EstadosReserva } from "../constants/estadoReserva";
import ModalConfirm from "./ModalDeConfirmacion"
import { useState } from "react";
import axios from "axios";

function ReservaCard({ reserva: reservaProp, onDelete}) {
  const [reservaActual, setReservaActual] = useState(reservaProp)
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState("")
  const [accionConfirmar, setAccionConfirmar] = useState(null);

  const modalConfirmarReserva = () => {
    setAccionConfirmar(() => () => {
      onclickConfirm()
      setIsOpen(false)
    })
    setMensaje("Desea confirmar reserva?")
    setIsOpen(true)
  }

  const modalCancelarReserva = () => {
    setAccionConfirmar(() => () => {
      onclickCancel()
      setIsOpen(false)
    })
    setMensaje("Desea confirmar reserva?")
    setIsOpen(true)
  }

  const onclickConfirm = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3032/api/reservas/confirmar/${reservaActual.id_reserva}`, {},
        {
          withCredentials: true
        });
      setReservaActual(response.data.reserva)

    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
    }
  };

  const onclickCancel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3032/api/reservas/cancelar/${reservaActual.id_reserva}`, {},
        {
          withCredentials: true
        }
      );
      setReservaActual(response.data.reserva)

    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  const handleDelete = async (id_reserva) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta reserva?")) {
      try {
        await axios.delete(`http://localhost:3032/api/reservas/${reservaActual.id_reserva}`, { withCredentials: true });
        onDelete?.(reservaActual.id_reserva);
      } catch (error) {
        console.error('Error al eliminar reserva:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="reserva-card">
      <table className="reserva-table">
        <tbody>
          <tr>
            <td className="label">Reserva</td>
            <td>{reservaActual.id_reserva}</td>
          </tr>
          <tr>
            <td className="label">Fecha</td>
            <td>{new Date(reservaActual.fecha).toLocaleString()}</td>
          </tr>
          <tr>
            <td className="label">Estado</td>
            <td>{reservaActual.estado}</td>
          </tr>
          <tr>
            <td className="label">Total</td>
            <td>$ {reservaActual.total}</td>
          </tr>
          <tr>
            <td className="label">
              Cliente : N° {reservaActual.Usuario?.id || "N/A"}
            </td>
            <td>
              {reservaActual.Usuario?.nombre} {reservaActual.Usuario?.apellido}
            </td>
          </tr>
        </tbody>
      </table>

      {reservaActual.DetalleReservas?.map((detalle, index) => (
        <div className="detalle-producto" key={index}>
          <p>
            <strong>Producto:</strong> {detalle.Producto?.nombre}
          </p>
          <p>
            <strong>Precio:</strong> ${detalle.Producto?.precio}
          </p>
          <p>
            <strong>Cantidad:</strong> {detalle.cantidad}
          </p>
          <p>
            <strong>Subtotal:</strong> ${detalle.subtotal}
          </p>
        </div>
      ))}

      <div className="estado-botones">

        {reservaActual.estado !== EstadosReserva.CONFIRMADO && (
          <button className="btn btn-confirmar" onClick={modalConfirmarReserva}>
            Confirmar reserva
          </button>
        )}

        {reservaActual.estado !== EstadosReserva.CANCELADO &&
          reservaActual.estado !== EstadosReserva.EXPIRADO && (
            <button className="btn btn-cancelar" onClick={modalCancelarReserva}>
              Cancelar reserva
            </button>
        )}

        <button className="btn btn-danger" onClick={() => handleDelete(reservaActual.id_reserva)}>Eliminar Reserva</button>

        <ModalConfirm 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={accionConfirmar}
          message={mensaje}
          />
          
      </div>
    </div>
  );
}

export default ReservaCard;
