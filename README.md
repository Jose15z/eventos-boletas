# Sistema de Eventos y Boletas

Proyecto académico desarrollado para la asignatura Ingeniería de Software II.

El sistema consiste en un MVP funcional para la gestión de eventos y venta de boletos. La aplicación permite administrar clientes, administrar eventos y realizar una transacción principal de negocio: la compra de boletos.

## Autores

- Jose Manuel Rodriguez Ospina
- Cristian Camilo Bonilla
- Juan Jose Ospina Varon
- Laura Alejandra Cardona Rivera

## Descripción general

Este proyecto implementa una aplicación web compuesta por un backend desarrollado en Java con Spring Boot y un frontend desarrollado en React.

La transacción principal del sistema es Comprar Boleto. Esta operación conecta las entidades Cliente, Evento, Compra y Boleto. Además, el sistema incluye operaciones CRUD para gestionar clientes y eventos.

El proyecto cumple con el objetivo de construir un MVP funcional con una transacción de negocio y pantallas CRUD ejecutables, manteniendo trazabilidad entre el modelo, el prototipo y el código.

## Tecnologías utilizadas

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- H2 Database
- Maven

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router DOM
- HTML
- CSS

## Estructura del proyecto

eventos-boletas-app/
│
├── backend/
│   ├── src/main/java/co/edu/uniquindio/backend/
│   │   ├── BackendApplication.java
│   │   ├── model/
│   │   │   ├── Cliente.java
│   │   │   ├── Evento.java
│   │   │   ├── Compra.java
│   │   │   └── Boleto.java
│   │   ├── repository/
│   │   │   ├── ClienteRepository.java
│   │   │   ├── EventoRepository.java
│   │   │   ├── CompraRepository.java
│   │   │   └── BoletoRepository.java
│   │   ├── controller/
│   │   │   ├── ClienteController.java
│   │   │   ├── EventoController.java
│   │   │   └── CompraController.java
│   │   ├── service/
│   │   │   └── CompraService.java
│   │   └── dto/
│   │       └── CompraRequestDTO.java
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   └── pom.xml
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── api/
    │   │   └── api.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── EventoForm.jsx
    │   └── pages/
    │       ├── ComprarBoleto.jsx
    │       ├── ClientesCrud.jsx
    │       └── EventosCrud.jsx

## Modelo de dominio

El sistema se basa en cuatro entidades principales:

### Cliente

Representa a la persona que puede realizar compras de boletos.

Atributos principales:

- idCliente
- nombre
- email
- telefono
- estado

### Evento

Representa un evento disponible para la venta de boletos.

Atributos principales:

- idEvento
- nombre
- fecha
- lugar
- capacidad
- boletosDisponibles
- estadoEvento

### Compra

Representa una transacción realizada por un cliente.

Atributos principales:

- idCompra
- fechaCompra
- total
- metodoPago
- estadoCompra

### Boleto

Representa cada boleto generado en una compra.

Atributos principales:

- idBoleto
- tipo
- precio
- estadoBoleto
- fechaCompra

## Relaciones principales

Cliente 1 ---- 0..* Compra

Compra 1 ---- 1..* Boleto

Evento 1 ---- 0..* Boleto

Un cliente puede realizar varias compras. Una compra puede generar uno o varios boletos. Un evento puede tener muchos boletos asociados.

## Funcionalidades del sistema

### Gestión de clientes

El sistema permite:

- Listar clientes.
- Crear clientes.
- Editar clientes.
- Eliminar clientes.

Campos principales:

- Nombre
- Email
- Teléfono
- Estado

### Gestión de eventos

El sistema permite:

- Listar eventos.
- Crear eventos.
- Editar eventos.
- Eliminar eventos.

Campos principales:

- Nombre del evento
- Fecha
- Lugar
- Capacidad
- Boletos disponibles
- Estado del evento

### Compra de boletos

Esta es la transacción principal del sistema.

El usuario puede:

- Seleccionar un cliente.
- Seleccionar un evento.
- Ingresar la cantidad de boletos.
- Seleccionar el tipo de boleto.
- Ingresar el precio unitario.
- Seleccionar el método de pago.
- Confirmar la compra.

Al confirmar la compra, el sistema valida las reglas de negocio, registra la compra, genera los boletos y descuenta la cantidad comprada de los boletos disponibles del evento.

## Reglas de negocio

1. Un cliente solo puede comprar boletos si su estado es ACTIVO.
2. No se pueden comprar boletos para eventos con estado CANCELADO o FINALIZADO.
3. La cantidad de boletos debe ser mayor a cero.
4. No se puede comprar una cantidad mayor a los boletos disponibles del evento.
5. Al confirmar una compra, el sistema descuenta los boletos disponibles del evento.
6. Cada boleto generado queda con estado VENDIDO.
7. El total de la compra se calcula multiplicando la cantidad de boletos por el precio unitario.
8. Toda compra confirmada queda registrada con fecha actual y estado CONFIRMADA.

## Endpoints del backend

### Clientes

GET    /api/clientes
GET    /api/clientes/{id}
POST   /api/clientes
PUT    /api/clientes/{id}
DELETE /api/clientes/{id}

### Eventos

GET    /api/eventos
GET    /api/eventos/{id}
POST   /api/eventos
PUT    /api/eventos/{id}
DELETE /api/eventos/{id}

### Compras

POST   /api/compras

## Cómo ejecutar el backend

Primero se debe ingresar a la carpeta del backend:

cd backend

Luego se ejecuta el proyecto con Maven:

mvn spring-boot:run

El backend quedará disponible en:

http://localhost:8080

Para verificar que el backend funciona, se puede abrir en el navegador:

http://localhost:8080/api/clientes

Si aparece una lista vacía o datos en formato JSON, significa que el backend está funcionando correctamente.

## Base de datos H2

El proyecto utiliza H2 Database como base de datos en memoria para pruebas.

La consola de H2 se puede abrir en:

http://localhost:8080/h2-console

Datos de conexión:

JDBC URL: jdbc:h2:mem:eventosdb
User Name: sa
Password:

La contraseña se deja vacía.

## Cómo ejecutar el frontend

Primero se debe ingresar a la carpeta del frontend:

cd frontend

Luego se instalan las dependencias:

npm install

Después se inicia el servidor de desarrollo:

npm run dev

El frontend quedará disponible en:

http://localhost:5173

## Conexión entre frontend y backend

El frontend se conecta con el backend mediante Axios.

El archivo encargado de esta conexión es:

frontend/src/api/api.js

La URL base usada por el frontend es:

http://localhost:8080/api

Esto permite consumir los endpoints del backend desde las pantallas de React.

## Orden recomendado para probar el sistema

1. Ejecutar el backend.
2. Ejecutar el frontend.
3. Entrar a http://localhost:5173.
4. Ir a la pantalla de Clientes.
5. Crear un cliente con estado ACTIVO.
6. Ir a la pantalla de Eventos.
7. Crear un evento con estado ACTIVO y boletos disponibles.
8. Ir a la pantalla Comprar Boleto.
9. Seleccionar el cliente.
10. Seleccionar el evento.
11. Ingresar cantidad de boletos, tipo de boleto, precio unitario y método de pago.
12. Confirmar la compra.
13. Verificar que los boletos disponibles del evento disminuyan.

## Datos de prueba

### Cliente de prueba

Nombre: Jose Manuel Rodriguez
Email: jose@email.com
Teléfono: 3001234567
Estado: ACTIVO

### Evento de prueba

Nombre: Concierto Armenia Fest
Fecha: 2026-06-20
Lugar: Coliseo del Café
Capacidad: 100
Boletos disponibles: 100
Estado: ACTIVO

### Compra de prueba

Cliente: Jose Manuel Rodriguez
Evento: Concierto Armenia Fest
Cantidad de boletos: 2
Tipo de boleto: GENERAL
Precio unitario: 50000
Método de pago: EFECTIVO

## Pruebas manuales sugeridas

### Caso 1: Compra exitosa

Dado que existe un cliente ACTIVO y un evento ACTIVO con boletos disponibles, cuando el usuario realiza una compra, entonces el sistema registra la compra y descuenta los boletos disponibles del evento.

### Caso 2: Cliente inactivo

Dado que existe un cliente con estado INACTIVO, cuando intenta comprar boletos, entonces el sistema bloquea la compra y muestra un mensaje de error.

### Caso 3: Evento cancelado

Dado que existe un evento con estado CANCELADO, cuando se intenta comprar un boleto, entonces el sistema bloquea la compra y no genera boletos.

### Caso 4: Boletos insuficientes

Dado que un evento tiene menos boletos disponibles que la cantidad solicitada, cuando el usuario intenta realizar la compra, entonces el sistema bloquea la operación y mantiene la cantidad de boletos disponibles sin cambios.

## Estado actual del proyecto

El proyecto cuenta con:

- Backend funcional en Spring Boot.
- Entidades del dominio modeladas.
- Repositorios JPA.
- Controladores REST.
- Servicio de compra con reglas de negocio.
- Frontend en React.
- Pantalla de compra de boletos.
- CRUD de clientes.
- CRUD de eventos.
- Conexión entre frontend y backend mediante Axios.

## Notas importantes

- El backend debe estar corriendo antes de usar el frontend.
- El backend usa el puerto 8080.
- El frontend usa el puerto 5173.
- La base de datos H2 es en memoria.
- Al apagar el backend, los datos registrados se reinician.
- Para una versión futura se puede conectar el sistema a una base de datos persistente como MySQL o PostgreSQL.

## Conclusión

El sistema de eventos y boletas permite validar una transacción de negocio completa mediante la compra de boletos. Además, incluye funcionalidades CRUD para administrar clientes y eventos, manteniendo una separación clara entre frontend y backend.
