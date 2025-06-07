# FitLife Gym Website

Sitio web para el gimnasio FitLife implementado con una arquitectura de microservicios usando Docker.

## Estructura

- **Frontend**: Aplicación web estática servida por Nginx
  - HTML5, CSS3, JavaScript
  - Bootstrap para los estilos
  - Formulario de contacto interactivo

- **Backend**: API REST en Node.js
  - Express.js
  - Manejo de formulario de contacto
  - CORS habilitado

## Requisitos

- Docker
- Docker Compose

## Instalación

1. Clona el repositorio
```bash
git clone <url-del-repositorio>
```

2. Inicia los contenedores
```bash
docker-compose up -d
```

## Uso

- Frontend: http://localhost:8080
- Backend API: http://localhost:3000

## Endpoints API

### POST /api/contacto
Envía un mensaje de contacto.

Payload:
```json
{
  "nombre": "string",
  "email": "string",
  "mensaje": "string"
}
```

## Desarrollo

Para modificar el proyecto:

1. Frontend: Modifica los archivos en `/Frontend`
   - index.html
   - style.css
   - script.js

2. Backend: Modifica `/Backend/app.js`

3. Reconstruye los contenedores si es necesario:
```bash
docker-compose up -d --build
```