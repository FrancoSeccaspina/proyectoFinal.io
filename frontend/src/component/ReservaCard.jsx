import { EstadosReserva } from "../constants/estadoReserva";
import { useState } from "react";
import axios from "axios";

function ReservaCard({ reserva: reservaProp }) {
  const [reserva, setReserva] = useState(reservaProp);

  const onclickConfirm = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3032/api/reservas/confirmar/${reserva.id_reserva}`
      );
      setReserva(...response.data.reserva);
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
      alert("Error al confirmar la reserva");
    }
  };

  const onclickCancel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3032/api/reservas/cancelar/${reserva.id_reserva}`
      );
      setReserva(...response.data.reserva);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Error al cancelar la reserva");
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
          <button className="btn btn-confirmar" onClick={onclickConfirm}>
            Confirmar reserva
          </button>
        )}
        {reserva.estado !== EstadosReserva.CANCELADO &&
          reserva.estado !== EstadosReserva.EXPIRADO && (
            <button className="btn btn-cancelar" onClick={onclickCancel}>
              Cancelar reserva
            </button>
          )}
      </div>
    </div>
  );
}

export default ReservaCard;
