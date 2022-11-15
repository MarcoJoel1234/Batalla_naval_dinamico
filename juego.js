class Juego {
    constructor(jugador1, jugador2) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.jugador = 1;
        this.tablero_p1 = this.crearTablero();
        this.posiciones_p1 = ["", "", "", ""];
        this.posiciones_p2 = ["", "", "", ""];
        this.tablero_p2 = this.crearTablero();
        this.casillasSeleccionadas = 0;
        this.casillas = [3, 2, 2, 1];
        this.barcosPuestos = 0;
        this.barcosRestantesP1 = 8;
        this.barcosRestantesP2 = 8;
        this.estado = 1;
        this.estado1 = 1;
        this.ganador = false;
        this.contador = 0;
        this.numCasillas = 0;
    }
    jugar() {
        alert('Empecemos con el juego, solamente puedes atacar una vez por turno');
        this.jugador = 1;
        this.insertarTableroContrario(this.jugador);
    }
    crearTablero() {
        let tablero = [];
        for (let i = 0; i < 10; i++) {
            tablero[i] = [];
            for (let j = 0; j < 10; j++) {
                tablero[i][j] = 0;
            }
        }
        return tablero;
    }
    insertarTablero(jugador) {

        let div = document.getElementById("tablero-jugador" + jugador);
        let txt_tblro = document.getElementById("texto-tblro");
        if (jugador == 1) {
            txt_tblro.innerHTML = "Tablero de " + this.jugador1;
        } else {
            txt_tblro.innerHTML = "Tablero de " + this.jugador2;
            div.style.display = "block";
        }

        let top = 0;
        for (let x = 0; x < 10; x++) {
            let left = 0;
            for (let j = 0; j < 10; j++) {
                let button = document.createElement("button");
                button.style.position = "absolute";
                button.style.width = "10%";
                button.style.height = "10%";
                button.style.left = left + "%";
                button.style.top = top + "%";
                button.style.backgroundColor = "#add8e6";
                button.id = "boton" + (x) + (j) + "-" + "jugador" + jugador;
                button.addEventListener("mouseover", () => {
                    button.style.transform = "scale(1.2)";
                    button.style.transition = "0.5s";
                });
                button.addEventListener("mouseout", () => {
                    button.style.transform = "scale(1)";
                    button.style.transition = "0.5s";
                });
                button.onclick = () => {
                    if (this.contador == 0) {
                        this.seleccionarCasilla(button.id, jugador);
                    } else {
                        let audioError = document.createElement("audio");
                        audioError.src = "Multimedia/error.mp3";
                        audioError.play();
                        alert("Ya no puedes seleccionar mas casillas, solamente son 4 barcos");
                    }
                };
                left += 10;
                div.appendChild(button);
            }
            top += 10;
        }
    }
    colocarBarcos(contador) {
        if (contador != undefined) {
            this.contador = contador;
            this.barcosPuestos = 0;
        }
        if (this.jugador == 3) {
            this.jugar();
        } else {
            this.insertarTablero(this.jugador);
            if (this.jugador == 1) {
                alert("Es el momento de colocar tus barcos " + this.jugador1);
            } else {
                alert("Es turno de " + this.jugador2);
                alert("Es el momento de colocar tus barcos " + this.jugador2);
            }
            alert("Empecemos con el barco de 3 casillas");
        }
    }
    seleccionarCasilla(id, jugador) {
        let x = parseInt(id[5]);
        let y = parseInt(id[6]);

        switch (jugador) {
            case 1:
                if (this.tablero_p1[x][y] == 1) {
                    let audioError = document.createElement("audio");
                    audioError.src = "Multimedia/error.mp3";
                    audioError.play();
                    alert("Ya hay un barco en esa posición");
                } else {
                    let audioSeleccionar = document.createElement("audio");
                    audioSeleccionar.src = "Multimedia/click.mp3";
                    audioSeleccionar.play();
                    this.seleccionandoCasilla(id, jugador, x, y);
                }
                break;
            case 2:
                if (this.tablero_p2[x][y] == 1) {
                    let audioError = document.createElement("audio");
                    audioError.src = "Multimedia/error.mp3";
                    audioError.play();
                    alert("Ya hay un barco en esa posición");
                } else {
                    let audioSeleccionar = document.createElement("audio");
                    audioSeleccionar.src = "Multimedia/click.mp3";
                    audioSeleccionar.play();
                    this.seleccionandoCasilla(id, jugador, x, y);
                }
                break;
        }

    }
    seleccionandoCasilla(id, jugador, x, y) {
        if (this.casillasSeleccionadas < this.casillas[this.barcosPuestos]) {
            if (jugador == 1) {
                this.posiciones_p1[this.barcosPuestos] += id[5] + id[6];
            } else {
                this.posiciones_p2[this.barcosPuestos] += id[5] + id[6];
            }

            this.insertarPosicionBarco(x, y, jugador);
            let id1 = id;
            let boton = document.getElementById(id1);
            boton.style.backgroundColor = "blue";
            this.casillasSeleccionadas += 1;
        }
        if (this.casillasSeleccionadas == this.casillas[this.barcosPuestos]) {
            this.barcosPuestos += 1;
            if (this.barcosPuestos < 4) {
                alert("Sigamos con el barco numero " + (this.barcosPuestos + 1) + " de " + this.casillas[this.barcosPuestos] + " casillas");
                this.casillasSeleccionadas = 0;
            } else {
                let btnAceptar = document.getElementById("btn-aceptar");
                if (this.jugador == 1) {
                    alert("Asi quedo tu tablero " + this.jugador1);
                    console.log(this.tablero_p1);
                    btnAceptar.style.display = "block";
                    this.contador += 1;
                } else {
                    alert("Asi quedo tu tablero " + this.jugador2);
                    console.log(this.tablero_p2);
                    btnAceptar.style.display = "block";
                    this.contador += 1;
                }
                this.jugador += 1;
                this.casillasSeleccionadas = 0;
            }
        }
    }
    insertarPosicionBarco(x, y, jugador) {
        if (jugador == 1) {
            this.tablero_p1[x][y] = 1;
        } else {
            this.tablero_p2[x][y] = 1;
        }
    }
    insertarTableroContrario(jugador) {
        console.log(this.posiciones_p1);
        console.log(this.posiciones_p2);
        let div = document.getElementById("tablero-jugador" + jugador + "-ataca");
        let txt_tblro = document.getElementById("texto-tblro");
        if (jugador == 1) {
            txt_tblro.innerHTML = "Atacando a " + this.jugador2;
        } else {
            txt_tblro.innerHTML = "Atacando a " + this.jugador1;
        }
        let top = 0;
        div.style.display = "block";
        for (let x = 0; x < 10; x++) {
            let left = 0;
            for (let j = 0; j < 10; j++) {
                let button = document.createElement("button");
                button.style.position = "absolute";
                button.style.width = "10%";
                button.style.height = "10%";
                button.style.left = left + "%";
                button.style.top = top + "%";
                button.style.backgroundColor = "#add8e6";
                button.id = "boton" + (x) + (j) + "-" + "jugador" + jugador + "-ataca";
                button.onclick = () => {
                    this.atacar(button.id);
                };
                left += 10;
                div.appendChild(button);
            }
            top += 10;
        }
    }
    atacar(id) {
        if (!this.ganador) {
            let divp1 = document.getElementById("tablero-jugador1-ataca");
            let divp2 = document.getElementById("tablero-jugador2-ataca");
            let btn_siguiente = document.getElementById("btn-siguiente");
            let txt_tblro = document.getElementById("texto-tblro");

            let x = parseInt(id[5]);
            let y = parseInt(id[6]);
            if(this.contador == 0){
                this.contador = 1;
                if (this.jugador == 1) {
                    let boton = document.getElementById(id);
                    boton.style.backgroundColor = "blue";
                    if (this.tablero_p2[x][y] == 1) {
                        this.insertarAnimacion(1, x, y, this.jugador);
                        this.barcosRestantesP2 -= 1;
                    } else {
                        this.insertarAnimacion(2, x, y, this.jugador);
                    }
                    boton.disabled = true;
                } else {
                    let boton = document.getElementById(id);
                    boton.style.backgroundColor = "blue";
                    if (this.tablero_p1[x][y] == 1) {
                        this.insertarAnimacion(1, x, y, this.jugador);
                        this.barcosRestantesP1 -= 1;
                    } else {
                        this.insertarAnimacion(2, x, y, this.jugador);
                    }
                    boton.disabled = true;
                }
            }else{
                let audioError = document.createElement("audio");
                audioError.src = "Multimedia/error.mp3";
                audioError.play();
                alert('Solamente tienes un turno');
            }
            if (this.barcosRestantesP1 == 0) {
                this.ganador = true;
                alert("El ganador es " + this.jugador2);
                btn_siguiente.style.display = "none";
            } else if (this.barcosRestantesP2 == 0) {
                this.ganador = true;
                btn_siguiente.style.display = "none";
                alert("El ganador es " + this.jugador1);
            }
            if (this.ganador = false) {
                btn_siguiente.style.display = "block";
            }
            btn_siguiente.style.display = "block";
            btn_siguiente.onclick = () => {
                let audioSeleccionar = document.createElement("audio");
                audioSeleccionar.src = "Multimedia/click.mp3";
                audioSeleccionar.play();
                this.contador = 0;
                if (this.jugador == 1) {
                    alert("Es el turno de " + this.jugador2);
                    this.jugador = 2;
                    if (this.estado1 == 1) {
                        this.insertarTableroContrario(this.jugador);
                        this.estado1 = 0;
                    }
                    divp1.style.display = "none";
                    divp2.style.display = "block";
                    txt_tblro.innerHTML = "Atacando a " + this.jugador1;
                } else {
                    divp2.style.display = "none";
                    divp1.style.display = "block";
                    alert("Es el turno de " + this.jugador1);
                    this.jugador = 1;
                    txt_tblro.innerHTML = "Atacando a " + this.jugador2;
                }
                btn_siguiente.style.display = "none";
            }
        }
    }
    insertarAnimacion(estado, x, y, jugador){
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = "10%";
        div.style.height = "10%";
        div.style.left = y + "0%";
        div.style.top = x + "0%";

        let imagen = document.createElement("img");
        switch(estado){
            case 1:
                imagen.src = "Imagenes/explosion.gif";
                let audioExplo = document.createElement("audio");
                audioExplo.src = "Multimedia/explosion.mp3";
                audioExplo.play();
                break;
            case 2:
                imagen.src = "Imagenes/Salpicado.gif";
                let audioAgua = document.createElement("audio");
                audioAgua.src = "Multimedia/agua.mp3";
                audioAgua.play();
                break;
        }
        imagen.style.width = "100%";
        imagen.style.height = "100%";
        imagen.style.position = "absolute";
        imagen.style.top = "0";
        imagen.style.left = "0";
        div.appendChild(imagen);
        if(jugador == 1){
            let tablero1 = document.getElementById("tablero-jugador1-ataca");
            tablero1.appendChild(div);
        }else{
            let tablero2 = document.getElementById("tablero-jugador2-ataca");
            tablero2.appendChild(div);
        }
        setTimeout(() => {
            if(estado == 1){
                imagen.src = "Imagenes/explo.png";
            }else{
                imagen.src = "Imagenes/charco.png";
            }
        }, 1000);
        this.numCasillas += 1;
    }
}