import { useState } from 'react';
import { crearEvento } from '../services/eventService';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateEvent.scss'; // Importación de estilos

function CreateEvent() {
  const [evento, setEvento] = useState({
    nombre: '',
    fecha: '',
    descripcion: '',
    ubicacion: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearEvento(evento);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div className="create-event-container">
      <h1>Crear Evento</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="datetime-local" name="fecha" onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} required />
        <input type="text" name="ubicacion" placeholder="Ubicación" onChange={handleChange} required />
        <div className="button-group">
          <button type="submit" className="btn-create">Crear</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
