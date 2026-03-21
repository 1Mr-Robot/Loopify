# Loopify

Este es el examen de medio curso de Uziel Omar Flores Torres para la materia "Programación web".

Este proyecto consiste en una mi red social que consume de una API creada por el profesor Luis Daniel Lepe Rodriguez.

Actualmente la API se encuentra cerrada y ya no se puede acceder más.

---

## Informacion del Alumno

- **Nombre:** Uziel Omar Flores Torres
- **Matricula:** 2177709
- **Carrera:** ITS

---

## Descripcion del Proyecto

Loopify es una mini red social estilo Feed de publicaciones desarrollada como proyecto academico para la materia de Programacion Web. La aplicacion permite a los usuarios crear, editar y eliminar publicaciones, asi como interactuar con ellas mediante un sistema de likes y comentarios.

El proyecto fue desarrollado utilizando tecnologias web del lado del cliente (HTML, CSS, JavaScript) y consume una API REST externa proporcionada por el profesor Luis Daniel Lepe Rodriguez.

---

## Proposito

El proposito de este proyecto es aplicar los conocimientos adquiridos durante el semestre en la materia de Programacion Web, incluyendo:

- Desarrollo de interfaces web responsivas y atractivas
- Consumo de APIs REST mediante AJAX
- Manipulacion dinamica del DOM
- Gestion de eventos e interactividad
- Implementacion de patrones de diseno de interfaces de usuario

---

## Funcionalidades

### Pagina de Inicio (index.html)
- Feed de publicaciones con las mas recientes
- Formulario para crear nuevas publicaciones
- Sistema de likes para cada publicacion
- Visualizacion de detalles de publicacion

### Perfil de Usuario (mi perfil.html)
- Informacion del perfil de usuario
- Seccion de publicaciones propias
- Formulario para crear nuevas publicaciones
- Opciones de edicion y eliminacion de publicaciones propias

### Seccion "Tu Informacion" (mi perfil - informacion.html)
- Datos personales del usuario (nombre, matricula, descripcion)
- Estadisticas de actividad

### Seccion "Tus Me Gusta" (mi perfil - me gusta.html)
- Lista de publicaciones a las que el usuario ha dado like
- Visualizacion y navegacion a cada publicacion

### Vista de Publicacion (vista-publicacion.html)
- Vista detallada de una publicacion individual
- Sistema de comentarios
- Seccion para escribir nuevos comentarios
- Opciones de edicion y eliminacion de comentarios propios

### Funcionalidades Comunes
- **Crear publicaciones:** Los usuarios pueden escribir y publicar contenido de texto
- **Editar publicaciones:** Los usuarios pueden modificar el contenido de sus propias publicaciones
- **Eliminar publicaciones:** Los usuarios pueden eliminar sus propias publicaciones
- **Sistema de likes:** Los usuarios pueden dar o quitar like a cualquier publicacion
- **Sistema de comentarios:** Los usuarios pueden comentar en cualquier publicacion
- **Validacion de formularios:** Validacion del lado del cliente para todos los formularios
- **Notificaciones de error:** Uso de SweetAlert2 para mostrar mensajes de error amigables

---

## Arquitectura

### Patron de Diseno
El proyecto sigue un patron de arquitectura MVC (Modelo-Vista-Controlador) simplificado en el lado del cliente:

- **Modelo:** Datos y logica de negocio contenidos en los scripts JavaScript
- **Vista:** Archivos HTML que definen la estructura y contenido de cada pagina
- **Controlador:** Scripts JavaScript que gestionan la logica de interactividad y comunicacion con la API

### Estructura de Archivos

```
Loopify/
|
|-- index.html                 # Pagina principal - Feed de publicaciones
|-- mi perfil.html             # Perfil del usuario con sus publicaciones
|-- mi perfil - informacion.html    # Informacion personal del usuario
|-- mi perfil - me gusta.html        # Publicaciones liked por el usuario
|-- vista-publicacion.html     # Vista detallada de una publicacion
|
|-- Scripts/
|   |-- Script general.js      # Funciones compartidas (likes, editar, eliminar)
|   |-- Script index.js        # Logica de la pagina de inicio
|   |-- Script mi perfil.js    # Logica de la pagina de perfil
|   |-- Script mi perfil posts.js    # Logica de publicaciones en perfil
|   |-- Script mi perfil - me gusta posts.js    # Logica de likes
|   |-- Script vista-publicacion.js   # Logica de vista de publicacion
|
|-- Styles/
|   |-- Style.css               # Estilos CSS personalizados
|
|-- Imagenes/
|   |-- Logo.png                # Logo principal de Loopify
|   |-- Logo icono.png          # Icono del logo
|   |-- Foto portada.jpg        # Imagen de portada del perfil
|   |-- Perfil - Uziel Omar Flores Torres.png   # Foto de perfil
|
|-- README.md                  # Documentacion del proyecto
|-- LICENSE                    # Licencia del proyecto
```

### Comunicacion con la API

El proyecto se comunica con una API REST externa mediante AJAX (jQuery). La configuracion de la API se encuentra en `Scripts/Script general.js`:

```javascript
var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78";
var dominio = "https://redsocial.luislepe.tech/api/";
```

La API soporta las siguientes operaciones:

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | Publicaciones | Obtener todas las publicaciones |
| GET | Publicaciones/{id} | Obtener una publicacion especifica |
| POST | Publicaciones | Crear una nueva publicacion |
| PUT | Publicaciones/{id} | Actualizar una publicacion |
| DELETE | Publicaciones/{id} | Eliminar una publicacion |
| POST | Likes | Crear un like |
| DELETE | Likes | Eliminar un like |

---

## Herramientas y Tecnologias

### Frontend
- **HTML5:** Lenguaje de marcado para la estructura de las paginas
- **CSS3:** Estilos personalizados para el diseno visual
- **JavaScript (ES6+):** Logica de programacion del lado del cliente

### Frameworks y Librerias
- **Bootstrap 5.3.3:** Framework CSS para diseno responsivo y componentes UI
- **Bootstrap Icons:** Biblioteca de iconos basada en Bootstrap
- **jQuery 3.7.1:** Libreria JavaScript para manipulacion del DOM y AJAX
- **Moment.js 2.29.1:** Libreria para manipulacion y formateo de fechas
- **SweetAlert2:** Libreria para ventanas de alertas personalizadas y atractivas

### Herramientas de Desarrollo
- **Visual Studio Code:** Editor de codigo fuente
- **Git:** Sistema de control de versiones
- **GitHub:** Plataforma de alojamiento de codigo

### APIs Externas
- **Red Social API:** API REST proporcionada por el profesor Luis Daniel Lepe Rodriguez (actualmente fuera de servicio)

---

## Requisitos del Sistema

### Para Ejecutar el Proyecto
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexion a internet (para cargar librerias CDN y consumir la API)
- Servidor web local (opcional, para mejor compatibilidad con CORS)

### Navegadores Soportados
- Google Chrome (ultima version)
- Mozilla Firefox (ultima version)
- Microsoft Edge (ultima version)
- Safari (ultima version)

---

## Instalacion y Uso

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/1Mr-Robot/Loopify.git
   ```

2. **Abrir el proyecto:**
   - Opcion A: Abrir `index.html` directamente en el navegador
   - Opcion B: Usar un servidor local como Live Server en VS Code

3. **Navegar por la aplicacion:**
   - Pagina de inicio: Ver el feed de publicaciones
   - Perfil: Ver y gestionar publicaciones propias
   - Tu informacion: Ver datos personales
   - Tus me gusta: Ver publicaciones liked

---

## Notas Importantes

- **Estado de la API:** La API externa proporcionada por el profesor esta actualmente fuera de servicio. El proyecto funciona correctamente pero no puede realizar operaciones con el servidor.
- **Datos de prueba:** Los datos mostrados son datos estáticos para mostrar el funcionamiento del proyecto.
- **Tema oscuro:** La aplicacion utiliza un tema oscuro por defecto para una mejor experiencia visual.

---

## Creditos

- **Desarrollador:** Uziel Omar Flores Torres
- **Profesor:** Luis Daniel Lepe Rodriguez
- **Institucion:** Universidad Autonoma de Nuevo Leon (UANL)
- **Materia:** Programacion Web