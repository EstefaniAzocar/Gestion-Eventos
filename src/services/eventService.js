import axios from 'axios';

const apiUrl = 'http://localhost:8080/eventos';

export const getEventos = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return [];
  }
};

export const getEventoById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el evento:", error);
    return null;
  }
};

export const crearEvento = async (evento) => {
  try {
    const response = await axios.post(apiUrl, evento);
    return response.data;
  } catch (error) {
    console.error("Error creando evento:", error);
  }
};

export const actualizarEvento = async (id, evento) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, evento);
    return response.data;
  } catch (error) {
    console.error("Error actualizando evento:", error);
  }
};

export const eliminarEvento = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error("Error eliminando evento:", error);
  }
};