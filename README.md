# eventos-boletas

Guía rápida para ejecutar el proyecto (paso a paso).

Prerequisitos
- Java (JDK) instalado (versión compatible con Spring Boot del proyecto).
- Node.js y npm instalados (para el frontend).
- Permisos de ejecución para el Maven Wrapper en Linux: `chmod +x mvnw` si hace falta.

1) Ejecutar el backend
- Abre una terminal y sitúate en la carpeta del backend:

   cd backend

- Arranca la aplicación con el Maven Wrapper:

   ./mvnw spring-boot:run

- Deja esta terminal abierta; por defecto el backend escuchará en el puerto `8080`.

2) Ejecutar el frontend
- Abre otra terminal y sitúate en la carpeta del frontend:

   cd frontend

- Si es la primera vez, instala las dependencias:

   npm install

- Arranca el frontend (Vite):

   npm run dev

- Abre en el navegador la URL que muestre Vite (normalmente `http://localhost:5173`).

3) Verificación rápida
- Backend: http://localhost:8080
- API base que usa el frontend: http://localhost:8080/api
- Consola H2 (base en memoria): http://localhost:8080/h2-console
   - Credenciales por defecto (según application.properties): usuario `sa`, sin contraseña
   - JDBC URL: `jdbc:h2:mem:eventosdb`

4) Comandos útiles
- Ejecutar tests del backend:

   ./mvnw test

- Empaquetar el backend (jar):

   ./mvnw package

