import { useState } from 'react';
import { crearEvento, getEventos } from '../services/eventService';
import '../styles/Modal.scss';

function CreateEvent({ closeModal, setEventos }) {
  const [evento, setEvento] = useState({
    nombre: '',
    fecha: '',
    descripcion: '',
    ubicacion: ''
  });

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearEvento(evento);
    const eventosActualizados = await getEventos(); // Actualiza la lista
    setEventos(eventosActualizados);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear Evento</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input type="datetime-local" name="fecha" onChange={handleChange} required />
          <input type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} required />
          <input type="text" name="ubicacion" placeholder="Ubicación" onChange={handleChange} required />
          <div className="button-group">
            <button type="submit" className="btn-create">Crear</button>
            <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
