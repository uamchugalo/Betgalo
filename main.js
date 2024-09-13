// Variáveis
let secret_number = getSecretNumber();
let tentativas = 1;
const maxTentativas = 5; // Limite de tentativas

// Funções
function getSecretNumber() {
    let numero = Math.floor((Math.random() * 10) + 1);
    return numero;
}

function exibeTextoTag(tag, texto) {
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto; 
    responsiveVoice.speak(texto, "Portuguese Female", { pitch: 2 });
}
exibeTextoTag('h1', 'Número secreto');
exibeTextoTag('p', 'Escolha um número de 1 a 10');

function atualizarTentativasRestantes() {
    let tentativasRestantes = maxTentativas - tentativas;
    document.getElementById('tentativasRestantes').innerText = `Tentativas restantes: ${tentativasRestantes}`;
}

function verificarChute() {
    if (tentativas <= maxTentativas) {
        let guess = document.querySelector('input').value;

        if (guess == secret_number) {
            exibeTextoTag('p', 'Parabéns, você acertou! AQUI É GALO PORRA!');
            document.getElementById('reiniciar').removeAttribute('disabled');
            desabilitarInput(); // Desabilita o input após acertar
        } else {
            if (guess < secret_number) {
                exibeTextoTag('p', 'Tente novamente, o número é maior');
            } else {
                exibeTextoTag('p', 'Tente novamente, o número é menor');
            }
            tentativas++; // Incrementa a quantidade de tentativas
            atualizarTentativasRestantes(); // Atualiza o contador de tentativas
        }

        if (tentativas > maxTentativas) {
            exibeTextoTag('p', 'Limite de tentativas alcançado! O jogo acabou.');
            desabilitarInput(); // Desabilita o input após atingir o limite de tentativas
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
        }

    } else {
        exibeTextoTag('p', 'Você já atingiu o limite de tentativas! Reinicie o jogo.');
    }

    limpaInput(); // Limpa o campo de input após cada tentativa
}

// Função para limpar o campo de input
function limpaInput() {
    document.querySelector('input').value = ''; // Limpa o campo de input
}

// Função para desabilitar o campo de input
function desabilitarInput() {
    document.querySelector('input').setAttribute('disabled', true); // Desabilita o input
}

// Função para habilitar o campo de input
function habilitarInput() {
    document.querySelector('input').removeAttribute('disabled'); // Habilita o input
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tentativas = 1; // Reinicia o contador de tentativas
    secret_number = getSecretNumber(); // Gera um novo número secreto
    exibeTextoTag('h1', 'Número secreto'); // Redefine o título
    exibeTextoTag('p', 'Escolha um número de 1 a 10'); // Redefine a mensagem de texto
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar até a próxima tentativa
    habilitarInput(); // Habilita o campo de input ao reiniciar o jogo
    limpaInput(); // Limpa o campo de input ao reiniciar o jogo
    atualizarTentativasRestantes(); // Reseta o contador de tentativas restantes
}
