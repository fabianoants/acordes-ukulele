let caixa = document.querySelector('.caixa');
let caixaSequencia = document.querySelector('.caixa__sequencia');
let caixaPergunta = document.querySelector('.caixa__pergunta');
let caixaRespostas = document.querySelector(".caixa__respostas");
let caixaBotao = document.querySelector(".caixa__botao");
let final = document.querySelector('.final');
//Gerar Pergunta///////////////////////////////////////////////
function gerarNumero(numeroArray) {//Não repetir numeros//
    let numero = Math.floor(Math.random() * 7);
    let quantNumGeradas = numeroArray.length;
    if (quantNumGeradas == 4) {
        numeroArray.shift();
    };
    if (numeroArray.includes(numero)) {
        return gerarNumero(numeroArray);
    } else {
        numeroArray.push(numero);
        return numero;
    }; 
};
function gerarPergunta() {
    caixaPergunta.innerHTML = `<p>Qual cifra representa o acorde <i>${notasMaiores[valorAleatorio]}</i>?</p>`;
    let alternativas = [];
    alternativas.push(cifrasMaiores[valorAleatorio]);//resposta certa//
    for (let n = 0; n < 3; n++) {//respostas aleatórias//
        let valorGerado = Math.floor(Math.random() * 7);
        if (alternativas.includes(cifrasMaiores[valorGerado])) {
            n--;
        } else {
            alternativas.push(cifrasMaiores[valorGerado]);
        };
    };
    alternativas.sort(() => Math.random() - 0.5);//embaralhar respostas//
    for (let n = 0; n < 4; n++) {
        caixaRespostas.innerHTML += `<button onclick="verificarResposta('${alternativas[n]}', this)" class="caixa__respostas__alt">${alternativas[n]}</button>`;
    };
};
let nNotasGeradas = [];
let valorAleatorio = gerarNumero(nNotasGeradas);
gerarPergunta();
//Acertar e Errar//////////////////////////////////////////////
let acertos = 0;
let vidas = 3;
let coracao = document.querySelector('.caixa__sequencia__vidas__valor');
coracao.innerHTML = `${vidas}`;
let caixaAlternativas = document.querySelectorAll('.caixa__respostas__alt');
let bContinuar = document.getElementById('botao-continuar');
function verificarResposta(valor, botao) {
    if (valor == cifrasMaiores[valorAleatorio]) {//certo//
        botao.classList.add('caixa__respostas__alt-certo');
        linhaResposta.classList.remove('caixa__sequencia__respondidas-desativa');
        caixa.classList.add('caixa__verde');
        ativarContinuar();
        acharResposta();
        acertos = acertos + 10;
        linhaPontuada();
    } else {//errado//
        botao.classList.add('caixa__respostas__alt-errado');
        linhaResposta.classList.add('caixa__sequencia__respondidas-desativa');
        caixa.classList.add('caixa__vermelha');
        diminuirVidas();
        ativarContinuar();
        acharResposta();
    };
};
function diminuirVidas() {
    vidas--;
    coracao.innerHTML = `${vidas}`;
};
function acharResposta() {
    caixaAlternativas = document.querySelectorAll('.caixa__respostas__alt');
    for (let r = 0; r < caixaAlternativas.length; r++) {
        if (caixaAlternativas[r].innerText == cifrasMaiores[valorAleatorio]) {
            caixaAlternativas[r].classList.add('caixa__respostas__alt-certo');
        };
        caixaAlternativas[r].setAttribute('disabled', '');//desativa botoes//
    };
};
function continuar() {
    if (acertos >= 100 || vidas == 0) {
        concluirPartida();
    } else {
        novaFase();
    };
};
function ativarContinuar() {
    bContinuar.classList.add('caixa__botao__proximo');
    bContinuar.classList.remove('caixa__botao__proximo-desativo');
    bContinuar.removeAttribute('disabled', '');
}
function desativarContinuar() {
    bContinuar.classList.remove('caixa__botao__proximo');
    bContinuar.classList.add('caixa__botao__proximo-desativo');
    bContinuar.setAttribute('disabled', '');
};
function limparBotoesCertoErrado() {
    for (let caixa = 0; caixa < caixaAlternativas.length; caixa++) {
        const element = caixaAlternativas[caixa];
        element.classList.remove('caixa__respostas__alt-certo');
        element.classList.remove('caixa__respostas__alt-errado');
        element.removeAttribute('disabled', '');
    };
    caixa.classList.remove('caixa__verde');
    caixa.classList.remove('caixa__vermelha');
};
//Linha de pontuação///////////////////////////////////////////
let linhaResposta = document.querySelector('.caixa__sequencia__respondidas-ativa');
function linhaPontuada() {
    linhaResposta.style.setProperty('--acerto', acertos + '%');
};
//Reiniciar////////////////////////////////////////////////////
function novaFase() {
    limparBotoesCertoErrado();
    desativarContinuar();
    caixaRespostas.innerHTML = "";
    valorAleatorio = gerarNumero(nNotasGeradas);
    gerarPergunta();
};
function concluirPartida() {
    final.style.display = 'flex';
    caixaSequencia.style.display = 'none';
    caixaPergunta.style.display = 'none';
    caixaRespostas.style.display = 'none';
    caixaBotao.style.display = 'none';
    if (acertos >= 100) {
        colocarFrase(frasesVitoria);
        finalTextoTitulo.classList.add('final__texto__vitoria');
    } else {
        colocarFrase(frasesDerrota);
        finalTextoTitulo.classList.add('final__texto__derrota');
    };
};
function novaPartida() {
    finalTextoTitulo.classList.remove('final__texto__vitoria', 'final__texto__derrota');
    final.style.display = 'none';
    caixaSequencia.style.display = 'flex';
    caixaPergunta.style.display = 'flex';
    caixaRespostas.style.display = 'flex';
    caixaBotao.style.display = 'flex';
    vidas = 3;
    coracao.innerHTML = `${vidas}`;
    novaFase();
    acertos = 0;
    linhaPontuada();
};
//Frases final de partida//////////////////////////////////////
let finalTextoTitulo = document.querySelector('.final__texto__titulo');
let finalTextoTexto = document.querySelector('.final__texto__texto'); 
let nFrasesGeradas = [];
function colocarFrase(frase) {
    let fraseAleatoria = gerarNumero(nFrasesGeradas);
    let fraseSelecionada = frase[fraseAleatoria];
    finalTextoTitulo.innerText = `${fraseSelecionada}`;
    if (acertos >= 100) {
        finalTextoTexto.innerText = "Você terminou o quiz";
    } else {
        finalTextoTexto.innerText = "Suas chances acabaram";
    };
};
