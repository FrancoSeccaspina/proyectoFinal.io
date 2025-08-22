import { useEffect, useState } from "react";
import ReservaCard from "./ReservaCard";
import axios from "axios";
import * as XLSX from "xlsx";
import "../css/header.css";
import "../css/reservas.css";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getReservas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3032/api/reservas/mostrar",
        { withCredentials: true }
      );
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const eliminarReserva = (id_reserva) => {
    setReservas((prev) => prev.filter((r) => r.id_reserva !== id_reserva));
  };

  // Filtrado
  const resultado = !search
    ? reservas
    : reservas.filter((reserva) =>
        reserva.estado.toLowerCase().includes(search.toLowerCase())
      );

  // Exportación a Excel con todos los productos
  const exportarExcel = () => {
    const datosParaExportar = [];

    resultado.forEach((reserva) => {
      if (Array.isArray(reserva.DetalleReservas)) {
        reserva.DetalleReservas.forEach((detalle, index) => {
          datosParaExportar.push({
            "ID Reserva": reserva.id_reserva,
            "Fecha": new Date(reserva.fecha).toLocaleString(),
            "Estado": reserva.estado,
            "Cliente": `${reserva.Usuario?.nombre || ""} ${reserva.Usuario?.apellido || ""}`,
            "Producto": detalle.Producto?.nombre || "",
            "Cantidad": detalle.cantidad,
            "Subtotal": detalle.subtotal,
            "Total Reserva":
              index === reserva.DetalleReservas.length - 1 ? reserva.total : "",
          });
        });
      }
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosParaExportar);
    XLSX.utils.book_append_sheet(wb, ws, "Reservas");
    XLSX.writeFile(wb, "reservas.xlsx");
  };

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div className="table-wrapper">
      <section className="moverJuntos">
        <h2 className="box-title">Lista de Reservas</h2>
      </section>

      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Buscar por Estado"
        className="form-control"
      />

      <button onClick={exportarExcel} className="btn-exportar">
        Exportar a Excel
      </button>

      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length > 0 ? (
        resultado.map((reserva) => (
          <ReservaCard
            key={reserva.id_reserva}
            reserva={reserva}
            onDelete={eliminarReserva}
          />
        ))
      ) : (
        <p>No hay reservas para mostrar.</p>
      )}
    </div>
  );
}

export default Reservas;
