# Guia Tecnica de Contribucion - Loopify

Este documento contiene toda la informacion tecnica necesaria para entender, modificar y contribuir al proyecto Loopify.

---

## Tabla de Contenidos

1. [Configuracion del Entorno](#configuracion-del-entorno)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Tecnologias y Dependencias](#tecnologias-y-dependencias)
4. [API REST](#api-rest)
5. [Modulo de Configuracion](#modulo-de-configuracion)
6. [Script General](#script-general)
7. [Script Index](#script-index)
8. [Script Mi Perfil](#script-mi-perfil)
9. [Script Mi Perfil Posts](#script-mi-perfil-posts)
10. [Script Mi Perfil Me Gusta Posts](#script-mi-perfil-me-gusta-posts)
11. [Script Vista Publicacion](#script-vista-publicacion)
12. [Estructura HTML](#estructura-html)
13. [Estilos CSS](#estilos-css)
14. [Comunicacion entre Paginas](#comunicacion-entre-paginas)
15. [Manejo de Errores](#manejo-de-errores)
16. [Validacion de Formularios](#validacion-de-formularios)
17. [Convenciones de Codigo](#convenciones-de-codigo)

---

## Configuracion del Entorno

### Requisitos Previos
- Navegador web moderno (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- Editor de codigo (Visual Studio Code recomendado)
- Servidor local para desarrollo (opcional pero recomendado)

### Instalacion para Desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/1Mr-Robot/Loopify.git
   ```

2. **Abrir en Visual Studio Code:**
   ```bash
   code .
   ```

3. **Usar Live Server (recomendado):**
   - Instalar extension "Live Server" en VS Code
   - Click derecho en `index.html`
   - Seleccionar "Open with Live Server"

### Variables de Configuracion Globales

Cada script define las siguientes variables al inicio:

```javascript
var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78";
var dominio = "https://redsocial.luislepe.tech/api/";
```

- `matricula`: Identificador unico del usuario (tambien usado como idUsuario)
- `llave`: Token de autenticacion para la API (llave secreta)
- `dominio`: URL base de la API REST

---

## Estructura del Proyecto

```
Loopify/
|
|-- index.html                      # Pagina principal - Feed de publicaciones
|                                     # Carga: Script general.js, Script index.js
|
|-- mi perfil.html                   # Perfil del usuario
|                                     # Carga: Script general.js, Script mi perfil posts.js,
|                                     #         Script mi perfil.js
|
|-- mi perfil - informacion.html     # Informacion del perfil (estatica)
|
|-- mi perfil - me gusta.html        # Lista de publicaciones liked
|                                     # Carga: Script general.js,
|                                     #         Script mi perfil - me gusta posts.js
|
|-- vista-publicacion.html           # Vista detallada de publicacion
|                                     # Carga: Script general.js,
|                                     #         Script vista-publicacion.js
|
|-- Scripts/
|   |-- Script general.js            # Funciones compartidas (CRUD likes, editar, eliminar)
|   |-- Script index.js              # Logica del feed principal
|   |-- Script mi perfil.js          # Logica de ajuste responsivo del perfil
|   |-- Script mi perfil posts.js    # Logica de publicaciones del perfil
|   |-- Script mi perfil - me gusta posts.js  # Logica de seccion likes
|   |-- Script vista-publicacion.js # Logica de vista de publicacion y comentarios
|
|-- Styles/
|   |-- Style.css                    # Estilos personalizados globales
|
|-- Imagenes/                        # Recursos graficos
|   |-- Logo.png                     # Logo principal
|   |-- Logo icono.png               # Icono del logo (favicon)
|   |-- Foto portada.jpg             # Imagen de portada
|   |-- Perfil - Uziel Omar Flores Torres.png  # Foto de perfil del usuario
|   |-- Perfil.png                   # Foto de perfil generica (otros usuarios)
|
|-- README.md                        # Documentacion general
|-- CONTRIBUTING.md                  # Este archivo
|-- LICENSE                          # Licencia del proyecto
```

---

## Tecnologias y Dependencias

### Librerias CDN Utilizadas

| Libreria | Version | Uso | CDN |
|----------|---------|-----|-----|
| **jQuery** | 3.7.1 | Manipulacion DOM, AJAX | `https://code.jquery.com/jquery-3.7.1.js` |
| **Bootstrap** | 5.3.3 | Framework CSS, componentes UI | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css` |
| **Bootstrap JS** | 5.3.3 | Componentes interactivos | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js` |
| **Bootstrap Icons** | - | Iconos vectoriales | `https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css` |
| **Moment.js** | 2.29.1 | Formateo de fechas | `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js` |
| **Moment.js Locale ES** | 2.29.1 | Localizacion en espanol | `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/locale/es.min.js` |
| **SweetAlert2** | 11 | Alertas personalizadas | `https://cdn.jsdelivr.net/npm/sweetalert2@11` |

### Integridad de Recursos (SRI)

El proyecto utiliza Subresource Integrity (SRI) para verificar la integridad de los recursos CDN:

```html
<script src="https://code.jquery.com/jquery-3.7.1.js" 
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" 
        crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
        crossorigin="anonymous"></script>
```

---

## API REST

### Endpoints de la API

La API REST consume datos del endpoint base: `https://redsocial.luislepe.tech/api/`

#### Publicaciones

| Metodo | Endpoint | Descripcion | Parametros |
|--------|----------|-------------|------------|
| GET | `Publicaciones/all/{idUsuario}` | Obtener todas las publicaciones | `idUsuario` (string) |
| GET | `Publicaciones/{idUsuario}/{idPublicacion}` | Obtener una publicacion especifica | `idUsuario`, `idPublicacion` (strings) |
| POST | `Publicaciones` | Crear una publicacion | Body JSON |
| PUT | `Publicaciones/{idPublicacion}` | Actualizar una publicacion | Body JSON |
| DELETE | `Publicaciones/{idPublicacion}` | Eliminar una publicacion | Body JSON |

#### Likes

| Metodo | Endpoint | Descripcion | Parametros |
|--------|----------|-------------|------------|
| GET | `Likes/{idUsuario}/{idFiltro}` | Obtener publicaciones liked | `idUsuario`, `idFiltro` (strings) |
| POST | `Likes` | Crear un like | Body JSON |
| DELETE | `Likes` | Eliminar un like | Body JSON |

#### Comentarios

| Metodo | Endpoint | Descripcion | Parametros |
|--------|----------|-------------|------------|
| GET | `Comentarios/Publicacion/{idUsuario}/{idPublicacion}` | Obtener comentarios de una publicacion | `idUsuario`, `idPublicacion` (strings) |
| GET | `Comentarios/{idUsuario}/{idComentario}` | Obtener un comentario especifico | `idUsuario`, `idComentario` (strings) |
| POST | `Comentarios` | Crear un comentario | Body JSON |
| PUT | `Comentarios/{idComentario}` | Actualizar un comentario | Body JSON |
| DELETE | `Comentarios/{idComentario}` | Eliminar un comentario | Body JSON |

### Formato de Datos JSON

#### Publicacion (Request/Response)
```json
{
    "idPublicacion": 123,
    "idUsuario": "2177709",
    "nombre": "Uziel Omar Flores Torres",
    "contenido": "Texto de la publicacion",
    "fechaPublicacion": "2024-03-15T10:30:00.000Z",
    "cantidadLikes": 5,
    "cantidadComentarios": 3,
    "likePropio": true
}
```

#### Like (Request)
```json
{
    "idPublicacion": 123,
    "idUsuario": "2177709",
    "llave_Secreta": "5912fdbc-39b0-4071-ba39-71e52e188d78"
}
```

#### Like (Response)
```json
{
    "idLike": 456,
    "idPublicacion": 123,
    "idUsuario": "2177709"
}
```

#### Comentario (Request/Response)
```json
{
    "idComentario": 789,
    "idPublicacion": 123,
    "idUsuario": "2177709",
    "nombre": "Uziel Omar Flores Torres",
    "contenido": "Texto del comentario",
    "fechaPublicacion": "2024-03-15T11:00:00.000Z",
    "likePropio": false
}
```

### Codigos de Respuesta HTTP

| Codigo | Significado | Manejo en el Proyecto |
|--------|-------------|------------------------|
| 200 | OK | Operacion exitosa |
| 400 | Bad Request | Publicacion vacia o muy larga (3-500 caracteres) |
| 401 | Unauthorized | Credenciales invalidas |
| 429 | Too Many Requests | Rate limit - esperar 1 minuto entre publicaciones |
| 500 | Internal Server Error | Error del servidor |

---

## Modulo de Configuracion

### Ubicacion
`Scripts/Script general.js` (lineas 1-3)

### Descripcion
Contiene las variables globales de configuracion utilizadas en todas las paginas.

```javascript
var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78";
var dominio = "https://redsocial.luislepe.tech/api/";
```

### Notas de Implementacion
- Estas variables se redeclaran en cada script para mantener autonomia
- Los scripts solo reasignan estas variables si necesitan usarlas
- La `llave` es un token de autenticacion de la API (no debe exponerse en produccion)

---

## Script General

### Ubicacion
`Scripts/Script general.js`

### Proposito
Contiene funciones compartidas y reutilizables usadas en multiples paginas.

### Funciones Principales

#### `editarPublicacion(idPub, nuevoContenido)`
Edita el contenido de una publicacion existente.

```javascript
function editarPublicacion(idPub, nuevoContenido)
```

**Parametros:**
- `idPub` (string/number): ID de la publicacion a editar
- `nuevoContenido` (string): Nuevo texto para la publicacion

**Metodo HTTP:** PUT
**Endpoint:** `dominio + "Publicaciones/" + idPub`

**Cuerpo de la solicitud:**
```json
{
    "idPublicacion": idPub,
    "idUsuario": matricula,
    "contenido": nuevoContenido,
    "llave_Secreta": llave
}
```

**Comportamiento:**
1. Envia solicitud PUT a la API
2. Si tiene exito, actualiza el DOM directamente
3. Si falla, muestra SweetAlert con el codigo de error

---

#### `eliminarPublicacion(idPub)`
Elimina una publicacion del servidor y del DOM.

```javascript
function eliminarPublicacion(idPub)
```

**Parametros:**
- `idPub` (string/number): ID de la publicacion a eliminar

**Metodo HTTP:** DELETE
**Endpoint:** `dominio + "Publicaciones/" + idPub`

**Cuerpo de la solicitud:**
```json
{
    "idPublicacion": idPub,
    "idUsuario": matricula,
    "contenido": "a",
    "llave_Secreta": llave
}
```

**Comportamiento:**
1. Envia solicitud DELETE a la API
2. Si tiene exito, remueve el elemento del DOM con jQuery
3. Si falla, muestra SweetAlert con el codigo de error

---

#### `crearLike(idPub, botonLike)`
Crea un like en una publicacion.

```javascript
function crearLike(idPub, botonLike)
```

**Parametros:**
- `idPub` (string/number): ID de la publicacion
- `botonLike` (jQuery object): Referencia al elemento del boton de like

**Metodo HTTP:** POST
**Endpoint:** `dominio + "Likes"`

**Cuerpo de la solicitud:**
```json
{
    "idPublicacion": idPub,
    "idUsuario": matricula,
    "llave_Secreta": llave
}
```

**Comportamiento:**
1. Incrementa el contador de likes en 1
2. Cambia el icono de `bi-hand-thumbs-up` a `bi-hand-thumbs-up-fill`
3. Actualiza el texto del boton

---

#### `eliminarLike(idPub, botonLike)`
Elimina un like de una publicacion.

```javascript
function eliminarLike(idPub, botonLike)
```

**Parametros:**
- `idPub` (string/number): ID de la publicacion
- `botonLike` (jQuery object): Referencia al elemento del boton de like

**Metodo HTTP:** DELETE
**Endpoint:** `dominio + "Likes"`

**Comportamiento:**
1. Decrementa el contador de likes en 1
2. Cambia el icono de `bi-hand-thumbs-up-fill` a `bi-hand-thumbs-up`
3. Actualiza el texto del boton

---

### Delegacion de Eventos

El script utiliza delegacion de eventos de jQuery para manejar clicks en elementos dinamicos:

```javascript
$("#Publicaciones").on("click", ".likebtn", function () { ... });
$("#PublicacionesUsuario").on("click", ".likebtn", function () { ... });
$("#vistaPublicacion").on("click", ".likebtn", function () { ... });
```

**Nota:** La delegacion es necesaria porque las publicaciones se cargan dinamicamente despues de que el DOM esta listo.

---

### Modales de Edicion y Eliminacion

#### Modal de Edicion
```javascript
$("#modalEditar").on("show.bs.modal", function (event) { ... });
```
- Captura el contenido actual del textarea de edicion
- Almacena el ID de publicacion en el boton "Listo"

#### Modal de Eliminacion
```javascript
$("#modalEliminar").on("show.bs.modal", function (event) { ... });
```
- Almacena el ID de publicacion en el boton "Eliminar"

---

## Script Index

### Ubicacion
`Scripts/Script index.js`

### Proposito
Controla la funcionalidad de la pagina principal (feed de publicaciones).

### Funciones Principales

#### `Publicaciones()`
Carga todas las publicaciones del feed.

```javascript
function Publicaciones()
```

**Endpoint:** `dominio + "Publicaciones/all/" + matricula`

**Proceso:**
1. Realiza peticion GET a la API
2. Itera sobre cada publicacion en la respuesta
3. Genera el HTML dinamico segun el tipo de publicacion
4. Inserta las publicaciones en el contenedor `$("#Publicaciones")`

**Logica de Renderizado:**
- Si `likePropio` es true: icono filled
- Si el usuario es el dueno: muestra menu de opciones (editar/eliminar)
- Si no es el dueno: muestra foto generica de perfil

---

#### `PublicacionNueva(idPub)`
Carga una publicacion recien creada y la inserta al inicio.

```javascript
function PublicacionNueva(idPub)
```

**Endpoint:** `dominio + "Publicaciones/" + matricula + "/" + idPub`

**Diferencia con Publicaciones():**
- Usa `prepend()` en lugar de `append()`
- Inserta en `$("#Publicaciones")` y `$("#PublicacionesUsuario")`

---

#### `crearPublicacion()`
Envuelve la logica de crear una nueva publicacion.

```javascript
function crearPublicacion()
```

**Endpoint:** `dominio + "Publicaciones"`

**Manejo de Errores Especifico:**
```javascript
switch(codigoRespuesta) {
    case 400: // Contenido invalido
    case 401: // No autorizado
    case 429: // Rate limit
    case 500: // Error del servidor
    default:  // Error desconocido
}
```

---

### Formulario de Publicacion

```javascript
$("#publicar").submit(function (event) { ... });
```

**Comportamiento:**
1. Previene el envio por defecto del formulario
2. Valida que el campo no este vacio
3. Llama a `crearPublicacion()`
4. Limpia el campo de texto
5. Agrega la clase `was-validated` para mostrar feedback visual

---

### Navegacion a Vista de Publicacion

```javascript
$("#Publicaciones").on("click", ".combtn", function () { ... });
```

Al hacer clic en "Comentarios", almacena el ID de publicacion en `localStorage` y redirige a `vista-publicacion.html`.

---

### Auto-ajuste de Textarea

```javascript
texto.addEventListener("input", function() {
    this.style.height = "auto"
    let nuevaAlt = Math.min(this.scrollHeight, altmax)
    this.style.height = nuevaAlt + "px"
});
```

**Constante:** `altmax = 300` (altura maxima en pixeles)

---

## Script Mi Perfil

### Ubicacion
`Scripts/Script mi perfil.js`

### Proposito
Maneja el ajuste responsivo de elementos del perfil cuando cambia el tamano de la ventana.

### Funcion Principal

#### `ajustarCosas()`
Ajusta el tamano de elementos del perfil segun el ancho de la pantalla.

```javascript
function ajustarCosas()
```

**Punto de quiebre:** 576px

| Elemento | Desktop (>576px) | Mobile (<576px) |
|----------|------------------|-----------------|
| Botones | `btn-lg` | `btn-sm` |
| Foto perfil | `.perfil` (200px) | `.perfilxs` (100px) |
| Portada | `.portada` (300px) | `.portadaxs` (150px) |

**Eventos:**
```javascript
window.addEventListener("resize", ajustarCosas);
ajustarCosas(); // Ejecucion inicial
```

---

## Script Mi Perfil Posts

### Ubicacion
`Scripts/Script mi perfil posts.js`

### Proposito
Carga las publicaciones del usuario actual en su perfil.

### Funciones Principales

#### `PublicacionesUsuario()`
Obtiene las publicaciones del usuario actual.

```javascript
function PublicacionesUsuario()
```

**Endpoint:** `dominio + "Publicaciones/all/" + matricula + "/" + matricula`

**Diferencia con `Publicaciones()` en Script index.js:**
- El segundo parametro `matricula` indica que filtra solo las publicaciones del usuario

---

#### `crearPublicacion()`
Similar a Script index.js pero sin la logica de switch de errores detallada.

---

## Script Mi Perfil Me Gusta Posts

### Ubicacion
`Scripts/Script mi perfil - me gusta posts.js`

### Proposito
Carga las publicaciones que el usuario ha dado like.

### Funciones Principales

#### `PublicacionesLike()`
Obtiene las publicaciones liked por el usuario.

```javascript
function PublicacionesLike()
```

**Endpoint:** `dominio + "Likes/" + matricula + "/" + matricula`

---

#### `eliminarLikePost(idPub, botonLike)`
Elimina un like y remueve la publicacion de la lista.

```javascript
function eliminarLikePost(idPub, botonLike)
```

**Diferencia con `eliminarLike()` en Script general.js:**
- No decrementa el contador visualmente
- Remueve directamente la publicacion del DOM (`pub.remove()`)

---

## Script Vista Publicacion

### Ubicacion
`Scripts/Script vista-publicacion.js`

### Proposito
Maneja la vista detallada de una publicacion y su sistema de comentarios.

### Funciones Principales

#### `vistaPublicacion()`
Carga los datos de la publicacion actual.

```javascript
function vistaPublicacion()
```

**Endpoint:** `dominio + "Publicaciones/" + matricula + "/" + idPub`

**Fuente del ID:** `localStorage.getItem("idPub")`

---

#### `comentarios()`
Carga todos los comentarios de la publicacion.

```javascript
function comentarios()
```

**Endpoint:** `dominio + "Comentarios/Publicacion/" + matricula + "/" + idPub`

**Renderizado:**
- Los comentarios se insertan al final de la lista (`append()`)
- La publicacion principal se inserta al inicio (`prepend()`)

---

#### `crearComentario()`
Crea un nuevo comentario en la publicacion.

```javascript
function crearComentario()
```

**Endpoint:** `dominio + "Comentarios"`

**Comportamiento:**
1. Incrementa el contador de comentarios
2. Actualiza el boton de comentarios
3. Llama a `ComentarioNuevo()` para renderizar

---

#### `editarComentario(idCom, nuevoContenido)`
Edita un comentario existente.

```javascript
function editarComentario(idCom, nuevoContenido)
```

**Endpoint:** `dominio + "Comentarios/" + idCom`

**Metodo HTTP:** PUT

---

#### `eliminarComentario(idCom)`
Elimina un comentario de la publicacion.

```javascript
function eliminarComentario(idCom)
```

**Endpoint:** `dominio + "Comentarios/" + idCom`

**Metodo HTTP:** DELETE

**Comportamiento:**
1. Decrementa el contador de comentarios
2. Remueve el elemento del DOM
3. Verifica que no sea menor a 0

---

#### `ComentarioNuevo(idCom)`
Carga y renderiza un comentario recien creado.

```javascript
function ComentarioNuevo(idCom)
```

**Endpoint:** `dominio + "Comentarios/" + matricula + "/" + idCom`

---

### Modales Especificos

#### `modalEliminarVisPub`
Modal para eliminar la publicacion desde la vista de publicacion.

```javascript
$("#modalEliminarVisPub").on("show.bs.modal", function (event) { ... });
$("#footerEliminarVisPub .btn-danger").on("click", function () { ... });
```

#### `modalEditarCom` y `modalEliminarCom`
Modales para editar y eliminar comentarios.

---

## Estructura HTML

### Plantilla Base

Todas las paginas siguen la misma estructura base:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titulo de la Pagina</title>
    <!-- CDN CSS -->
    <!-- Estilos propios -->
    <!-- Favicon -->
</head>
<body class="bg-dark text-white">
    
    <!-- Navbar -->
    <nav class="navbar ... fixed-top">
        <!-- Navegacion -->
    </nav>

    <!-- Contenido Principal -->
    <div class="container" data-bs-theme="dark">
        <!-- Contenido especifico de la pagina -->
    </div>

    <!-- Footer -->
    <footer class="bg-dark-subtle ... py-5">
        <!-- Informacion del footer -->
    </footer>

    <!-- CDN JS (orden importante) -->
    <!-- Scripts propios -->
</body>
</html>
```

### Navbar

```html
<nav class="navbar navbar-expand-lg bg-dark-subtle border-bottom border-body fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
            <img src="Imagenes/Logo.png" alt="Logo" height="30" class="d-inline-block align-text-top logo me-2">
            Loopify
        </a>
        <!-- Menu toggle -->
        <!-- Navegacion -->
        <!-- Foto de perfil -->
    </div>
</nav>
```

### Contenedor de Publicaciones

```html
<div id="Publicaciones">
    <!-- Publicaciones generadas dinamicamente -->
</div>
```

### Estructura de Publicacion (Renderizado JS)

```html
<div class="card mb-3 clrtar" id="publicacion-{idPublicacion}">
    <div class="card-body">
        <div class="d-flex mb-3">
            <img src="{foto}" alt="Perfil" class="border border-secondary border-3 rounded-circle" height="60">
            <div class="ps-3">
                <h5 class="card-title {espOp}">{nombre}</h5>
                <h6 class="card-subtitle mb-1 text-body-secondary">{idUsuario}</h6>
                <p class="small text-body-secondary">Publicacion #{idPublicacion}, {fechaFormateada}</p>
            </div>
        </div>
        {opciones}
        <p class="card-text">{contenido}</p>
    </div>
    <div class="card-footer text-body-secondary text-center">
        <div class="btn-group w-100">
            <button type="button" class="btn likebtn" data-id-publicacion="{idPublicacion}">
                <i class="bi {tipoLike}"></i>{cantidadLikes} Me gusta
            </button>
            <button type="button" class="btn combtn" data-id-publicacion="{idPublicacion}">
                <i class="bi bi-chat-left"></i>{cantidadComentarios} Comentarios
            </button>
        </div>
    </div>
</div>
```

### Menu de Opciones (Solo Dueno)

```html
<div class="dropdown position-absolute top-0 end-0 p-2">
    <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
        <i class="bi bi-gear-fill"></i>
    </button>
    <ul class="dropdown-menu">
        <li>
            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditar" 
               data-id-publicacion="{idPublicacion}" data-contenido="{contenido}">
                <i class="bi bi-pencil-square me-1"></i>Editar
            </a>
        </li>
        <li>
            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar" 
               data-id-publicacion="{idPublicacion}">
                <i class="bi bi-trash me-1"></i>Eliminar
            </a>
        </li>
    </ul>
</div>
```

---

## Estilos CSS

### Ubicacion
`Styles/Style.css`

### Reset Global

```css
* {
    box-sizing: border-box;
}
  
html, body {
    overflow-x: hidden;
}
```

### Estructura

```css
.container {
    padding-top: 50px;  /* Espacio para navbar fija */
}
```

### Logo

```css
.logo {
    filter: invert(100%);  /* Invierte colores para tema oscuro */
}
```

### Tema Oscuro de Tarjetas

```css
.clrtar {
    background-color: #093950;  /* Color azul oscuro para tarjetas */
}
```

### Clases de Perfil y Portada

```css
/* Desktop */
.perfil {
    height: 200px;
}

.portada {
    height: 300px;
    object-fit: cover;
    width: 100%;
}

/* Mobile */
.perfilxs {
    height: 100px;
}

.portadaxs {
    height: 150px;
    object-fit: cover;
    width: 100%;
}
```

---

## Comunicacion entre Paginas

### Uso de localStorage

El proyecto utiliza `localStorage` para pasar datos entre paginas:

```javascript
// Guardar (en index.html, mi perfil.html, etc.)
localStorage.setItem("idPub", idPub);

// Leer (en vista-publicacion.html)
let idPub = localStorage.getItem("idPub");
```

**Dato compartido:**
- `idPub`: ID de la publicacion seleccionada para ver en detalle

### Flujo de Navegacion

```
index.html
    |
    +-- Clic en "Comentarios" --> localStorage.setItem("idPub", id)
    |                               window.location.href = "vista-publicacion.html"
    |
    v
vista-publicacion.html
    |
    +-- Lee localStorage.getItem("idPub")
    +-- Carga datos de la publicacion
    +-- Carga comentarios
```

---

## Manejo de Errores

### Patron de Manejo AJAX

Todas las llamadas AJAX siguen el mismo patron:

```javascript
$.ajax({
    url: dominio + "endpoint",
    type: 'METODO',
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data: JSON.stringify({ /* payload */ }),
    crossDomain: true
}).done(function (result) {
    // Exito: procesar resultado
    console.log(result);
}).fail(function (xhr, status, error) {
    // Error: mostrar notificacion
    let codigoRespuesta = xhr.status;
    Swal.fire({
        icon: "error",
        title: "Titulo del error",
        text: "Mensaje descriptivo. Codigo: " + codigoRespuesta
    });
});
```

### Notificaciones con SweetAlert2

**Error Generico:**
```javascript
Swal.fire({
    icon: "error",
    title: "Vaya, parece que hubo un error",
    text: "Tuvimos problemas [accion]. Codigo de respuesta: " + codigoRespuesta
});
```

**Errores Especificos (crearPublicacion en Script index.js):**
```javascript
switch(codigoRespuesta) {
    case 400:
        Swal.fire({
            icon: "warning",
            title: "Ups, no podemos publicar eso",
            text: "Verifica que tu publicacion sea mayor que tres caracteres y menor que quinientos."
        });
        break;
    case 401:
        Swal.fire({
            icon: "error",
            title: "No estas autorizado",
            text: "Parece que no tienes permisos para realizar esta accion."
        });
        break;
    case 429:
        Swal.fire({
            icon: "warning",
            title: "Ey, mas despacio velocista",
            text: "Recuerda que debes esperar minimo un minuto para volver a publicar."
        });
        break;
    case 500:
        Swal.fire({
            icon: "error",
            title: "Error del servidor",
            text: "Parece que se nos cayo el server, intentalo de nuevo."
        });
        break;
    default:
        Swal.fire({
            icon: "error",
            title: "Error desconocido",
            html: "Tuvimos problemas [accion].<br>Codigo: " + codigoRespuesta
        });
        break;
}
```

---

## Validacion de Formularios

### Validacion HTML5 Nativa

```html
<form id="publicar" class="needs-validation" novalidate>
    <textarea class="form-control" id="textopub" rows="3" required></textarea>
    <input type="submit" class="btn btn-primary" value="Publicar">
</form>
```

### Manejo con jQuery

```javascript
$("#publicar").submit(function (event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        crearPublicacion();
        event.preventDefault();
    }
    this.classList.add('was-validated');
});
```

**Comportamiento:**
1. `checkValidity()` valida segun atributos HTML (ej: `required`)
2. Si invalido: previene envio, detiene propagacion
3. Si valido: ejecuta la funcion de creacion
4. Siempre previene el envio por defecto del formulario
5. `was-validated` activa los estilos de validacion de Bootstrap

---

## Convenciones de Codigo

### Nomenclatura de Variables y Funciones

| Tipo | Convencion | Ejemplo |
|------|------------|---------|
| Variables | camelCase | `idPublicacion`, `fechaTexto` |
| Constantes | camelCase | `altmax` |
| Funciones | PascalCase | `crearPublicacion()`, `Publicaciones()` |
| IDs de elementos | kebab-case | `textopub`, `modalEditar` |
| Clases CSS | kebab-case | `.btn-primary`, `.clrtar` |

### Estructura de Funciones AJAX

```javascript
function nombreFuncion(parametros) {
    $.ajax({
        url: dominio + "endpoint",
        type: 'METODO',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            // payload
        }),
        crossDomain: true
    }).done(function (result) {
        // Logica de exito
    }).fail(function (xhr, status, error) {
        // Logica de error
    });
}
```

### Uso de Template Literals

```javascript
let publicacion = `
    <div class="card" id="publicacion-${publicacionresponse.idPublicacion}">
        <p class="card-text">${contenido}</p>
    </div>
`;
$("#Publicaciones").append(publicacion);
```

### jQuery Selectores

```javascript
// Por ID
$("#Publicaciones")

// Por clase
$(".likebtn")

// Delegacion de eventos
$("#Publicaciones").on("click", ".likebtn", function () { ... });

// Data attributes
$(this).data("id-publicacion")
```

### Formateo de Fechas

```javascript
let fecha = publicacionresponse.fechaPublicacion;
let fechaTexto = moment(fecha).locale('es').format('L');
```

**Salida:** "15 de marzo de 2024" (formato corto espanol)

---

## Notas Importantes para Contribuidores

### No Eliminar Contenido Original
El README.md contiene informacion del examen original que debe conservarse.

### Compatibilidad con CORS
El parametro `crossDomain: true` es necesario para permitir peticiones a dominios diferentes.

### Manejo de Estados de Likes
El estado visual del like se determina por la clase del icono:
- `bi-hand-thumbs-up`: No liked
- `bi-hand-thumbs-up-fill`: Liked

### Actualizacion de la API
Si la API cambia de dominio, actualizar la variable `dominio` en todos los scripts.

### Seguridad
- La `llave` de API no debe exponerse en repositorios publicos
- Considerar usar variables de entorno en produccion

---

## Recursos Adicionales

- [Documentacion de jQuery](https://api.jquery.com/)
- [Documentacion de Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [Documentacion de SweetAlert2](https://sweetalert2.github.io/)
- [Documentacion de Moment.js](https://momentjs.com/docs/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)