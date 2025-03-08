import { eliminarEvento } from '../services/eventService';

function EventList({ eventos, setEventos }) {
  const handleEliminar = async (id) => {
    try {
      await eliminarEvento(id);
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  return (
    <ul>
      {eventos.map(evento => (
        <li key={evento.id}>
          <p>{evento.nombre} - {evento.fecha}</p>
          <p>{evento.descripcion} - {evento.ubicacion}</p>
          <button onClick={() => handleEliminar(evento.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default EventList;