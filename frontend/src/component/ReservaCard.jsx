import { EstadosReserva } from "../constants/estadoReserva";
import ModalConfirm from "./ModalDeConfirmacion"
import { useState } from "react";
import axios from "axios";

function ReservaCard({ reserva: reservaProp, onDelete , actualizarReserva}) {
  const reserva = reservaProp;
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
        `http://localhost:3032/api/reservas/confirmar/${reserva.id_reserva}`, {},
        {
          withCredentials: true
        });
      actualizarReserva(response.data.reserva[0])
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
    }
  };

  const onclickCancel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3032/api/reservas/cancelar/${reserva.id_reserva}`, {},
        {
          withCredentials: true
        }
      );
      actualizarReserva(response.data.reserva[0])
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  const handleDelete = async (id_reserva) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta reserva?")) {
      try {
        await axios.delete(`http://localhost:3032/api/reservas/${id_reserva}`, { withCredentials: true });
        onDelete?.(reserva.id_reserva);
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
            <td>{reserva.id_reserva}</td>
          </tr>
          <tr>
            <td className="label">Fecha</td>
            <td>{new Date(reserva.fecha).toLocaleString()}</td>
          </tr>
          <tr>
            <td className="label">Estado</td>
            <td>{reserva.estado}</td>
          </tr>
          <tr>
            <td className="label">Total</td>
            <td>$ {reserva.total}</td>
          </tr>
          <tr>
            <td className="label">
              Cliente : N° {reserva.Usuario?.id || "N/A"}
            </td>
            <td>
              {reserva.Usuario?.nombre} {reserva.Usuario?.apellido}
            </td>
          </tr>
        </tbody>
      </table>

      {reserva.DetalleReservas?.map((detalle, index) => (
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

        {reserva.estado !== EstadosReserva.CONFIRMADO && (
          <button className="btn btn-confirmar" onClick={modalConfirmarReserva}>
            Confirmar reserva
          </button>
        )}

        {reserva.estado !== EstadosReserva.CANCELADO &&
          reserva.estado !== EstadosReserva.EXPIRADO && (
            <button className="btn btn-cancelar" onClick={modalCancelarReserva}>
              Cancelar reserva
            </button>
        )}

        <button className="btn btn-danger" onClick={() => handleDelete(reserva.id_reserva)}>Eliminar Reserva</button>

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
