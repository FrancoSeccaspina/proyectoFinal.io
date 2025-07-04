import { EstadosReserva } from "../constants/estadoReserva";
import { useState } from "react";
import axios from "axios";

function ReservaCard({ reserva: reservaProp }) {
  const [reserva, setReserva] = useState(reservaProp);

  const onclickConfirm = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3032/api/reservas/confirmar/${reserva.id_reserva}`, {}, { withCredentials: true }
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
        `http://localhost:3032/api/reservas/cancelar/${reserva.id_reserva}`, {},
        { withCredentials: true }
      );
      setReserva(...response.data.reserva);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Error al cancelar la reserva");
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Reserva</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Cliente : N° {reserva.Usuario?.id}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reserva.id_reserva}</td>
            <td>{new Date(reserva.fecha).toLocaleString()}</td>
            <td>{reserva.estado}</td>
            <td>$ {reserva.total}</td>
            <td>
              {reserva.Usuario?.nombre} {reserva.Usuario?.apellido}
            </td>
          </tr>
        </tbody>
      </table>
      {reserva.DetalleReservas?.map((detalle, index) => (
        <div className="productos-reserva" key={index}>
          <p>Producto: {detalle.Producto?.nombre}</p>
          <p>Precio: ${detalle.Producto?.precio}</p>
          <p>Cantidad: {detalle.cantidad}</p>
          <p>Subtotal: ${detalle.subtotal}</p>
        </div>
      ))}
      {reserva.estado !== EstadosReserva.CONFIRMADO && (
        <div className="estado-pendiente">
          <button className="btn btn-danger" onClick={onclickConfirm}>
            Confirmar reserva
          </button>
        </div>
      )}
      {reserva.estado !== EstadosReserva.CANCELADO && reserva.estado !== EstadosReserva.EXPIRADO && (
        <div className="estado-pendiente">
          <button className="btn btn-danger" onClick={onclickCancel}>
            Cancelar reserva
          </button>
        </div>
      )}
    </div>
  );
}

export default ReservaCard;
