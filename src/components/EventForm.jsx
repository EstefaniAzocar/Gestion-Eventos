import { useState, useEffect } from 'react';

function EventForm({ eventoInicial, onGuardar }) {
  const [evento, setEvento] = useState(eventoInicial || { nombre: '', fecha: '', descripcion: '', ubicacion: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    setEvento(eventoInicial || { nombre: '', fecha: '', descripcion: '', ubicacion: '' });
  }, [eventoInicial]);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evento.nombre || !evento.fecha || !evento.descripcion || !evento.ubicacion) {
      setError('Todos los campos son obligatorios');
      return;
    }
    onGuardar(evento);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" value={evento.nombre} onChange={handleChange} placeholder="Nombre" />
      <input type="datetime-local" name="fecha" value={evento.fecha} onChange={handleChange} />
      <input type="text" name="ubicacion" value={evento.ubicacion} onChange={handleChange} placeholder="Ubicación" />
      <textarea name="descripcion" value={evento.descripcion} onChange={handleChange} placeholder="Descripción" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Guardar</button>
    </form>
  );
}

export default EventForm;