let caixa = document.querySelector('.caixa');
let caixaSequencia = document.querySelector('.caixa__sequencia');
let caixaPergunta = document.querySelector('.caixa__pergunta');
let caixaRespostas = document.querySelector(".caixa__respostas");
let caixaBotao = document.querySelector(".caixa__botao");
let final = document.querySelector('.final');
//Gerar pergunta aleatória/////////////////////////////////////
let nNotasGeradas = [];
function gerarNumero(numeroArray) {
    let numero = Math.floor(Math.random() * 7);
    let quantNumGeradas = numeroArray.length;

    if (quantNumGeradas == 4) {
        numeroArray.shift();
    }
    if (numeroArray.includes(numero)) {
        return gerarNumero(numeroArray);
    } else {
        numeroArray.push(numero);
        return numero;
    }; 
};
let valorAleatorio = gerarNumero(nNotasGeradas);
let notaSelecionada = notasMaiores[valorAleatorio];
caixaPergunta.innerHTML = `<p>Qual cifra representa o acorde <i>${notaSelecionada}</i>?</p>`;
///////////////////////////////////////////////////////////////
//Gerar alternativas aleatórias////////////////////////////////
let alternativas = [];
function gerarAlternativas() {
    //alternativa certa//
    alternativas.push(cifrasMaiores[valorAleatorio]);
    //respostas aleatórias//
    for (let n = 0; n < 3; n++) {
        let valorGerado = Math.floor(Math.random() * 7);
        if (alternativas.includes(cifrasMaiores[valorGerado])) {
            n--;
        } else {
            alternativas.push(cifrasMaiores[valorGerado]);
        };
    };
};
gerarAlternativas();
//embaralhar as alternativas//
function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
};
//inserir as alternativas//
function embaralhar() {
    let altEmbaralhadas = embaralharArray(alternativas);
    for (let n = 0; n < 4; n++) {
        caixaRespostas.innerHTML += `<button onclick="verificarResposta('${altEmbaralhadas[n]}', this)" class="caixa__respostas__alt">${altEmbaralhadas[n]}</button>`;
    };
};
embaralhar();
///////////////////////////////////////////////////////////////
//Acertar e Errar//////////////////////////////////////////////
let acertos = 0;
let vidas = 3;
let coracao = document.querySelector('.caixa__sequencia__vidas__valor');
coracao.innerHTML = `${vidas}`;
let caixaRespostasAlt = document.querySelectorAll('.caixa__respostas__alt');
let bContinuar = document.getElementById('botao-continuar');
let cifraCorreta = cifrasMaiores[valorAleatorio];
function verificarResposta(valor, botao) {
    if (valor == cifraCorreta) {
        botao.classList.add('caixa__respostas__alt-certo');
        linhaResposta.classList.remove('caixa__sequencia__respondidas-desativa');
        caixa.classList.add('caixa__verde');
        ativarContinuar();
        acharResposta();
        acertos = acertos + 10;
        linhaPontuada();
    } else {
        botao.classList.add('caixa__respostas__alt-errado');
        caixa.classList.add('caixa__vermelha');
        linhaResposta.classList.add('caixa__sequencia__respondidas-desativa');
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
    caixaRespostasAlt = document.querySelectorAll('.caixa__respostas__alt');
    for (let r = 0; r < caixaRespostasAlt.length; r++) {
        const achar = caixaRespostasAlt[r];
        if (achar.innerText == cifraCorreta) {
            achar.classList.add('caixa__respostas__alt-certo');
        };
        //desativa botoes//
        achar.setAttribute('disabled', '');
    };
};
///////////////////////////////////////////////////////////////
//Linha respondidas////////////////////////////////////////////
let linhaResposta = document.querySelector('.caixa__sequencia__respondidas-ativa');
function linhaPontuada() {
    linhaResposta.style.setProperty('--acerto', acertos + '%');
};
///////////////////////////////////////////////////////////////
//Reiniciar////////////////////////////////////////////////////
function novoJogo() {
    vidas = 3;
    coracao.innerHTML = `${vidas}`;
    novaFase();
    acertos = 0;
    linhaPontuada();
}
function ativarContinuar() {
    bContinuar.classList.add('caixa__botao__proximo');
    bContinuar.classList.remove('caixa__botao__proximo-desativo');
    bContinuar.removeAttribute('disabled', '');
}
function desativarContinuar() {
    bContinuar.classList.remove('caixa__botao__proximo');
    bContinuar.classList.add('caixa__botao__proximo-desativo');
    bContinuar.setAttribute('disabled', '');
}
function continuar() {
    if (acertos >= 100 || vidas == 0) {
        concluirPartida();
    } else {
        novaFase();
    };
};
function limparBotoesCertoErrado() {
    for (let caixa = 0; caixa < caixaRespostasAlt.length; caixa++) {
        const element = caixaRespostasAlt[caixa];
        element.classList.remove('caixa__respostas__alt-certo');
        element.classList.remove('caixa__respostas__alt-errado');
        element.removeAttribute('disabled', '');
    };
    caixa.classList.remove('caixa__verde');
    caixa.classList.remove('caixa__vermelha');
}
function novaFase() {
    limparBotoesCertoErrado();
    desativarContinuar();
    caixaRespostas.innerHTML = "";
    valorAleatorio = gerarNumero(nNotasGeradas);
    notaSelecionada = notasMaiores[valorAleatorio];
    caixaPergunta.innerHTML = `<p>Qual cifra representa o acorde <i>${notaSelecionada}</i>?</p>`;
    alternativas = [];
    gerarAlternativas(); 
    embaralhar();
    cifraCorreta = cifrasMaiores[valorAleatorio];
};
function concluirPartida() {
    final.removeAttribute('hidden');
    caixaSequencia.setAttribute('hidden','until-found');
    caixaPergunta.setAttribute('hidden','until-found');
    caixaRespostas.setAttribute('hidden','until-found');
    caixaBotao.setAttribute('hidden','until-found');
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
    final.setAttribute('hidden','until-found');
    caixaSequencia.removeAttribute('hidden');
    caixaPergunta.removeAttribute('hidden');
    caixaRespostas.removeAttribute('hidden');
    caixaBotao.removeAttribute('hidden');
    novoJogo();
};
///////////////////////////////////////////////////////////////
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
