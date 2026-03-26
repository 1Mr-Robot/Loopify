function generarHTMLPublicacion(publicacionresponse, contenedor) {
    let tipoLike = publicacionresponse.likePropio ? 
        `<i class="bi bi-hand-thumbs-up-fill me-1"></i>` : 
        `<i class="bi bi-hand-thumbs-up me-1"></i>`;
    let foto = publicacionresponse.idUsuario == "2177709" ? 
        "Imagenes/Perfil-Uziel-Omar-Flores-Torres.png" : 
        "Imagenes/Perfil.png";
    let espOp = publicacionresponse.idUsuario == "2177709" ? "me-5" : "";
    let opciones = publicacionresponse.idUsuario == "2177709" ? `
        <div class="dropdown position-absolute top-0 end-0 p-2">
            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-gear-fill"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditar" data-id-publicacion="${publicacionresponse.idPublicacion}" data-contenido="${publicacionresponse.contenido}"><i class="bi bi-pencil-square me-1"></i>Editar</a></li>
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar" data-id-publicacion="${publicacionresponse.idPublicacion}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
            </ul>
        </div>
    ` : "";
    let contenido = publicacionresponse.contenido.replace(/\n/g, '<br>');
    let fecha = publicacionresponse.fechaPublicacion;
    let fechaTexto = moment(fecha).locale('es').format('L');
    
    let publicacion = `
        <div class="card mb-3 clrtar" id="publicacion-${publicacionresponse.idPublicacion}">
            <div class="card-body">
                <div class="d-flex mb-3">
                    <img src="${foto}" alt="Perfil" class="border border-secondary border-3 rounded-circle" height="60">
                    <div class="ps-3">
                        <h5 class="card-title ${espOp}">${publicacionresponse.nombre}</h5>
                        <h6 class="card-subtitle mb-1 text-body-secondary">${publicacionresponse.idUsuario}</h6>
                        <p class="small text-body-secondary">Publicacion #${publicacionresponse.idPublicacion}, ${fechaTexto}</p>
                    </div>
                </div>
                ${opciones}
                <p class="card-text">${contenido}</p>
            </div>
            <div class="card-footer text-body-secondary text-center">
                <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn likebtn" data-id-publicacion="${publicacionresponse.idPublicacion}">
                        ${tipoLike}${publicacionresponse.cantidadLikes} Me gusta
                    </button>
                    <button type="button" class="btn combtn" data-id-publicacion="${publicacionresponse.idPublicacion}">
                        <i class="bi bi-chat-left me-1"></i>${publicacionresponse.cantidadComentarios} Comentarios
                    </button>
                </div>
            </div>
        </div>
    `;
    
    if (contenedor === "prepend") {
        $("#Publicaciones").prepend(publicacion);
    } else {
        $("#Publicaciones").append(publicacion);
    }
}

function Publicaciones() {
    $("#Publicaciones").empty();
    
    let publicaciones = obtenerPublicaciones();
    publicaciones.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
    
    $(publicaciones).each(function (index, publicacionresponse) {
        generarHTMLPublicacion(publicacionresponse, "append");
    });
    
    if (publicaciones.length === 0) {
        $("#Publicaciones").html(`
            <div class="card mb-3 clrtar">
                <div class="card-body text-center">
                    <i class="bi bi-inbox fs-1 text-body-secondary"></i>
                    <h5 class="mt-3">No hay publicaciones</h5>
                    <p class="text-body-secondary">Se la primera en publicar algo!</p>
                </div>
            </div>
        `);
    }
}

function PublicacionNueva(idPub) {
    let publicaciones = obtenerPublicaciones();
    let publicacion = publicaciones.find(p => p.idPublicacion == idPub);
    
    if (publicacion) {
        generarHTMLPublicacion(publicacion, "prepend");
    }
}

function crearPublicacion() {
    let contenido = $("#textopub").val().trim();
    
    if (contenido.length < 3) {
        Swal.fire({
            icon: "warning",
            title: "Ups, no podemos publicar eso",
            text: "Verifica que tu publicacion sea mayor que tres caracteres."
        });
        return;
    }
    
    if (contenido.length > 500) {
        Swal.fire({
            icon: "warning",
            title: "Ups, no podemos publicar eso",
            text: "Tu publicacion no puede exceder los 500 caracteres."
        });
        return;
    }
    
    let publicaciones = obtenerPublicaciones();
    let nuevoId = obtenerSiguienteIdPublicacion();
    
    let nuevaPublicacion = {
        idPublicacion: nuevoId,
        idUsuario: matricula,
        nombre: nombreUsuario,
        contenido: contenido,
        fechaPublicacion: new Date().toISOString(),
        cantidadLikes: 0,
        cantidadComentarios: 0,
        likePropio: false
    };
    
    publicaciones.unshift(nuevaPublicacion);
    guardarPublicaciones(publicaciones);
    
    document.getElementById("textopub").value = "";
    PublicacionNueva(nuevoId);
    
    Swal.fire({
        icon: "success",
        title: "Publicado!",
        text: "Tu publicacion se ha creado exitosamente.",
        timer: 1500,
        showConfirmButton: false
    });
}

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

$("#Publicaciones").on("click", ".combtn", function () {
    let idPub = $(this).data("id-publicacion");
    localStorage.setItem("idPub", idPub);
    window.location.href = "publicacion.html";
});

const texto = document.getElementById("textopub");
const editar = document.getElementById("message-text");
const altmax = 300;

texto.addEventListener("input", function() {
    this.style.height = "auto";
    let nuevaAlt = Math.min(this.scrollHeight, altmax);
    this.style.height = nuevaAlt + "px";
});

editar.addEventListener("input", function() {
    this.style.height = "auto";
    let nuevaAlta = Math.min(this.scrollHeight, altmax);
    this.style.height = nuevaAlta + "px";
});

$(document).ready(function () {
    inicializarDatos();
    Publicaciones();
});