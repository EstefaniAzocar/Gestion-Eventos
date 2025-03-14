# 🎨 Frontend - Gestión de Eventos

## 📂 Estructura del Proyecto
```
frontend/
├── src/
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Vistas principales
│   ├── styles/       # Estilos con SCSS
│   ├── App.jsx       # Componente principal
│   ├── main.jsx      # Punto de entrada
│   ├── eventService.js # Conexión con el backend
```

## 🚀 Configuración y Ejecución

### 1️⃣ Requisitos previos
- Node.js 18+
- npm

### 2️⃣ Instalación y ejecución
```bash
Ubicarse y asegurarse que este en la carpeta donde se encuentra el proyecto guardado con la terminacion cd "Nombre de Carpeta"
npm install
npm run dev
```
# 📌 Backend - Gestión de Eventos

## 📂 Estructura del Proyecto

```
backend/
├── src/main/java/com/gestion/eventos/
│   ├── controller/   # Controladores REST
│   ├── service/      # Lógica de negocio
│   ├── repository/   # Acceso a la base de datos
│   ├── model/        # Clases de entidad
│   ├── config/       # Configuraciones (DB, CORS, etc.)
├── src/test/java/com/gestion/eventos/ # Pruebas unitarias
├── application.properties # Configuración del servidor y BD
```

## 🚀 Configuración y Ejecución

### 1️⃣ Requisitos previos
- Java 17+
- Maven
- H2 (Base de datos embebida)

### 2️⃣ Instalación y ejecución
```bash
Ubicarse y asegurarse que este en la carpeta donde se encuentra el proyecto guardado con la terminacion cd "Nombre de Carpeta"
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Endpoints disponibles
| Método | Ruta           | Descripción               |
|--------|--------------|---------------------------|
| GET    | /events      | Obtener todos los eventos |
| POST   | /events      | Crear un evento           |
| GET    | /events/{id} | Obtener un evento por ID  |
| PUT    | /events/{id} | Actualizar un evento      |
| DELETE | /events/{id} | Eliminar un evento        |

---
## 🔗 Conexión con el Backend
Modificar `eventService.js` si es necesario:
```js
const API_URL = "http://localhost:8080/events";
```

## 📌 Patrones de Diseño Utilizados
### Backend
- **MVC (Model-View-Controller):** Para separar la lógica de negocio de la capa de presentación.
- **Repository Pattern:** Para manejar la persistencia de datos de manera modular.
- **Service Layer:** Para desacoplar la lógica de negocio de los controladores.

### Frontend
- **Componentes reutilizables:** Uso de componentes modulares en React.
- **useState y useEffect:** Para manejar el estado en los componentes.

---

## 📖 Documentación del Código
- Se han añadido comentarios en los archivos clave para facilitar la comprensión.
- Se recomienda usar herramientas como Swagger para documentar la API en el backend.
```js
http://localhost:8080/swagger-ui/index.html
```

---

## 🛠 Pruebas Unitarias

### Backend (JUnit y Mockito)
Ejecutar pruebas con:
```bash
mvn test
```

### Frontend (Vitest)
Ejecutar pruebas con:
```bash
npm run test
