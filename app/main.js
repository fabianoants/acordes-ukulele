//Gerar pergunta aleatória/////////////////////////////////////
let caixaPergunta = document.querySelector('.caixa__pergunta');
let valorAleatorio = Math.floor(Math.random() * 7);
const notaSelecionada = notasMaiores[valorAleatorio];
caixaPergunta.innerHTML = `<p>Qual cifra representa o acorde <i>${notaSelecionada}</i>?</p>`;
///////////////////////////////////////////////////////////////
//Gerar resposta aleatória/////////////////////////////////////
let caixaRespostas = document.querySelector(".caixa__respostas");
let alternativas = [];
//resposta certa//
alternativas.push(cifrasMaiores[valorAleatorio]);
//respostas aleatórias//
gerarAlternativas();
function gerarAlternativas() {
    for (let n = 0; n < 3; n++) {
        let valorGerado = Math.floor(Math.random() * 7);
        if (alternativas.includes(cifrasMaiores[valorGerado])) {
            n--;
        } else {
            alternativas.push(cifrasMaiores[valorGerado]);
        }
    };
}
//embaralhar as alternativas//
function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
altEmbaralhadas = embaralharArray(alternativas);
//inserir as alternativas//
for (let n = 0; n < 4; n++) {
    caixaRespostas.innerHTML += `<button onclick="verificarResposta('${altEmbaralhadas[n]}', this)" class="caixa__respostas__alt">${altEmbaralhadas[n]}</button>`
};
///////////////////////////////////////////////////////////////
//Acertar e Errar//////////////////////////////////////////////
let caixaRespostasAlt = document.querySelectorAll('.caixa__respostas__alt');
let bContinuar = document.getElementById('botao-continuar');
cifraCorreta = cifrasMaiores[valorAleatorio];
function verificarResposta(valor, botao) {
    if (valor == cifraCorreta) {
        botao.classList.add('caixa__respostas__alt-certo');
        botao.classList.remove('caixa__respostas__alt');
        ativarContinuar();
    } else {
        botao.classList.add('caixa__respostas__alt-errado');
        botao.classList.remove('caixa__respostas__alt');
        ativarContinuar();
    }
}
function ativarContinuar() {
    bContinuar.classList.add('caixa__botao__proximo');
    bContinuar.classList.remove('caixa__botao__proximo-desativo')
    bContinuar.removeAttribute('disabled', '')
}

function continuar() {
    for (let caixa = 0; caixa < caixaRespostasAlt.length; caixa++) {
        const element = caixaRespostasAlt[caixa];
        element.classList.add('caixa__respostas__alt');
        element.classList.remove('caixa__respostas__alt-certo');
        element.classList.remove('caixa__respostas__alt-errado');
    }  
}

console.log(cifraCorreta);
