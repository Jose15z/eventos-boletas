# eventos-boletas
Los pasos son estos:

1. Abre una terminal en backend.
2. Inicia el backend con Maven Wrapper.
   - En Linux: `./mvnw spring-boot:run`
3. Deja esa terminal corriendo. El backend debe quedar en puerto 8080.
4. Abre otra terminal en frontend.
5. Instala dependencias la primera vez.
   - `npm install`
6. Levanta el frontend.
   - `npm run dev`
7. Abre el navegador en la URL que te muestre Vite, normalmente `http://localhost:5173`.

Verificación rápida:
- Backend: debe responder en `http://localhost:8080`
- H2: `http://localhost:8080/h2-console`
- Credenciales H2 según application.properties: usuario `sa`, sin contraseña, URL `jdbc:h2:mem:eventosdb`
- Frontend usa la API en `http://localhost:8080/api` según api.js

Si quieres, te doy los comandos exactos para copiar y pegar en Linux, paso por paso.