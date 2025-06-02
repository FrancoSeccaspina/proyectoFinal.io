import { useEffect, useState } from "react";
import "../css/header.css";
import "../css/reservas.css";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  const getReservas = async () => {
    try {
      const response = await fetch(
        "http://localhost:3032/api/reservas/mostrar"
      );
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div className="table-wrapper">
      <section className="moverJuntos">
        <h2 className="box-title">Lista de Reservas</h2>
      </section>

      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Reserva : </th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Cliente : N° {reserva.Usuario.id}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reserva.id_reserva}</td>
                  <td>{new Date(reserva.fecha).toLocaleString()}</td>
                  <td>{reserva.estado}</td>
                  <td>$ {reserva.total}</td>
                  <td>
                    {reserva.Usuario.nombre} {reserva.Usuario.apellido}
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              {reserva.DetalleReservas?.map((detalle) => (
                <div className="productos-reserva">
                  <p>Producto : {detalle.Producto.nombre}</p>
                  <p>precio : ${detalle.Producto.precio}</p>
                  <p>cantidad : {detalle.cantidad}</p>
                  <p>subtotal : ${detalle.subtotal}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No hay reservas para mostrar.</p>
      )}
    </div>
  );
}

export default Reservas;
