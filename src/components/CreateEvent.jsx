import { useState } from 'react';
import { crearEvento, getEventos } from '../services/eventService';
import Swal from "sweetalert2";
import '../styles/CreateEvent.scss';

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
    try {
      await crearEvento(evento);
      const eventosActualizados = await getEventos(); // Actualiza la lista
      setEventos(eventosActualizados);
      Swal.fire("¡Éxito!", "El evento se creó correctamente.", "success");
      closeModal();
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al crear el evento.", "error");
      console.error("Error al crear el evento:", error);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear Evento</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input type="date" name="fecha" onChange={handleChange} required data-testid="fecha"/>
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
