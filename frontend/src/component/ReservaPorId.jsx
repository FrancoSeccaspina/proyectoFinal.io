import "../css/header.css";
import "../css/reservas.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReservaCard from "./ReservaCard";
import axios from "axios";


function ReservaPorId() {    
      const navigate = useNavigate();

    const [reserva, setReserva] = useState([]);
    const [loading, setLoading] = useState(true);
    const idReserva = useParams().id;

    const eliminarReserva = () => {
        alert("Se elimino la reserva con exito!")     
        navigate("/Reservas");
    };

    const getReservaByID = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/reserva/${idReserva}/confirmar`,
                { withCredentials: true }
            );
            setReserva(response.data.reserva);
        } catch (error) {
            console.error("Error al obtener reservas:", error);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    getReservaByID();
  }, []);

  return (
    <div className="table-wrapper">

      <section className="moverJuntos">
        <h2 className="box-title">Reserva</h2>
      </section>

      { loading ? ( <p>Cargando reservas...</p> ) : reserva ? (
          <ReservaCard 
            reserva={reserva}
            onDelete={eliminarReserva}
            />
        ) : ( <p>No hay reserva para mostrar.</p> )
      }
    </div>
  );
}

export default ReservaPorId;
