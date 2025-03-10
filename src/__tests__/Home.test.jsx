import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { getEventos, eliminarEvento } from "../services/eventService";
import Swal from "sweetalert2";

// Mock de los servicios
vi.mock("../services/eventService", () => ({
  getEventos: vi.fn(),
  eliminarEvento: vi.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia los mocks antes de cada prueba

    // Simula eventos de prueba
    getEventos.mockResolvedValue([
      { id: 1, nombre: "Evento Prueba", fecha: "2025-03-09", descripcion: "Descripción", ubicacion: "Online" },
    ]);

    // Mock de la función eliminar
    eliminarEvento.mockResolvedValue({ success: true });
  });

  test("debería renderizarse correctamente", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Lista de Eventos")).toBeInTheDocument();
  });

  test("debería cargar y mostrar los eventos", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Evento Prueba")).toBeInTheDocument();
    });
  });

  test("debería abrir la alerta de confirmación al hacer clic en eliminar", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Evento Prueba")).toBeInTheDocument();
    });

    // Mock de SweetAlert2
    const swalMock = vi.spyOn(Swal, "fire").mockResolvedValue({ isConfirmed: true });

    // Obtener todos los botones y seleccionar el correcto
    const deleteButton = screen.getAllByTestId("delete-button")[0];


    if (!deleteButton) throw new Error("Botón de eliminar no encontrado");

    // Simular clic en el botón de eliminar
    fireEvent.click(deleteButton);

    // Esperar a que la alerta se active
    await waitFor(() => {
      expect(swalMock).toHaveBeenCalled();
    });

    // Verificar que eliminarEvento se llama con el ID correcto
    await waitFor(() => {
      expect(eliminarEvento).toHaveBeenCalledWith(1);
    });

    swalMock.mockRestore();
  });
});
