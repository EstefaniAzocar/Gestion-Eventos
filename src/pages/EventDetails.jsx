import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById } from "../services/eventService";
import "../styles/EventDetails.scss";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    getEventoById(id).then(setEvento);
  }, [id]);

  if (!evento) {
    return <p className="loading">Cargando evento...</p>;
  }

  return (
    <div className="event-details-container">
      <div className="event-card">
        <h2>{evento.nombre}</h2>
        <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}</p>
        <p><strong>Descripción:</strong> {evento.descripcion}</p>
        <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
        <button className="btn-back" onClick={() => navigate(-1)}>Regresar</button>
      </div>
    </div>
  );
}

export default EventDetails;
