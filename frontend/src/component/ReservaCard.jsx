function ReservaCard({ reserva }) {
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
    </div>
  );
}

export default ReservaCard;
