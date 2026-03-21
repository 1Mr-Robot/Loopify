var matricula = "2177709";
var llave = "5912fdbc-39b0-4071-ba39-71e52e188d78";
var dominio = "https://redsocial.luislepe.tech/api/";
var nombreUsuario = "Uziel Omar Flores Torres";

function inicializarDatos() {
    if (!localStorage.getItem('loopify_initialized')) {
        const datosIniciales = {
            publicaciones: [
                {
                    idPublicacion: 1,
                    idUsuario: "2177709",
                    nombre: "Uziel Omar Flores Torres",
                    contenido: "Hola a todos! Esta es mi primera publicacion en Loopify. Estoy emocionado de compartir mis pensamientos y conectar con ustedes. Esta red social es parte de mi proyecto de Programacion Web.",
                    fechaPublicacion: new Date(Date.now() - 86400000 * 3).toISOString(),
                    cantidadLikes: 12,
                    cantidadComentarios: 3,
                    likePropio: false
                },
                {
                    idPublicacion: 2,
                    idUsuario: "1234567",
                    nombre: "Sergio Perez",
                    contenido: "Buenos dias! El clima esta muy bonito hoy. Alguien sabe de algun buen cafe cerca de la universidad?",
                    fechaPublicacion: new Date(Date.now() - 86400000 * 2).toISOString(),
                    cantidadLikes: 8,
                    cantidadComentarios: 5,
                    likePropio: true
                },
                {
                    idPublicacion: 3,
                    idUsuario: "2177709",
                    nombre: "Uziel Omar Flores Torres",
                    contenido: "Este proyecto actualmente ya no cuenta con la API de la que consumia, pero hey, tenemos estas publicaciones estáticas.",
                    fechaPublicacion: new Date(Date.now() - 86400000).toISOString(),
                    cantidadLikes: 25,
                    cantidadComentarios: 7,
                    likePropio: false
                },
                {
                    idPublicacion: 4,
                    idUsuario: "7654321",
                    nombre: "Leonardo DiCaprio",
                    contenido: "Alguien esta estudiando para el examen de Calculo? Necesito ayuda con integrales.",
                    fechaPublicacion: new Date(Date.now() - 3600000 * 12).toISOString(),
                    cantidadLikes: 4,
                    cantidadComentarios: 12,
                    likePropio: true
                },
                {
                    idPublicacion: 5,
                    idUsuario: "9876543",
                    nombre: "Thanos",
                    contenido: "Feliz fin de semana a todos! Espero que tengan un buen descanso.",
                    fechaPublicacion: new Date(Date.now() - 3600000 * 6).toISOString(),
                    cantidadLikes: 15,
                    cantidadComentarios: 2,
                    likePropio: false
                }
            ],
            comentarios: [
                {
                    idComentario: 1,
                    idPublicacion: 1,
                    idUsuario: "1234567",
                    nombre: "Lewis Hamilton",
                    contenido: "Bienvenido a Loopify! Que bien que estes aqui.",
                    fechaPublicacion: new Date(Date.now() - 86400000 * 2).toISOString(),
                    likePropio: false
                },
                {
                    idComentario: 2,
                    idPublicacion: 1,
                    idUsuario: "7654321",
                    nombre: "Fernando Alonso",
                    contenido: "Hola! Tu proyecto se ve muy interesante.",
                    fechaPublicacion: new Date(Date.now() - 86400000 * 2.5).toISOString(),
                    likePropio: true
                },
                {
                    idComentario: 3,
                    idPublicacion: 1,
                    idUsuario: "2177709",
                    nombre: "Uziel Omar Flores Torres",
                    contenido: "Gracias a todos por la estática bienvenida!",
                    fechaPublicacion: new Date(Date.now() - 86400000 * 2.8).toISOString(),
                    likePropio: false
                },
                {
                    idComentario: 4,
                    idPublicacion: 2,
                    idUsuario: "9876543",
                    nombre: "Edward Snowden",
                    contenido: "Hay un cafe muy bueno en el centro, se llama Cafe UANL.",
                    fechaPublicacion: new Date(Date.now() - 86400000 * 1.5).toISOString(),
                    likePropio: false
                },
                {
                    idComentario: 5,
                    idPublicacion: 3,
                    idUsuario: "1234567",
                    nombre: "Elliot Anderson",
                    contenido: "Muy cierto! Sabias palabras.",
                    fechaPublicacion: new Date(Date.now() - 36000000).toISOString(),
                    likePropio: false
                }
            ],
            proximoIdPublicacion: 6,
            proximoIdComentario: 6
        };
        
        localStorage.setItem('loopify_publicaciones', JSON.stringify(datosIniciales.publicaciones));
        localStorage.setItem('loopify_comentarios', JSON.stringify(datosIniciales.comentarios));
        localStorage.setItem('loopify_proximoIdPublicacion', datosIniciales.proximoIdPublicacion);
        localStorage.setItem('loopify_proximoIdComentario', datosIniciales.proximoIdComentario);
        localStorage.setItem('loopify_initialized', 'true');
    }
}

function obtenerPublicaciones() {
    return JSON.parse(localStorage.getItem('loopify_publicaciones') || '[]');
}

function guardarPublicaciones(publicaciones) {
    localStorage.setItem('loopify_publicaciones', JSON.stringify(publicaciones));
}

function obtenerComentarios() {
    return JSON.parse(localStorage.getItem('loopify_comentarios') || '[]');
}

function guardarComentarios(comentarios) {
    localStorage.setItem('loopify_comentarios', JSON.stringify(comentarios));
}

function obtenerSiguienteIdPublicacion() {
    let id = parseInt(localStorage.getItem('loopify_proximoIdPublicacion') || '1');
    localStorage.setItem('loopify_proximoIdPublicacion', id + 1);
    return id;
}

function obtenerSiguienteIdComentario() {
    let id = parseInt(localStorage.getItem('loopify_proximoIdComentario') || '1');
    localStorage.setItem('loopify_proximoIdComentario', id + 1);
    return id;
}

function simularRetraso() {
    return new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
}

function editarPublicacion(idPub, nuevoContenido) {
    return new Promise((resolve, reject) => {
        simularRetraso().then(() => {
            let publicaciones = obtenerPublicaciones();
            let pubIndex = publicaciones.findIndex(p => p.idPublicacion == idPub);
            
            if (pubIndex !== -1) {
                publicaciones[pubIndex].contenido = nuevoContenido;
                guardarPublicaciones(publicaciones);
                resolve({ success: true });
            } else {
                reject({ status: 404, message: "Publicacion no encontrada" });
            }
        });
    });
}

function eliminarPublicacion(idPub) {
    return new Promise((resolve, reject) => {
        simularRetraso().then(() => {
            let publicaciones = obtenerPublicaciones();
            let comentarios = obtenerComentarios();
            
            publicaciones = publicaciones.filter(p => p.idPublicacion != idPub);
            comentarios = comentarios.filter(c => c.idPublicacion != idPub);
            
            guardarPublicaciones(publicaciones);
            guardarComentarios(comentarios);
            
            resolve({ success: true });
        });
    });
}

function crearLike(idPub, botonLike) {
    return new Promise((resolve, reject) => {
        simularRetraso().then(() => {
            let publicaciones = obtenerPublicaciones();
            let pubIndex = publicaciones.findIndex(p => p.idPublicacion == idPub);
            
            if (pubIndex !== -1 && !publicaciones[pubIndex].likePropio) {
                publicaciones[pubIndex].cantidadLikes++;
                publicaciones[pubIndex].likePropio = true;
                guardarPublicaciones(publicaciones);
                
                let likeTexto = botonLike.text().trim();
                let likes = parseInt(likeTexto.match(/\d+/)[0]);
                likes++;
                botonLike.find("i").toggleClass("bi-hand-thumbs-up bi-hand-thumbs-up-fill");
                botonLike.html(`${botonLike.find("i")[0].outerHTML} ${likes} Me gusta`);
                
                resolve({ success: true });
            } else {
                reject({ status: 400, message: "Ya diste like" });
            }
        });
    });
}

function eliminarLike(idPub, botonLike) {
    return new Promise((resolve, reject) => {
        simularRetraso().then(() => {
            let publicaciones = obtenerPublicaciones();
            let pubIndex = publicaciones.findIndex(p => p.idPublicacion == idPub);
            
            if (pubIndex !== -1 && publicaciones[pubIndex].likePropio) {
                publicaciones[pubIndex].cantidadLikes--;
                publicaciones[pubIndex].likePropio = false;
                guardarPublicaciones(publicaciones);
                
                let likeTexto = botonLike.text().trim();
                let likes = parseInt(likeTexto.match(/\d+/)[0]);
                likes--;
                if (likes < 0) likes = 0;
                botonLike.find("i").toggleClass("bi-hand-thumbs-up-fill bi-hand-thumbs-up");
                botonLike.html(`${botonLike.find("i")[0].outerHTML} ${likes} Me gusta`);
                
                resolve({ success: true });
            } else {
                reject({ status: 400, message: "No has dado like" });
            }
        });
    });
}

$("#Publicaciones").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion");
    let likeMio = $(this).find("i");
    if (likeMio.hasClass("bi-hand-thumbs-up")) {
        crearLike(idPub, $(this)).catch(function(err) {
            console.log("Error al dar like:", err);
        });
    } else {
        eliminarLike(idPub, $(this)).catch(function(err) {
            console.log("Error al quitar like:", err);
        });
    }
});

$("#PublicacionesUsuario").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion");
    let likeMio = $(this).find("i");
    if (likeMio.hasClass("bi-hand-thumbs-up")) {
        crearLike(idPub, $(this)).catch(function(err) {
            console.log("Error al dar like:", err);
        });
    } else {
        eliminarLike(idPub, $(this)).catch(function(err) {
            console.log("Error al quitar like:", err);
        });
    }
});

$("#vistaPublicacion").on("click", ".likebtn", function () {
    let idPub = $(this).data("id-publicacion");
    let likeMio = $(this).find("i");
    if (likeMio.hasClass("bi-hand-thumbs-up")) {
        crearLike(idPub, $(this)).catch(function(err) {
            console.log("Error al dar like:", err);
        });
    } else {
        eliminarLike(idPub, $(this)).catch(function(err) {
            console.log("Error al quitar like:", err);
        });
    }
});

$("#modalEditar").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget);
    let idPublicacion = btn.data("id-publicacion");
    let contenido = btn.data("contenido");
    let modal = $(this);
    modal.find(".modal-body #message-text").val(contenido);
    modal.find(".modal-footer .btn-primary").data("id-publicacion", idPublicacion);
});

$("#footerEditar .btn-primary").on("click", function () {
    let idPub = $(this).data('id-publicacion');
    let nuevoContenido = $('#message-text').val();
    
    editarPublicacion(idPub, nuevoContenido).then(function() {
        let pub = $("#publicacion-" + idPub);
        pub.find('.card-text').text(nuevoContenido.replace(/\n/g, '<br>'));
    }).catch(function(err) {
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas editando la publicacion."
        });
    });
});

$("#modalEliminar").on("show.bs.modal", function (event) {
    let btn = $(event.relatedTarget);
    let idPublicacion = btn.data("id-publicacion");
    let modal = $(this);
    modal.find(".modal-footer .btn-danger").data("id-publicacion", idPublicacion);
});

$("#footerEliminar .btn-danger").on("click", function () {
    let idPub = $(this).data('id-publicacion');
    
    eliminarPublicacion(idPub).then(function() {
        let pub = $("#publicacion-" + idPub);
        pub.remove();
    }).catch(function(err) {
        Swal.fire({
            icon: "error",
            title: "Vaya, parece que hubo un error",
            text: "Tuvimos problemas eliminando la publicacion."
        });
    });
});