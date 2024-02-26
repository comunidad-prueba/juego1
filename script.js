var nombreJugador = "Art";
var hor = 0;
var min = 0;
var seg = 0;
var seleccionado;
var aciertos = 0;
var puntos = 0;
var control;
var reproducirMusica = false;
const music = new Audio(`sonidos/background.mp3`);

window.onload = function () {
    inicioCronometro();
    inicializar();
}

function reproducirPausarMusica() {
    if (reproducirMusica) {
        document.getElementById("musica").style.opacity = 0.5;
        reproducirMusica = false;
        music.pause();
    } else {
        document.getElementById("musica").style.opacity = 1.0;
        reproducirMusica = true;
        music.loop = true;
        music.volume = 0.5;
        music.play();
    }
}

function sonido(opc) {
    var nomAudio = "";
    switch (opc) {
        case "caballo":
            nomAudio = "CABALLO.wav";
            break;
        case "cerdito":
            nomAudio = "chancho.mp3";
            break;
        case "gato":
            nomAudio = "GATO.wav";
            break;
        case "vaca":
            nomAudio = "VACA.wav";
            break;
        case "gallina":
            nomAudio = "GALLINA.mp3";
            break;
        case "borrego":
            nomAudio = "OVEJA.wav";
            break;
        case "acierto":
            nomAudio = "correct.mp3";
            break;
        case "error":
            nomAudio = "error.mp3";
            break;
    }
    const audio = new Audio(`sonidos/${nomAudio}`);
    audio.play();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var contAnimal = ev.target.parentNode;
    if (data.substring(6, data.length) == ev.target.id) {
        ev.target.remove();
        contAnimal.innerHTML += `<div class="animalCorrecto">${data.substring(6, data.length).toUpperCase()}</div>`;
        document.getElementById(data).remove();
        acierto(data.substring(6, data.length));
    } else {
        sonido("error");
        if (puntos >= 20) {
            puntos -= 20;
            document.getElementById("puntaje").innerHTML = puntos;
        }
    }
}

function inicioCronometro() {
    control = setInterval(crono1, 1000);

}

function crono1() {
    if (seg < 59) {
        seg++;
    } else {
        if (min < 59) {
            seg = 0;
            min++;
        } else {
            seg = 0;
            min++;
            hor++;
        }
    }
    if (seg < 10) {
        seg = "0" + parseInt(seg);
    }
    if (min < 10) {
        min = "0" + parseInt(min);
    }
    if (hor < 10) {
        hor = "0" + parseInt(hor);
    }
    document.getElementById("cronometroReloj").innerHTML = `${hor}:${min}:${seg}`;
}

function acierto(nom) {
    aciertos++;
    sonido("acierto");
    sonido(nom);
    puntos += 100;
    document.getElementById("puntaje").innerHTML = puntos;
    if (aciertos > 5) {
        clearInterval(control);
        setTimeout(juegoTerminado, 3000);
    }
}

function juegoTerminado() {
    puntos -= (seg);
    puntos -= (min * 60);
    puntos -= (hor * 3600);
    body = document.getElementById("cont1").parentNode;
    document.getElementById("cont1").remove();
    body.innerHTML = "<h1>lograo pai :)</h1>";
    body.innerHTML += `<h2>Tiempo: ${hor}:${min}:${seg}</h2>`;
    body.innerHTML += `<h2>Puntaje: ${puntos}</h2>`;
    if (localStorage.nombres == null) {
        let nom = [];
        let pts = [];
        nom.push(nombreJugador);
        pts.push(puntos);
        localStorage.nombres = JSON.stringify(nom);
        localStorage.puntos = JSON.stringify(pts);
    } else {
        let nom = [];
        let pts = [];
        nom = JSON.parse(localStorage.nombres);
        pts = JSON.parse(localStorage.puntos);
        nom.push(nombreJugador);
        pts.push(puntos);
        localStorage.nombres = JSON.stringify(nom);
        localStorage.puntos = JSON.stringify(pts);
    }
}

function inicializar() {
    var animal = [];
    var band1 = [];
    var band2 = [];
    animal[0] = "caballo";
    animal[1] = "cerdito";
    animal[2] = "gato";
    animal[3] = "vaca";
    animal[4] = "gallina";
    animal[5] = "borrego";
    for (var i = 0; i < 6; i++) {
        band1[i] = false;
        band2[i] = false;
    }
    i = 0;
    while (true) {
        num = Math.round(Math.random() * 5);
        if (!band1[num]) {
            i++;
            band1[num] = true;
            soltado = document.getElementById(`animal${i}`);
            soltado.innerHTML = `<img class="imgAnimal" src="img/animales/${animal[num]}.png" draggable="false"><br><label class="labelSoltado" id="${animal[num]}" ondrop="drop(event)" ondragover="allowDrop(event)"></label>`;
            if (i > 5) {
                break;
            }
        }
    }
    i = 0;
    while (true) {
        num = Math.round(Math.random() * 5);
        if (!band2[num]) {
            i++;
            band2[num] = true;
            txt = `<label class="nombreDrag" id="soltar${animal[num]}" draggable="true" ondragstart="drag(event)">${animal[num].toUpperCase()}</label>`;
            document.getElementById("nombres").innerHTML += txt;
            if (i > 5) {
                break;
            }
        }
    }
}
