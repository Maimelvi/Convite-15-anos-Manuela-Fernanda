
/* =========================================
   CONVITE DE 15 ANOS
   MANUELA FERNANDA
   SCRIPT COMPLETO
========================================= */


/* =========================================
   1. GLITTER
========================================= */

const glitter = document.getElementById("glitter");

function criarGlitter() {
    if (!glitter) return;

    for (let i = 0; i < 140; i++) {
        const particula = document.createElement("div");

        particula.className = "particula";

        const tamanho = Math.random() * 1.8 + 0.4;
        const esquerda = Math.random() * 100;
        const duracao = Math.random() * 12 + 10;
        const atraso = Math.random() * -20;
        const lado = (Math.random() - 0.5) * 70;
        const opacidade = Math.random() * 0.55 + 0.15;

        particula.style.width = tamanho + "px";
        particula.style.height = tamanho + "px";
        particula.style.left = esquerda + "%";
        particula.style.opacity = opacidade;
        particula.style.animationDuration = duracao + "s";
        particula.style.animationDelay = atraso + "s";
        particula.style.setProperty("--lado", lado + "px");

        glitter.appendChild(particula);
    }
}

criarGlitter();


/* =========================================
   2. ELEMENTOS DO CONVITE
========================================= */

const inicio = document.getElementById("inicio");
const convite = document.getElementById("convite");

const btnAbrir = document.getElementById("btnAbrir");
const btnVoltar = document.getElementById("btnVoltar");
const btnMusica = document.getElementById("btnMusica");

const audio = document.getElementById("audio");

const pergaminho = document.querySelector(".pergaminho-fechado");


/* =========================================
   3. EVITAR BOTÕES DE MÚSICA DUPLICADOS
========================================= */

document.querySelectorAll("#btnMusica").forEach((botao, indice) => {
    if (indice > 0) {
        botao.remove();
    }
});


/* =========================================
   4. CONTROLE DA MÚSICA
========================================= */

async function iniciarMusica() {
    if (!audio) {
        console.error("Elemento de áudio não encontrado no HTML.");
        return;
    }

    try {
        audio.volume = 0.8;
        await audio.play();

        if (btnMusica) {
            btnMusica.textContent = "♫";
        }
    } catch (erro) {
        console.error("Não foi possível iniciar a música:", erro);

        if (btnMusica) {
            btnMusica.textContent = "♫";
        }
    }
}

if (btnMusica && audio) {
    btnMusica.addEventListener("click", async () => {
        try {
            if (audio.paused) {
                await audio.play();
                btnMusica.textContent = "♫";
            } else {
                audio.pause();
                btnMusica.textContent = "🔇";
            }
        } catch (erro) {
            console.error("Erro ao reproduzir a música:", erro);
        }
    });
}


/* =========================================
   5. ABRIR CONVITE
========================================= */

if (btnAbrir) {
    btnAbrir.addEventListener("click", () => {
        if (!inicio || !convite) return;

        if (inicio.classList.contains("abrindo")) {
            return;
        }

        // Tenta iniciar a música no clique do selo.
        // Isso ajuda a evitar o bloqueio do navegador.
        iniciarMusica();

        inicio.classList.add("abrindo");

        if (pergaminho) {
            pergaminho.classList.add("desenrolando");
        }

        const instrucao = document.querySelector(".instrucao");

        if (instrucao) {
            instrucao.classList.add("sumindo");
        }

        window.setTimeout(() => {
            inicio.classList.add("escondida");
            convite.classList.add("visivel");

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });
        }, 2200);
    });
}


/* =========================================
   6. VOLTAR PARA O PERGAMINHO
========================================= */

if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
        if (convite) {
            convite.classList.remove("visivel");
        }

        if (inicio) {
            inicio.classList.remove("escondida");
            inicio.classList.remove("abrindo");
        }

        if (pergaminho) {
            pergaminho.classList.remove("desenrolando");
        }

        const instrucao = document.querySelector(".instrucao");

        if (instrucao) {
            instrucao.classList.remove("sumindo");
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        if (btnMusica) {
            btnMusica.textContent = "♫";
        }

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    });
}


/* =========================================
   7. CONTADOR REGRESSIVO
========================================= */

// Data da festa: 12 de dezembro de 2026, às 19h30.
const dataFesta = new Date("2026-12-12T19:30:00").getTime();

function atualizarContador() {
    const diasEl = document.getElementById("dias");
    const horasEl = document.getElementById("horas");
    const minutosEl = document.getElementById("minutos");
    const segundosEl = document.getElementById("segundos");

    // Evita erros se os elementos não existirem.
    if (!diasEl || !horasEl || !minutosEl || !segundosEl) {
        return;
    }

    const agora = Date.now();
    const distancia = dataFesta - agora;

    if (distancia <= 0) {
        diasEl.textContent = "00";
        horasEl.textContent = "00";
        minutosEl.textContent = "00";
        segundosEl.textContent = "00";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((distancia / (1000 * 60)) % 60);
    const segundos = Math.floor((distancia / 1000) % 60);

    diasEl.textContent = String(dias).padStart(2, "0");
    horasEl.textContent = String(horas).padStart(2, "0");
    minutosEl.textContent = String(minutos).padStart(2, "0");
    segundosEl.textContent = String(segundos).padStart(2, "0");
}

atualizarContador();
window.setInterval(atualizarContador, 1000);


/* =========================================
   8. NAVEGAÇÃO DO CARROSSEL
========================================= */

const carrossel = document.getElementById("carrosselFotos");

if (carrossel) {
    const anterior = document.querySelector(".seta-carrossel.anterior");
    const proxima = document.querySelector(".seta-carrossel.proxima");

    function moverCarrossel(direcao) {
        const foto = carrossel.querySelector(".foto-extra");

        if (!foto) return;

        const estilos = window.getComputedStyle(carrossel);
        const espacamento = parseFloat(estilos.gap) || 16;
        const distancia = foto.getBoundingClientRect().width + espacamento;

        carrossel.scrollBy({
            left: direcao * distancia,
            behavior: "smooth"
        });
    }

    if (anterior) {
        anterior.addEventListener("click", () => {
            moverCarrossel(-1);
        });
    }

    if (proxima) {
        proxima.addEventListener("click", () => {
            moverCarrossel(1);
        });
    }
}
