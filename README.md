# Loopify

Este es el examen de medio curso de Uziel Omar Flores Torres para la materia "Programacion web".

---

## Informacion del Alumno

- **Nombre:** Uziel Omar Flores Torres
- **Matricula:** 2177709
- **Carrera:** ITS

---

## Descripcion del Proyecto

Loopify es una mini red social estilo Feed de publicaciones desarrollada como proyecto academico para la materia de Programacion Web. La aplicacion permite a los usuarios crear, editar y eliminar publicaciones, asi como interactuar con ellas mediante un sistema de likes y comentarios.

> **Nota:** La API externa original proporcionada por el profesor Luis Daniel Lepe Rodriguez ya no esta disponible. Esta version (rama `demo`) ha sido modificada para funcionar con datos estaticos almacenados en localStorage, permitiendo simular todas las funcionalidades de la red social sin necesidad de un servidor.

---

## Proposito

El proposito de este proyecto es aplicar los conocimientos adquiridos durante el semestre en la materia de Programacion Web, incluyendo:

- Desarrollo de interfaces web responsivas y atractivas
- Manipulacion dinamica del DOM
- Gestion de datos con localStorage
- Gestion de eventos e interactividad
- Implementacion de patrones de diseno de interfaces de usuario
- Simulacion de operaciones CRUD (Create, Read, Update, Delete)

---

## Funcionalidades

### Pagina de Inicio (index.html)
- Feed de publicaciones con las mas recientes
- Formulario para crear nuevas publicaciones
- Sistema de likes para cada publicacion
- Visualizacion de detalles de publicacion

### Perfil de Usuario (mi-perfil.html)
- Informacion del perfil de usuario
- Seccion de publicaciones propias
- Formulario para crear nuevas publicaciones
- Opciones de edicion y eliminacion de publicaciones propias

### Seccion "Tu Informacion" (mi-perfil-informacion.html)
- Datos personales del usuario (nombre, matricula, descripcion)
- Estadisticas de actividad

### Seccion "Tus Me Gusta" (mi-perfil-me-gusta.html)
- Lista de publicaciones a las que el usuario ha dado like
- Visualizacion y navegacion a cada publicacion

### Vista de Publicacion (publicacion.html)
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
- **Persistencia de datos:** Los datos se guardan en localStorage y persisten entre sesiones

---

## Arquitectura

### Patron de Diseno
El proyecto sigue un patron de arquitectura MVC (Modelo-Vista-Controlador) simplificado en el lado del cliente:

- **Modelo:** Datos y logica de negocio contenidos en los scripts JavaScript (datos en localStorage)
- **Vista:** Archivos HTML que definen la estructura y contenido de cada pagina
- **Controlador:** Scripts JavaScript que gestionan la logica de interactividad y manipulacion de datos

### Sistema de Datos

El proyecto utiliza **localStorage** para almacenar y persistir los datos:

| Clave localStorage | Descripcion |
|--------------------|-------------|
| `loopify_initialized` | Bandera que indica si los datos iniciales han sido cargados |
| `loopify_publicaciones` | Array JSON de todas las publicaciones |
| `loopify_comentarios` | Array JSON de todos los comentarios |
| `loopify_proximoIdPublicacion` | Contador para generar IDs unicos de publicaciones |
| `loopify_proximoIdComentario` | Contador para generar IDs unicos de comentarios |

### Estructura de Archivos

```
Loopify/
|
|-- index.html                              # Pagina principal - Feed de publicaciones
|-- mi-perfil.html                          # Perfil del usuario con sus publicaciones
|-- mi-perfil-informacion.html              # Informacion personal del usuario
|-- mi-perfil-me-gusta.html                 # Publicaciones liked por el usuario
|-- publicacion.html                        # Vista detallada de una publicacion
|
|-- Scripts/
|   |-- Script-general.js                   # Sistema de datos y funciones compartidas
|   |-- Script-index.js                     # Logica de la pagina de inicio
|   |-- Script-mi-perfil.js                 # Logica de la pagina de perfil (responsive)
|   |-- Script-mi-perfil-posts.js           # Logica de publicaciones en perfil
|   |-- Script-mi-perfil-me-gusta-posts.js  # Logica de seccion de likes
|   |-- Script-publicacion.js               # Logica de vista de publicacion
|
|-- Styles/
|   |-- Style.css                           # Estilos CSS personalizados
|
|-- Imagenes/
|   |-- Logo.png                            # Logo principal de Loopify
|   |-- Logo-icono.png                      # Icono del logo
|   |-- Foto-portada.jpg                    # Imagen de portada del perfil
|   |-- Perfil-Uziel-Omar-Flores-Torres.png # Foto de perfil del usuario
|   |-- Perfil.png                          # Foto generica para otros usuarios
|
|-- README.md                              # Documentacion del proyecto
|-- CONTRIBUTING.md                        # Guia tecnica del proyecto
|-- LICENSE                                # Licencia del proyecto
```

### Modelo de Datos

#### Publicacion
```javascript
{
    idPublicacion: 1,
    idUsuario: "2177709",
    nombre: "Uziel Omar Flores Torres",
    contenido: "Texto de la publicacion",
    fechaPublicacion: "2024-03-15T10:30:00.000Z",
    cantidadLikes: 5,
    cantidadComentarios: 3,
    likePropio: true
}
```

#### Comentario
```javascript
{
    idComentario: 1,
    idPublicacion: 1,
    idUsuario: "2177709",
    nombre: "Uziel Omar Flores Torres",
    contenido: "Texto del comentario",
    fechaPublicacion: "2024-03-15T11:00:00.000Z",
    likePropio: false
}
```

---

## Herramientas y Tecnologias

### Frontend
- **HTML5:** Lenguaje de marcado para la estructura de las paginas
- **CSS3:** Estilos personalizados para el diseno visual
- **JavaScript (ES6+):** Logica de programacion del lado del cliente

### Frameworks y Librerias
- **Bootstrap 5.3.3:** Framework CSS para diseno responsivo y componentes UI
- **Bootstrap Icons:** Biblioteca de iconos vectoriales
- **jQuery 3.7.1:** Libreria JavaScript para manipulacion del DOM y eventos
- **Moment.js 2.29.1:** Libreria para manipulacion y formateo de fechas
- **SweetAlert2:** Libreria para ventanas de alertas personalizadas

### Almacenamiento
- **localStorage:** API de almacenamiento web para persistencia de datos en el navegador

### Herramientas de Desarrollo
- **Visual Studio Code:** Editor de codigo fuente
- **Git:** Sistema de control de versiones
- **GitHub:** Plataforma de alojamiento de codigo

---

## Requisitos del Sistema

### Para Ejecutar el Proyecto
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexion a internet (para cargar librerias CDN)
- Servidor web local (opcional, para mejor compatibilidad)

### Navegadores Soportados
- Google Chrome (ultima version)
- Mozilla Firefox (ultima version)
- Microsoft Edge (ultima version)
- Safari (ultima version)

### Requisitos de Almacenamiento
- El navegador debe tener habilitada la opcion de localStorage
- Se recomienda no limpiar los datos del sitio para mantener las publicaciones

---

## Instalacion y Uso

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/1Mr-Robot/Loopify.git
   ```

2. **Cambiar a la rama demo:**
   ```bash
   git checkout demo
   ```

3. **Abrir el proyecto:**
   - Opcion A: Abrir `index.html` directamente en el navegador
   - Opcion B: Usar un servidor local como Live Server en VS Code

4. **Explorar la aplicacion:**
   - Al abrir la pagina por primera vez, se cargaran datos de ejemplo automaticamente
   - Puedes crear nuevas publicaciones, dar likes y escribir comentarios
   - Todos los cambios se guardan automaticamente en localStorage

---

## Diferencias con la Version Original (API)

| Caracteristica | Version Original (API) | Version Demo (localStorage) |
|----------------|------------------------|----------------------------|
| Fuente de datos | API REST externa | localStorage del navegador |
| Persistencia | Servidor | Navegador del usuario |
| Usuarios multiples | Si | No (un solo usuario simulado) |
| Operacion offline | No | Si |
| Dependencias externas | API del profesor | Solo CDN de librerias |

---

## Notas Importantes

- **Datos iniciales:** Al abrir la aplicacion por primera vez, se cargan automaticamente datos de ejemplo con 5 publicaciones y 5 comentarios de prueba.
- **Reiniciar datos:** Para restaurar los datos iniciales, abre las herramientas de desarrollador (F12), ve a Application > Local Storage, y elimina todas las claves que empiecen con `loopify_`.
- **Tema oscuro:** La aplicacion utiliza un tema oscuro por defecto para una mejor experiencia visual.
- **Simulacion de retraso:** Las operaciones CRUD tienen un pequeno retraso artificial (300-700ms) para simular la latencia de red y mostrar estados de carga.

---

## Creditos

- **Desarrollador:** Uziel Omar Flores Torres
- **Profesor:** Luis Daniel Lepe Rodriguez
- **Institucion:** Universidad Autonoma de Nuevo Leon (UANL)
- **Materia:** Programacion Web