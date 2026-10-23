/* =========================================
   GLITTER
========================================= */

const glitter =
    document.getElementById("glitter");


function criarGlitter() {

    for (let i = 0; i < 140; i++) {

        const particula =
            document.createElement("div");


        particula.className =
            "particula";


        const tamanho =
            Math.random() * 1.8 + 0.4;


        const esquerda =
            Math.random() * 100;


        const duracao =
            Math.random() * 12 + 10;


        const atraso =
            Math.random() * -20;


        const lado =
            (Math.random() - 0.5) * 70;


        const opacidade =
            Math.random() * 0.55 + 0.15;


        particula.style.width =
            tamanho + "px";


        particula.style.height =
            tamanho + "px";


        particula.style.left =
            esquerda + "%";


        particula.style.opacity =
            opacidade;


        particula.style.animationDuration =
            duracao + "s";


        particula.style.animationDelay =
            atraso + "s";


        particula.style.setProperty(
            "--lado",
            lado + "px"
        );


        glitter.appendChild(
            particula
        );

    }

}


criarGlitter();



/* =========================================
   ELEMENTOS
========================================= */

const inicio =
    document.getElementById("inicio");


const convite =
    document.getElementById("convite");


const btnAbrir =
    document.getElementById("btnAbrir");


const btnVoltar =
    document.getElementById("btnVoltar");


const btnMusica =
    document.getElementById("btnMusica");


const audio =
    document.getElementById("audio");


const pergaminho =
    document.querySelector(
        ".pergaminho-fechado"
    );


const pergaminhoAberto =
    document.querySelector(
        ".pergaminho-aberto-fundo"
    );



/* =========================================
   GARANTIR APENAS UM BOTÃO DE MÚSICA
========================================= */

document
    .querySelectorAll("#btnMusica")
    .forEach(function (botao, indice) {

        if (indice > 0) {

            botao.remove();

        }

    });



/* =========================================
   ABRIR CONVITE
========================================= */

btnAbrir.addEventListener(
    "click",
    function () {

        if (
            inicio.classList.contains("abrindo")
        ) {

            return;

        }


        inicio.classList.add(
            "abrindo"
        );


        pergaminho.classList.add(
            "desenrolando"
        );


        const instrucao =
            document.querySelector(
                ".instrucao"
            );


        if (instrucao) {

            instrucao.classList.add(
                "sumindo"
            );

        }


        setTimeout(
            function () {

                inicio.classList.add(
                    "escondida"
                );


                convite.classList.add(
                    "visivel"
                );


                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });


                iniciarMusica();

            },
            2200
        );

    }
);



/* =========================================
   VOLTAR PARA O PERGAMINHO
========================================= */

btnVoltar.addEventListener(
    "click",
    function () {

        convite.classList.remove(
            "visivel"
        );


        inicio.classList.remove(
            "escondida"
        );


        inicio.classList.remove(
            "abrindo"
        );


        pergaminho.classList.remove(
            "desenrolando"
        );


        const instrucao =
            document.querySelector(
                ".instrucao"
            );


        if (instrucao) {

            instrucao.classList.remove(
                "sumindo"
            );

        }


        void inicio.offsetWidth;


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        audio.pause();


        audio.currentTime = 0;


        if (btnMusica) {

            btnMusica.textContent =
                "♫";

        }

    }
);



/* =========================================
   MÚSICA
========================================= */

function iniciarMusica() {

    audio.play().catch(
        function () {

            /*
                Alguns navegadores podem
                bloquear o autoplay.
                Nesse caso o usuário
                poderá clicar no botão.
            */

        }
    );

}


if (btnMusica) {

    btnMusica.addEventListener(
        "click",
        function () {

            if (audio.paused) {

                audio.play();

                btnMusica.textContent =
                    "♫";

            } else {

                audio.pause();

                btnMusica.textContent =
                    "🔇";

            }

        }
    );

}



/* =========================================
   CONTADOR
========================================= */

const dataFesta =
    new Date(
        "2026-12-12T19:30:00"
    ).getTime();


function atualizarContador() {

    const agora =
        new Date().getTime();


    const distancia =
        dataFesta - agora;


    if (distancia <= 0) {

        document.getElementById(
            "dias"
        ).textContent = "00";


        document.getElementById(
            "horas"
        ).textContent = "00";


        document.getElementById(
            "minutos"
        ).textContent = "00";


        document.getElementById(
            "segundos"
        ).textContent = "00";


        return;

    }


    const dias =
        Math.floor(
            distancia /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const horas =
        Math.floor(
            (
                distancia /
                (
                    1000 *
                    60 *
                    60
                )
            ) % 24
        );


    const minutos =
        Math.floor(
            (
                distancia /
                (
                    1000 *
                    60
                )
            ) % 60
        );


    const segundos =
        Math.floor(
            (
                distancia /
                1000
            ) % 60
        );


    document.getElementById(
        "dias"
    ).textContent =
        String(dias)
        .padStart(2, "0");


    document.getElementById(
        "horas"
    ).textContent =
        String(horas)
        .padStart(2, "0");


    document.getElementById(
        "minutos"
    ).textContent =
        String(minutos)
        .padStart(2, "0");


    document.getElementById(
        "segundos"
    ).textContent =
        String(segundos)
        .padStart(2, "0");

}


atualizarContador();


setInterval(
    atualizarContador,
    1000
);


/* =========================================
   NAVEGAÇÃO DO CARROSSEL
========================================= */

const carrossel = document.getElementById("carrosselFotos");

if (carrossel) {
    const anterior = document.querySelector(".seta-carrossel.anterior");
    const proxima = document.querySelector(".seta-carrossel.proxima");

    function moverCarrossel(direcao) {
        const foto = carrossel.querySelector(".foto-extra");
        if (!foto) return;

        const distancia = foto.getBoundingClientRect().width + 16;

        carrossel.scrollBy({
            left: direcao * distancia,
            behavior: "smooth"
        });
    }

    anterior.addEventListener("click", () => moverCarrossel(-1));
    proxima.addEventListener("click", () => moverCarrossel(1));
}
