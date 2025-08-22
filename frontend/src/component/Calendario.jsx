import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../css/actividad.css";

const Calendario = ({ eventos, setEventos, onSelectEvento, eventoSeleccionadoId }) => {
  const calendarRef = useRef(null);
  const [vistaInicial, setVistaInicial] = useState("dayGridMonth");

  useEffect(() => {
    const updateVista = () => {
      if (window.innerWidth <= 320) {
        setVistaInicial("listDay");   // 👈 solo actividades del día en 320px
      } else if (window.innerWidth <= 425) {
        setVistaInicial("listWeek");  // 👈 lista de la semana en 425px
      } else {
        setVistaInicial("dayGridMonth"); // 👈 vista mensual normal
      }
    };

    updateVista(); // primera vez
    window.addEventListener("resize", updateVista); // escucha cambios
    return () => window.removeEventListener("resize", updateVista);
  }, []);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) calendarApi.changeView(vistaInicial); // 👈 cambia vista dinámicamente
  }, [vistaInicial, eventos]);

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView={vistaInicial}
      editable={true}
      selectable={true}
      locale={esLocale}
      events={eventos}
      height="auto"
      eventDrop={(info) => {
        setEventos(eventos.map((e) => (e.id === info.event.id ? { ...e, start: info.event.start } : e)));
      }}
      eventClick={(info) => {
        const evento = eventos.find((e) => e.id === Number(info.event.id));
        if (onSelectEvento && evento) onSelectEvento(evento);
      }}
      eventClassNames={(arg) => (arg.event.id === eventoSeleccionadoId ? ["evento-seleccionado"] : [])}
      dayMaxEventRows={true}
      eventDisplay="block"
      contentHeight="auto"
    />
  );
};

export default Calendario;
