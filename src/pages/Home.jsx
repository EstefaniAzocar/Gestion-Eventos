import { useEffect, useState } from "react";
import { getEventos, eliminarEvento } from "../services/eventService";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import "../styles/Home.scss";

function Home() {
  const [eventos, setEventos] = useState([]);
  const [eventoEdit, setEventoEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
      <button className="btn-create" onClick={() => setShowCreateModal(true)}>
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
              <td>{evento.nombre}</td>
              <td>{new Date(evento.fecha).toLocaleString()}</td>
              <td>{evento.descripcion}</td>
              <td>{evento.ubicacion}</td>
              <td>
                <button className="btn-edit" onClick={() => { setEventoEdit(evento); setShowEditModal(true); }}>
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

      {/* Modal para Crear */}
      {showCreateModal && <CreateEvent closeModal={() => setShowCreateModal(false)} setEventos={setEventos}  />}

      {/* Modal para Editar */}
      {showEditModal && eventoEdit && <EditEvent evento={eventoEdit} closeModal={() => setShowEditModal(false)} setEventos={setEventos} />}
    </div>
  );
}

export default Home;
