import { useEffect, useState } from 'react';
import { actualizarEvento, getEventos } from '../services/eventService';
import '../styles/Modal.scss';

function EditEvent({ evento, closeModal, setEventos }) {
  const [eventoEdit, setEventoEdit] = useState(evento);

  useEffect(() => {
    setEventoEdit({
      ...evento,
      fecha: evento.fecha ? evento.fecha.slice(0, 16) : '',
    });
  }, [evento]);

  const handleChange = (e) => {
    setEventoEdit({ ...eventoEdit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarEvento(eventoEdit.id, eventoEdit);
    const eventosActualizados = await getEventos(); // Obtiene la lista actualizada
    setEventos(eventosActualizados);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Evento</h2>
        <form onSubmit={handleSubmit} className='formulary'>
          <input type="text" name="nombre" value={eventoEdit.nombre} onChange={handleChange} required placeholder="Nombre" className='input'/>
          <input type="datetime-local" name="fecha" value={eventoEdit.fecha} onChange={handleChange} required />
          <input type="text" name="descripcion" value={eventoEdit.descripcion} onChange={handleChange} required placeholder="Descripción" />
          <input type="text" name="ubicacion" value={eventoEdit.ubicacion} onChange={handleChange} required placeholder="Ubicación" />
          <div className="button-group">
            <button type="submit" className="btn-create">Actualizar</button>
            <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
