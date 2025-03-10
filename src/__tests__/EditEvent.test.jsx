import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditEvent from "../components/EditEvent";
import { describe, test, expect, vi, beforeAll } from "vitest";
import { actualizarEvento, getEventos } from "../services/eventService";

vi.mock("../services/eventService", () => ({
  actualizarEvento: vi.fn(),
  getEventos: vi.fn(),
}));

beforeAll(() => {
  globalThis.window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("EditEvent Component", () => {
  const eventoMock = {
    id: 1,
    nombre: "Evento Original",
    fecha: "2025-03-09T12:00",
    descripcion: "Descripción original",
    ubicacion: "Ubicación original",
  };

  test("debería renderizar correctamente con los datos del evento", () => {
    render(<EditEvent evento={eventoMock} closeModal={vi.fn()} setEventos={vi.fn()} />);

    expect(screen.getByText("Editar Evento")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Evento Original")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Descripción original")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ubicación original")).toBeInTheDocument();
  });

  test("debería actualizar el evento al enviar el formulario", async () => {
    const closeModalMock = vi.fn();
    const setEventosMock = vi.fn();

    actualizarEvento.mockResolvedValue({ success: true });
    getEventos.mockResolvedValue([
      { id: 1, nombre: "Evento Editado", fecha: "2025-03-10", descripcion: "Descripción editada", ubicacion: "Nueva ubicación" },
    ]);

    render(<EditEvent evento={eventoMock} closeModal={closeModalMock} setEventos={setEventosMock} />);

    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Evento Editado" } });
    fireEvent.change(screen.getByPlaceholderText("Descripción"), { target: { value: "Descripción editada" } });
    fireEvent.change(screen.getByPlaceholderText("Ubicación"), { target: { value: "Nueva ubicación" } });
    fireEvent.change(screen.getByTestId("fecha-input"), { target: { value: "2025-03-10" } });


    fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

    await waitFor(() => {
      expect(actualizarEvento).toHaveBeenCalled();
      expect(getEventos).toHaveBeenCalled();
      expect(setEventosMock).toHaveBeenCalledWith([
        { id: 1, nombre: "Evento Editado", fecha: "2025-03-10", descripcion: "Descripción editada", ubicacion: "Nueva ubicación" },
      ]);
      expect(closeModalMock).toHaveBeenCalled();
    });
  });
});
