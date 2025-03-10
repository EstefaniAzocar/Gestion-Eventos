import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { getEventos, getEventoById, crearEvento, actualizarEvento, eliminarEvento } from "../services/eventService";

vi.mock("axios");

describe("getEventos", () => {
    it("debe obtener y ordenar los eventos por fecha", async () => {
      const eventosMock = [
        { id: 2, nombre: "Evento 2", fecha: "2025-04-10T10:00" },
        { id: 1, nombre: "Evento 1", fecha: "2025-03-10T15:00" },
      ];
  
      axios.get.mockResolvedValue({ data: eventosMock });
  
      const eventos = await getEventos();
  
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/eventos");
      expect(eventos).toEqual([
        { id: 1, nombre: "Evento 1", fecha: "2025-03-10T15:00" },
        { id: 2, nombre: "Evento 2", fecha: "2025-04-10T10:00" },
      ]);
    });
  });
  
  describe("getEventoById", () => {
    it("debe obtener un evento por su ID", async () => {
      const eventoMock = { id: 1, nombre: "Evento 1", fecha: "2025-03-10T15:00" };
  
      axios.get.mockResolvedValue({ data: eventoMock });
  
      const evento = await getEventoById(1);
  
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/eventos/1");
      expect(evento).toEqual(eventoMock);
    });
  });

  describe("crearEvento", () => {
    it("debe hacer una solicitud POST y devolver el evento creado", async () => {
      const nuevoEvento = { nombre: "Nuevo Evento", fecha: "2025-05-10T12:00" };
      const respuestaMock = { id: 3, ...nuevoEvento };
  
      axios.post.mockResolvedValue({ data: respuestaMock });
  
      const eventoCreado = await crearEvento(nuevoEvento);
  
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/eventos", nuevoEvento);
      expect(eventoCreado).toEqual(respuestaMock);
    });
  });
  
  describe("actualizarEvento", () => {
    it("debe hacer una solicitud PUT con los datos actualizados", async () => {
      const eventoActualizado = { nombre: "Evento Modificado", fecha: "2025-06-10T14:00" };
      axios.put.mockResolvedValue({ data: eventoActualizado });
  
      const respuesta = await actualizarEvento(1, eventoActualizado);
  
      expect(axios.put).toHaveBeenCalledWith("http://localhost:8080/eventos/1", eventoActualizado);
      expect(respuesta).toEqual(eventoActualizado);
    });
  });
  
  describe("eliminarEvento", () => {
    it("debe llamar a DELETE con el ID correcto", async () => {
      axios.delete.mockResolvedValue({});
  
      await eliminarEvento(1);
  
      expect(axios.delete).toHaveBeenCalledWith("http://localhost:8080/eventos/1");
    });
  });
  