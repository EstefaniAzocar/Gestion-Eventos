import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEventos, eliminarEvento } from "../services/eventService";
import CreateEvent from "../components/CreateEvent";
import EditEvent from "../components/EditEvent";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Home.scss";

function Home() {
  const [eventos, setEventos] = useState([]);
  const [eventoEdit, setEventoEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  useEffect(() => {
    getEventos().then(setEventos);
  }, []);

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarEvento(id);
        setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id));
        Swal.fire("Eliminado!", "El evento ha sido eliminado.", "success");
      }
    });
  };

  return (
    <div className="home-container">
      <h1>Lista de Eventos</h1>
      <button className="btn-NewEvent" onClick={() => setShowCreateModal(true)}>
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
              <td>{new Date(evento.fecha).toLocaleDateString()}</td>
              <td>{evento.descripcion}</td>
              <td>{evento.ubicacion}</td>
              <td>
                <div className="actions">
                  <button className="btn-edit" onClick={() => { setEventoEdit(evento); setShowEditModal(true); }}>
                    <FaEdit />
                  </button>
                  <button className="btn-delete" data-testid="delete-button" onClick={() => handleEliminar(evento.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Crear */}
      {showCreateModal && <CreateEvent closeModal={() => setShowCreateModal(false)} setEventos={setEventos} />}

      {/* Modal para Editar */}
      {showEditModal && eventoEdit && <EditEvent evento={eventoEdit} closeModal={() => setShowEditModal(false)} setEventos={setEventos} />}
    </div>
  );
}

export default Home;

