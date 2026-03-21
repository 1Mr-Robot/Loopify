function generarHTMLPublicacionVista(publicacionresponse) {
    let tipoLike = publicacionresponse.likePropio ? 
        `<i class="bi bi-hand-thumbs-up-fill me-1"></i>` : 
        `<i class="bi bi-hand-thumbs-up me-1"></i>`;
    let foto = publicacionresponse.idUsuario == "2177709" ? 
        "Imagenes/Perfil - Uziel Omar Flores Torres.png" : 
        "Imagenes/Perfil.png";
    let espOp = publicacionresponse.idUsuario == "2177709" ? "me-5" : "";
    let opciones = publicacionresponse.idUsuario == "2177709" ? `
        <div class="dropdown position-absolute top-0 end-0 p-2">
            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-gear-fill"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditar" data-id-publicacion="${publicacionresponse.idPublicacion}" data-contenido="${publicacionresponse.contenido}"><i class="bi bi-pencil-square me-1"></i>Editar</a></li>
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminarVisPub" data-id-publicacion="${publicacionresponse.idPublicacion}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
            </ul>
        </div>
    ` : "";
    let contenido = publicacionresponse.contenido.replace(/\n/g, '<br>');
    let fecha = publicacionresponse.fechaPublicacion;
    let fechaTexto = moment(fecha).locale('es').format('L');
    
    let publicacion = `
        <li class="list-group-item clrtar" id="publicacion-${publicacionresponse.idPublicacion}">
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
        </li>
        <li class="list-group-item clrtar">
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
        </li>
    `;
    
    $("#vistaPublicacion").prepend(publicacion);
}

function generarHTMLComentario(publicacionresponse) {
    let foto = publicacionresponse.idUsuario == "2177709" ? 
        "Imagenes/Perfil - Uziel Omar Flores Torres.png" : 
        "Imagenes/Perfil.png";
    let espOp = publicacionresponse.idUsuario == "2177709" ? "me-5" : "";
    let opciones = publicacionresponse.idUsuario == "2177709" ? `
        <div class="dropdown position-absolute top-0 end-0 p-2">
            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-gear-fill"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarCom" data-id-comentario="${publicacionresponse.idComentario}" data-contenido="${publicacionresponse.contenido}"><i class="bi bi-pencil-square me-1"></i>Editar</a></li>
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEliminarCom" data-id-comentario="${publicacionresponse.idComentario}"><i class="bi bi-trash me-1"></i></i>Eliminar</a></li>
            </ul>
        </div>
    ` : "";
    let contenido = publicacionresponse.contenido.replace(/\n/g, '<br>');
    let fecha = publicacionresponse.fechaPublicacion;
    let fechaTexto = moment(fecha).locale('es').format('L');
    
    let comentario = `
        <li class="list-group-item" id="comentario-${publicacionresponse.idComentario}">
            <div class="d-flex mb-1">
                <img src="${foto}" alt="Perfil" class="border border-secondary border-3 rounded-circle" height="40">
                <div class="ps-3">
                    <h6 class="card-title ${espOp}">${publicacionresponse.nombre}</h6>
                    <h6 class="small card-subtitle text-body-secondary">${publicacionresponse.idUsuario}</h6>
                    <p class="small text-body-secondary">Comentario #${publicacionresponse.idComentario}, ${fechaTexto}</p>
                </div>
            </div>
            ${opciones}
            <p class="card-text">${contenido}</p>
        </li>
    `;
    
    $("#vistaPublicacion").append(comentario);
}

function vistaPublicacion() {
    let idPub = localStorage.getItem("idPub");
    
    if (!idPub) {
        window.location.href = "index.html";
        return;
    }
    
    let publicaciones = obtenerPublicaciones();
    let publicacion = publicaciones.find(p => p.idPublicacion == idPub);
    
    if (!publicacion) {
        Swal.fire({
            icon: "error",
            title: "Publicacion no encontrada",
            text: "Esta publicacion ya no existe.",
            allowOutsideClick: false
        }).then(() => {
            window.location.href = "index.html";
        });
        return;
    }
    
    generarHTMLPublicacionVista(publicacion);
}

function comentarios() {
    let idPub = localStorage.getItem("idPub");
    let comentarios = obtenerComentarios();
    let comentariosPublicacion = comentarios
        .filter(c => c.idPublicacion == idPub)
        .sort((a, b) => new Date(a.fechaPublicacion) - new Date(b.fechaPublicacion));
    
    $(comentariosPublicacion).each(function (index, publicacionresponse) {
        generarHTMLComentario(publicacionresponse);
    });
}

function eliminarPublicacionVisPub(idPub) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let publicaciones = obtenerPublicaciones();
            let comentarios = obtenerComentarios();
            
            publicaciones = publicaciones.filter(p => p.idPublicacion != idPub);
            comentarios = comentarios.filter(c => c.idPublicacion != idPub);
            
            guardarPublicaciones(publicaciones);
            guardarComentarios(comentarios);
            
            window.location.href = "index.html";
            resolve({ success: true });
        }, 300 + Math.random() * 400);
    });
}

function crearComentario() {
    let idPub = localStorage.getItem("idPub");
    let contenido = $("#textocom").val().trim();
    
    if (contenido.length < 1) {
        Swal.fire({
            icon: "warning",
            title: "Comentario vacio",
            text: "Por favor escribe algo antes de publicar."
        });
        return;
    }
    
    if (contenido.length > 500) {
        Swal.fire({
            icon: "warning",
            title: "Comentario muy largo",
            text: "Tu comentario no puede exceder los 500 caracteres."
        });
        return;
    }
    
    let comentarios = obtenerComentarios();
    let publicaciones = obtenerPublicaciones();
    let nuevoId = obtenerSiguienteIdComentario();
    
    let nuevoComentario = {
        idComentario: nuevoId,
        idPublicacion: parseInt(idPub),
        idUsuario: matricula,
        nombre: nombreUsuario,
        contenido: contenido,
        fechaPublicacion: new Date().toISOString(),
        likePropio: false
    };
    
    comentarios.push(nuevoComentario);
    guardarComentarios(comentarios);
    
    let pubIndex = publicaciones.findIndex(p => p.idPublicacion == idPub);
    if (pubIndex !== -1) {
        publicaciones[pubIndex].cantidadComentarios++;
        guardarPublicaciones(publicaciones);
    }
    
    let comentarioBtn = $(`.combtn[data-id-publicacion="${idPub}"]`);
    let comentarioTexto = comentarioBtn.text().trim();
    let cantidadComentarios = parseInt(comentarioTexto.match(/\d+/)[0]);
    cantidadComentarios++;
    comentarioBtn.html(`<i class="bi bi-chat-left me-1"></i> ${cantidadComentarios} Comentarios`);
    
    document.getElementById("textocom").value = "";
    generarHTMLComentario(nuevoComentario);
}

function editarComentario(idCom, nuevoContenido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let comentarios = obtenerComentarios();
            let comIndex = comentarios.findIndex(c => c.idComentario == idCom);
            
            if (comIndex !== -1) {
                comentarios[comIndex].contenido = nuevoContenido;
                guardarComentarios(comentarios);
                
                let com = $("#comentario-" + idCom);
                com.find('.card-text').text(nuevoContenido.replace(/\n/g, '<br>'));
                
                resolve({ success: true });
            } else {
                reject({ status: 404, message: "Comentario no encontrado" });
            }
        }, 300 + Math.random() * 400);
    });
}

function eliminarComentario(idCom) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let idPub = localStorage.getItem("idPub");
            let comentarios = obtenerComentarios();
            let publicaciones = obtenerPublicaciones();
            
            comentarios = comentarios.filter(c => c.idComentario != idCom);
            guardarComentarios(comentarios);
            
            let com = $("#comentario-" + idCom);
            com.remove();
            
            let pubIndex = publicaciones.findIndex(p => p.idPublicacion == idPub);
            if (pubIndex !== -1) {
                publicaciones[pubIndex].cantidadComentarios--;
                if (publicaciones[pubIndex].cantidadComentarios < 0) {
                    publicaciones[pubIndex].cantidadComentarios = 0;
                }
                guardarPublicaciones(publicaciones);
            }
            
            let comentarioBtn = $(`.combtn[data-id-publicacion="${idPub}"]`);
            let comentarioTexto = comentarioBtn.text().trim();
            let cantidadComentarios = parseInt(comentarioTexto.match(/\d+/)[0]);
            cantidadComentarios--;
            if (cantidadComentarios < 0) cantidadComentarios = 0;
            comentarioBtn.html(`<i class="bi bi-chat-left me-1"></i> ${cantidadComentarios} Comentarios`);
            
            resolve({ success: true });
        }, 300 + Math.random() * 400);
    });
}

function ComentarioNuevo(idCom) {
    let comentarios = obtenerComentarios();
    let comentario = comentarios.find(c => c.idComentario == idCom);
    
    if (comentario) {
        generarHTMLComentario(comentario);
    }
}

$("#comentar").submit(function (event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        crearComentario();
        event.preventDefault();
    }
    this.classList.add('was-validated');
});

$("#modalEliminarVisPub").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget);
    let idPublicacion = btn.data("id-publicacion");
    let modal = $(this);
    modal.find(".modal-footer .btn-danger").data("id-publicacion", idPublicacion);
});

$("#footerEliminarVisPub .btn-danger").on("click", function () {
    let idPub = $(this).data('id-publicacion');
    eliminarPublicacionVisPub(idPub).catch(function(err) {
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas eliminando la publicacion."
        });
    });
});

$("#modalEditarCom").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget);
    let idComentario = btn.data("id-comentario");
    let contenido = btn.data("contenido");
    let modal = $(this);
    modal.find(".modal-body #textoEditarCom").val(contenido);
    modal.find(".modal-footer .btn-primary").data("id-comentario", idComentario);
});

$("#footerEditarCom .btn-primary").on("click", function () {
    let idCom = $(this).data('id-comentario');
    let nuevoContenido = $('#textoEditarCom').val();
    
    editarComentario(idCom, nuevoContenido).catch(function(err) {
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas editando ese comentario."
        });
    });
});

$("#modalEliminarCom").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget);
    let idComentario = btn.data("id-comentario");
    let modal = $(this);
    modal.find(".modal-footer .btn-danger").data("id-comentario", idComentario);
});

$("#footerEliminarCom .btn-danger").on("click", function () {
    let idCom = $(this).data('id-comentario');
    eliminarComentario(idCom).catch(function(err) {
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas eliminando ese comentario."
        });
    });
});

const texto = document.getElementById("textocom");
const editar = document.getElementById("message-text");
const editarCom = document.getElementById("textoEditarCom");
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

editarCom.addEventListener("input", function() {
    this.style.height = "auto";
    let nuevaAlta = Math.min(this.scrollHeight, altmax);
    this.style.height = nuevaAlta + "px";
});

$(document).ready(function () {
    inicializarDatos();
    vistaPublicacion();
    comentarios();
});