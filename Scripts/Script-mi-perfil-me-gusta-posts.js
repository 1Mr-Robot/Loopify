function generarHTMLPublicacionLike(publicacionresponse) {
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
    
    $("#PublicacionesLike").append(publicacion);
}

function PublicacionesLike() {
    $("#PublicacionesLike").empty();
    
    let publicaciones = obtenerPublicaciones();
    let publicacionesLike = publicaciones
        .filter(p => p.likePropio === true)
        .sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
    
    $(publicacionesLike).each(function (index, publicacionresponse) {
        generarHTMLPublicacionLike(publicacionresponse);
    });
    
    if (publicacionesLike.length === 0) {
        $("#PublicacionesLike").html(`
            <div class="card mb-3 clrtar">
                <div class="card-body text-center">
                    <i class="bi bi-hand-thumbs-up fs-1 text-body-secondary"></i>
                    <h5 class="mt-3">No has dado Me gusta a nada</h5>
                    <p class="text-body-secondary">Explora las publicaciones y dale like a las que te gusten!</p>
                </div>
            </div>
        `);
    }
}

function eliminarLikePost(idPub, botonLike) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let publicaciones = obtenerPublicaciones();
            let pubIndex = publicaciones.findIndex(p => p.idPublicacion == idPub);
            
            if (pubIndex !== -1 && publicaciones[pubIndex].likePropio) {
                publicaciones[pubIndex].cantidadLikes--;
                if (publicaciones[pubIndex].cantidadLikes < 0) {
                    publicaciones[pubIndex].cantidadLikes = 0;
                }
                publicaciones[pubIndex].likePropio = false;
                guardarPublicaciones(publicaciones);
                
                let pub = $("#publicacion-" + idPub);
                pub.remove();
                
                if ($("#PublicacionesLike").children().length === 0) {
                    $("#PublicacionesLike").html(`
                        <div class="card mb-3 clrtar">
                            <div class="card-body text-center">
                                <i class="bi bi-hand-thumbs-up fs-1 text-body-secondary"></i>
                                <h5 class="mt-3">No has dado Me gusta a nada</h5>
                                <p class="text-body-secondary">Explora las publicaciones y dale like a las que te gusten!</p>
                            </div>
                        </div>
                    `);
                }
                
                resolve({ success: true });
            } else {
                reject({ status: 400, message: "No has dado like" });
            }
        }, 300 + Math.random() * 400);
    });
}

$("#PublicacionesLike").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion");
    let likeMio = $(this).find("i");
    if (likeMio.hasClass("bi-hand-thumbs-up-fill")) {
        eliminarLikePost(idPub, $(this)).catch(function(err) {
            console.log("Error al quitar like:", err);
        });
    }
});

$("#PublicacionesLike").on("click", ".combtn", function () {
    let idPub = $(this).data("id-publicacion");
    localStorage.setItem("idPub", idPub);
    window.location.href = "publicacion.html";
});

const editar = document.getElementById("message-text");
const altmax = 300;

editar.addEventListener("input", function() {
    this.style.height = "auto";
    let nuevaAlta = Math.min(this.scrollHeight, altmax);
    this.style.height = nuevaAlta + "px";
});

$(document).ready(function () {
    inicializarDatos();
    PublicacionesLike();
});