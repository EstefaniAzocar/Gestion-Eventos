import { useEffect, useState } from 'react';
import { getEventoById, actualizarEvento } from '../services/eventService';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditEvent.scss';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    nombre: '',
    fecha: '',
    descripcion: '',
    ubicacion: ''
  });

  useEffect(() => {
    getEventoById(id).then((data) => {
      setEvento({
        ...data,
        fecha: data.fecha ? data.fecha.slice(0, 16) : '', // Ajustar formato de fecha
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarEvento(id, evento);
    navigate('/');
  };

  return (
    <div className="event-form-container">
      <h1>Editar Evento</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <input type="text" name="nombre" value={evento.nombre} onChange={handleChange} required placeholder="Nombre" />
        <input type="datetime-local" name="fecha" value={evento.fecha} onChange={handleChange} required />
        <input type="text" name="descripcion" value={evento.descripcion} onChange={handleChange} required placeholder="Descripción" />
        <input type="text" name="ubicacion" value={evento.ubicacion} onChange={handleChange} required placeholder="Ubicación" />
        <div className="form-buttons">
          <button type="submit" className="btn-submit">Actualizar</button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
