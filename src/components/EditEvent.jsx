import { useEffect, useState } from 'react';
import { actualizarEvento, getEventos } from '../services/eventService';
import Swal from "sweetalert2";

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
    try {
      await actualizarEvento(eventoEdit.id, eventoEdit);
      const eventosActualizados = await getEventos();
      setEventos(eventosActualizados);
      Swal.fire("¡Éxito!", "El evento se actualizó correctamente.", "success");
      closeModal();
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al actualizar el evento.", "error");
      console.error("Error al actualizar el evento:", error);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Evento</h2>
        <form onSubmit={handleSubmit} className='form-event' data-testid="edit-form">
          <input type="text" name="nombre" value={eventoEdit.nombre} onChange={handleChange} required placeholder="Nombre" className='input'/>
          <input type="date" name="fecha" value={eventoEdit.fecha} onChange={handleChange} required data-testid="fecha-input" />
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
