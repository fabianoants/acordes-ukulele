//Gerar pergunta aleatória/////////////////////////////////////
let caixaPergunta = document.querySelector('.caixa__pergunta');
let valorAleatorio = Math.floor(Math.random() * 7);
console.log(valorAleatorio);
const notaSelecionada = notasMaiores[valorAleatorio];
caixaPergunta.innerHTML += `<p>Qual cifra representa o acorde <i>${notaSelecionada}</i>?</p>`;
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
    caixaRespostas.innerHTML += `<li class="caixa__respostas__alt">${altEmbaralhadas[n]}</li>`
};
///////////////////////////////////////////////////////////////
