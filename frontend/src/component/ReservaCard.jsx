import { EstadosReserva } from "../constants/estadoReserva";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalConfirm from "./ModalDeConfirmacion"
import axios from "axios";

function ReservaCard({ reserva, onDelete}) {
  // const navigate = useNavigate();
  const [reservaActual, setReservaActual] = useState(reserva)
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState("")
  const [accionConfirmarModal, setAccionConfirmarModal] = useState(null);

  const modalConfirmarReserva = () => {
    setAccionConfirmarModal(() => () => {
      onclickConfirm()
      setIsOpen(false)
    })
    setMensaje("Desea confirmar reserva?")
    setIsOpen(true)
  }

  const modalCancelarReserva = () => {
    setAccionConfirmarModal(() => () => {
      onclickCancel()
      setIsOpen(false)
    })
    setMensaje("Desea confirmar reserva?")
    setIsOpen(true)
  }

  const modalEliminarReserva = () => {
    setAccionConfirmarModal(() => () => {
      handleDelete()
      setIsOpen(false)
    })
    setMensaje("Desea eliminar la reserva?")
    setIsOpen(true)
  }

  const onclickConfirm = async () => {
    try {
      const response = await axios.put(
        `http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/reservas/confirmar/${reservaActual.id_reserva}`, {},
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
        `http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/reservas/cancelar/${reservaActual.id_reserva}`, {},
        {
          withCredentials: true
        }
      );
      setReservaActual(response.data.reserva)

    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const idAEliminar = reservaActual.id_reserva;
      await axios.delete(`http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/reservas/${idAEliminar}`, { withCredentials: true });
      onDelete?.(idAEliminar);
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
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

        <button className="btn btn-danger" onClick={modalEliminarReserva}>Eliminar Reserva</button>

        <ModalConfirm 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={accionConfirmarModal}
          message={mensaje}
          />
          
      </div>
    </div>
  );
}

export default ReservaCard;
