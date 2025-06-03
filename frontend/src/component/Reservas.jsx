import ReservaCard from "./ReservaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/header.css";
import "../css/reservas.css";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReservas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3032/api/reservas/mostrar"
      );
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    } finally {
      setLoading(false);
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

      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length > 0 ? (
        reservas.map((reserva) => (
          <ReservaCard key={reserva.id_reserva} reserva={reserva} />
        ))
      ) : (
        <p>No hay reservas para mostrar.</p>
      )}
    </div>
  );
}

export default Reservas;
