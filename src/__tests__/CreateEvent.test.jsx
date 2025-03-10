import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateEvent from "../components/CreateEvent";
import { describe, test, expect, vi, beforeAll } from "vitest";
import { crearEvento, getEventos } from "../services/eventService";

// Mock de los servicios
vi.mock("../services/eventService", () => ({
  crearEvento: vi.fn(),
  getEventos: vi.fn(),
}));

// Mock de window.matchMedia para evitar errores con SweetAlert2
beforeAll(() => {
    globalThis.window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });
  
  
  
describe("CreateEvent Component", () => {
  test("debería renderizar correctamente", () => {
    render(<CreateEvent closeModal={vi.fn()} setEventos={vi.fn()} />);
    expect(screen.getByText("Crear Evento")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descripción")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ubicación")).toBeInTheDocument();
  });

  test("debería permitir escribir en los campos de entrada", () => {
    render(<CreateEvent closeModal={vi.fn()} setEventos={vi.fn()} />);
    
    const nombreInput = screen.getByPlaceholderText("Nombre");
    fireEvent.change(nombreInput, { target: { value: "Evento de prueba" } });
    expect(nombreInput.value).toBe("Evento de prueba");
  });

  test("debería llamar a crearEvento y actualizar eventos al enviar el formulario", async () => {
    const closeModalMock = vi.fn();
    const setEventosMock = vi.fn();

    crearEvento.mockResolvedValue({ success: true });
    getEventos.mockResolvedValue([
      { id: 1, nombre: "Evento de prueba", fecha: "2025-03-09", descripcion: "Descripción", ubicacion: "Online" },
    ]);

    render(<CreateEvent closeModal={closeModalMock} setEventos={setEventosMock} />);

    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Evento de prueba" } });
    fireEvent.change(screen.getByPlaceholderText("Descripción"), { target: { value: "Descripción" } });
    fireEvent.change(screen.getByPlaceholderText("Ubicación"), { target: { value: "Online" } });
    fireEvent.change(screen.getByTestId("fecha"), {
        target: { value: "2025-03-09" },
      });

    fireEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(crearEvento).toHaveBeenCalled();
      expect(getEventos).toHaveBeenCalled();
      expect(setEventosMock).toHaveBeenCalledWith([
        { id: 1, nombre: "Evento de prueba", fecha: "2025-03-09", descripcion: "Descripción", ubicacion: "Online" },
      ]);
      expect(closeModalMock).toHaveBeenCalled();
    });
  });
});

