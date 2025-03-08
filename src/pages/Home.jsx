import { useEffect, useState } from "react";
import { getEventos, eliminarEvento } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Home.scss";

function Home() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEventos().then(setEventos);
  }, []);

  const handleEliminar = async (id) => {
    await eliminarEvento(id);
    setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id));
  };

  return (
    <div className="home-container">
      <h1>Lista de Eventos</h1>
      <button className="btn-create" onClick={() => navigate("/crear")}>
        Nuevo Evento
      </button>
      <table className="event-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>
                <Link to={`/event/${evento.id}`} className="event-link">
                  {evento.nombre}
                </Link>
              </td>
              <td>{new Date(evento.fecha).toLocaleString()}</td>
              <td>{evento.descripcion}</td>
              <td>{evento.ubicacion}</td>
              <td>
                <button className="btn-edit" onClick={() => navigate(`/editar/${evento.id}`)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleEliminar(evento.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
