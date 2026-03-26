function ajustarCosas() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const perfil = document.getElementById("perfil");
    const portada = document.getElementById("portada");

    if (window.innerWidth < 576) {
        btn1.classList.remove("btn-lg");
        btn2.classList.remove("btn-lg");
        btn3.classList.remove("btn-lg");
        perfil.classList.remove("perfil");
        portada.classList.remove("portada");
        btn1.classList.add("btn-sm");
        btn2.classList.add("btn-sm");
        btn3.classList.add("btn-sm");
        perfil.classList.add("perfilxs");
        portada.classList.add("portadaxs");
    } else {
        btn1.classList.add("btn-lg");
        btn2.classList.add("btn-lg");
        btn3.classList.add("btn-lg");
        perfil.classList.add("perfil");
        portada.classList.add("portada");
        btn1.classList.remove("btn-sm");
        btn2.classList.remove("btn-sm");
        btn3.classList.remove("btn-sm");
        perfil.classList.remove("perfilxs");
        portada.classList.remove("portadaxs");
    }
}

window.addEventListener("resize", ajustarCosas);
ajustarCosas();