//Gerar pergunta aleatória/////////////////////////////////////
let caixaPergunta = document.querySelector('.caixa__pergunta');
let valorAleatorio = Math.floor(Math.random() * 7);
let notaSelecionada = notasMaiores[valorAleatorio];
caixaPergunta.innerHTML = `<p>Qual cifra representa o acorde <i>${notaSelecionada}</i>?</p>`;
///////////////////////////////////////////////////////////////
//Gerar alternativas aleatórias////////////////////////////////
let caixaRespostas = document.querySelector(".caixa__respostas");
let alternativas = [];
gerarAlternativas();
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
}
embaralhar();
///////////////////////////////////////////////////////////////
//Acertar e Errar//////////////////////////////////////////////
let acertos = 0;
let vidas = 3;
let coracao = document.querySelector('.caixa__sequencia__vidas__valor');
coracao.innerHTML = `${vidas}`;
let caixaRespostasAlt = document.querySelectorAll('.caixa__respostas__alt');
let bContinuar = document.getElementById('botao-continuar');
cifraCorreta = cifrasMaiores[valorAleatorio];
function verificarResposta(valor, botao) {
    if (valor == cifraCorreta) {
        botao.classList.add('caixa__respostas__alt-certo');
        ativarContinuar();
        acharResposta();
        acertos = acertos + 10;
        linhaPontuada();
    } else {
        botao.classList.add('caixa__respostas__alt-errado');
        diminuirVidas();
        if(vidas == 0) {
            acharResposta();
            recomecar();

        } else {
            ativarContinuar();
            acharResposta();
        } 
    }
}
function diminuirVidas() {
    vidas--;
    coracao.innerHTML = `${vidas}`;
}
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
function recomecar() {
    bContinuar.innerText = "Recomeçar";
    bContinuar.removeAttribute('disabled', '');
    bContinuar.classList.remove('caixa__botao__proximo-desativo');
    bContinuar.classList.add('caixa__botao__recomecar');
    linhaResposta.classList.add('caixa__sequencia__respondidas-desativa');
    vidas = 3;
    bContinuar.setAttribute('onclick', 'novoJogo()');
}
function novoJogo() {
    coracao.innerHTML = `${vidas}`;
    bContinuar.setAttribute('onclick', 'continuar()');
    bContinuar.innerText = "Continuar";
    bContinuar.classList.remove('caixa__botao__recomecar');
    linhaResposta.classList.remove('caixa__sequencia__respondidas-desativa');
    desativarContinuar();
    reiniciar();
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
    for (let caixa = 0; caixa < caixaRespostasAlt.length; caixa++) {
        const element = caixaRespostasAlt[caixa];
        element.classList.remove('caixa__respostas__alt-certo');
        element.classList.remove('caixa__respostas__alt-errado');
        element.removeAttribute('disabled', '');
    } 
    reiniciar();
};
function reiniciar() {
    desativarContinuar();
    caixaRespostas.innerHTML = "";
    valorAleatorio = Math.floor(Math.random() * 7);
    notaSelecionada = notasMaiores[valorAleatorio];
    caixaPergunta.innerHTML = `<p>Qual cifra representa o acorde <i>${notaSelecionada}</i>?</p>`;
    alternativas = [];
    gerarAlternativas(); 
    embaralhar();
    cifraCorreta = cifrasMaiores[valorAleatorio];
    console.log(cifraCorreta);
};
console.log(cifraCorreta);
