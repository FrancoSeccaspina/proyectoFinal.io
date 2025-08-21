import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendario from "./Calendario";
import "../css/actividad.css";

const Actividad = () => {
  const [eventos, setEventos] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState({
    titulo: "",
    fecha: "",
    horario: "",
    cupo: "",
    profesor: "",
  });
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  // 🚀 Traer actividades al cargar
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const res = await axios.get("http://localhost:3032/api/actividad", {
          withCredentials: true,
        });

        const actividadesFormateadas = res.data.map((a) => ({
          id: a.id,
          title: `${a.titulo} - Prof: ${a.profesor} - Cupo: ${a.cupo} - ${a.horario}`,
          start: a.fecha,
          allDay: false,
          extendedProps: {
            cupo: a.cupo,
            profesor: a.profesor,
            horario: a.horario,
          },
        }));

        setEventos(actividadesFormateadas);
      } catch (error) {
        console.error("Error al obtener actividades:", error);
        alert("No se pudieron cargar las actividades.");
      }
    };
    fetchActividades();
  }, []);

  // ➕ Agregar
  const agregarEvento = async () => {
    if (
      !nuevaActividad.titulo ||
      !nuevaActividad.fecha ||
      !nuevaActividad.horario ||
      !nuevaActividad.cupo ||
      !nuevaActividad.profesor
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3032/api/actividad",
        nuevaActividad,
        { withCredentials: true }
      );

      const actividad = res.data.data;
      setEventos([
        ...eventos,
        {
          id: actividad.id,
          title: `${actividad.titulo} - Prof: ${actividad.profesor} - Cupo: ${actividad.cupo} - ${actividad.horario}`,
          start: actividad.fecha,
          allDay: false,
          extendedProps: {
            cupo: actividad.cupo,
            profesor: actividad.profesor,
            horario: actividad.horario,
          },
        },
      ]);
      limpiarFormulario();
    } catch (error) {
      console.error("Error al agregar actividad:", error);
      alert(error.response?.data?.message || "Error al agregar actividad");
    }
  };

  // ✏️ Actualizar
  const actualizarEvento = async () => {
    if (!eventoSeleccionado) {
      alert("Selecciona una actividad primero");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3032/api/editarActividad/${eventoSeleccionado.id}`,
        nuevaActividad,
        { withCredentials: true }
      );

      setEventos(
        eventos.map((e) =>
          e.id === eventoSeleccionado.id
            ? {
                ...e,
                title: `${nuevaActividad.titulo} - Prof: ${nuevaActividad.profesor} - Cupo: ${nuevaActividad.cupo} - ${nuevaActividad.horario}`,
                start: nuevaActividad.fecha,
                extendedProps: {
                  cupo: nuevaActividad.cupo,
                  profesor: nuevaActividad.profesor,
                  horario: nuevaActividad.horario,
                },
              }
            : e
        )
      );

      limpiarFormulario();
      setEventoSeleccionado(null);
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      alert("No se pudo actualizar la actividad");
    }
  };

  // ❌ Eliminar
  const eliminarEvento = async () => {
    if (!eventoSeleccionado) {
      alert("Selecciona una actividad primero");
      return;
    }

    if (!window.confirm("¿Seguro que deseas eliminar esta actividad?")) return;

    try {
      await axios.delete(
        `http://localhost:3032/api/eliminarActividad/${eventoSeleccionado.id}`,
        { withCredentials: true }
      );

      setEventos(eventos.filter((e) => e.id !== eventoSeleccionado.id));
      limpiarFormulario();
      setEventoSeleccionado(null);
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
      alert("No se pudo eliminar la actividad");
    }
  };

  const limpiarFormulario = () =>
    setNuevaActividad({
      titulo: "",
      fecha: "",
      horario: "",
      cupo: "",
      profesor: "",
    });

  return (
    <div className="actividad-container">
      <h1 className="actividad-titulo">Gestión de Actividades</h1>

      <div className="actividad-formulario">
        <input
          type="text"
          placeholder="Título"
          value={nuevaActividad.titulo}
          onChange={(e) =>
            setNuevaActividad({ ...nuevaActividad, titulo: e.target.value })
          }
        />
        <input
          type="date"
          value={nuevaActividad.fecha}
          onChange={(e) =>
            setNuevaActividad({ ...nuevaActividad, fecha: e.target.value })
          }
        />
        <input
          type="time"
          value={nuevaActividad.horario}
          onChange={(e) =>
            setNuevaActividad({ ...nuevaActividad, horario: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Cupo"
          min="1"
          value={nuevaActividad.cupo}
          onChange={(e) =>
            setNuevaActividad({ ...nuevaActividad, cupo: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Profesor"
          value={nuevaActividad.profesor}
          onChange={(e) =>
            setNuevaActividad({ ...nuevaActividad, profesor: e.target.value })
          }
        />

        <div className="actividad-botones">
          {!eventoSeleccionado ? (
            <button onClick={agregarEvento}>Agregar</button>
          ) : (
            <>
              <button onClick={actualizarEvento}>Actualizar</button>
              <button
                onClick={eliminarEvento}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  limpiarFormulario();
                  setEventoSeleccionado(null);
                }}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="actividad-calendario-container">
        <Calendario
          eventos={eventos}
          setEventos={setEventos}
          eventoSeleccionadoId={eventoSeleccionado?.id}
          onSelectEvento={(evento) => {
            const fechaFormateada = new Date(evento.start)
              .toISOString()
              .split("T")[0];

            setEventoSeleccionado(evento);
            setNuevaActividad({
              titulo: evento.title.split(" - Prof:")[0].trim(),
              fecha: fechaFormateada,
              horario: evento.extendedProps.horario,
              cupo: evento.extendedProps.cupo,
              profesor: evento.extendedProps.profesor,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Actividad;
