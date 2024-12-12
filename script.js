function Forca(senha) {
  let pontos = 0;

  // Critérios de força
  if (senha.length >= 12) pontos += 2; // Senhas com pelo menos 12 caracteres
  if (/[A-Z]/.test(senha)) pontos += 1; // Pelo menos uma letra maiúscula
  if (/[a-z]/.test(senha)) pontos += 1; // Pelo menos uma letra minúscula
  if (/[0-9]/.test(senha)) pontos += 1; // Pelo menos um número
  if (/[^A-Za-z0-9]/.test(senha)) pontos += 2; // Pelo menos um caractere especial
  if (!/(.)\1{2,}/.test(senha)) pontos += 1; // Evitar repetições de caracteres

  return pontos;
}

let container = document.querySelector(".container");
let strengthMeter = document.querySelector(".strengthMeter");
let audioSenha = document.getElementById("audioSenha");

let audioTocando = false; // Indica se o áudio já está tocando

// Configuração inicial do volume fixo
audioSenha.volume = 0.05; // Volume fixo

// Função para iniciar o áudio, se ainda não estiver tocando
function iniciarAudio() {
  if (!audioTocando) {
    audioSenha.play().catch((err) => console.warn("Erro ao tocar áudio:", err));
    audioTocando = true;
  }
}

// Função para parar o áudio
function pararAudio() {
  if (audioTocando) {
    audioSenha.pause();
    audioSenha.currentTime = 0;
    audioTocando = false;
  }
}

// Evento de digitação no campo de senha
document.addEventListener("keyup", function () {
  let senha = document.querySelector("#SuaSenha").value;

  if (senha === "") {
    // Campo vazio: para o áudio e oculta o medidor
    strengthMeter.style.display = "none";
    container.classList.remove("fraca", "moderada", "forte");
    pararAudio();
  } else {
    // Atualiza o medidor de força e garante que o áudio continue tocando
    strengthMeter.style.display = "block";
    iniciarAudio();

    let forca = Forca(senha);
    container.classList.remove("fraca", "moderada", "forte");
    if (forca <= 2) {
      container.classList.add("fraca");
    } else if (forca <= 4) {
      container.classList.add("moderada");
    } else {
      container.classList.add("forte");
    }
  }
});

// Evento para pausar o áudio ao desfocar a aba
window.addEventListener("blur", function () {
  pararAudio();
});

// Evento para retomar o áudio ao focar na aba, se a senha estiver preenchida
window.addEventListener("focus", function () {
  let senha = document.querySelector("#SuaSenha").value;
  if (senha !== "") {
    iniciarAudio();
  }
});

// Exibir ou ocultar a senha
let senha = document.querySelector("#SuaSenha");
let show = document.querySelector(".show i");

show.onclick = function () {
  if (senha.type === "password") {
    senha.setAttribute("type", "text");
    show.classList.remove("fa-eye");
    show.classList.add("fa-eye-slash");
  } else {
    senha.setAttribute("type", "password");
    show.classList.remove("fa-eye-slash");
    show.classList.add("fa-eye");
  }
};