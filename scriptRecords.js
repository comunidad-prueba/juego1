window.onload = function(){
    if(localStorage.nombres == null){
        document.getElementById("tabla").remove();
        document.getElementById("cont1").innerHTML = "<h2>No hay ningun jugador registrado tadavia.</h2>";
    }else{
        let nom = [];
        let pts = [];
        nom = JSON.parse(localStorage.nombres);
        pts = JSON.parse(localStorage.puntos);
        var aux = 0;
        for(var i = 0; i < pts.length; i++){
            for(var j = 0; j < pts.length; j++){
                if(pts[j]<pts[i]){
                    aux = pts[i];
                    pts[i] = pts[j];
                    pts[j] = aux;
                    aux = nom[i];
                    nom[i] = nom[j];
                    nom[j] = aux;
                }
            }
        }
        document.getElementById("tabla").innerHTML += `<tr id="encabezadoTabla"><th>Posicion</th><th>Nombre del jugador</th><th>Puntuacion</th></tr>`;
        for(var i = 0; i < pts.length; i++){
            document.getElementById("tabla").innerHTML += `<tr><th>${i+1}</th><th>${nom[i]}</th><th>${pts[i]}</th></tr>`;
        }
    }
}