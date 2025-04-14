const input = document.querySelector('#campo-numeros');
const operadores = ['+', '-', '*', '/', '='];

function inserirNumeroCampo(valorBotao) {
    input.value += valorBotao;
}

function apagarNumerosCampo() {
    input.value = '';
}

function voltarNumeroCampo() {
    input.value = input.value.slice(0, -1);
}

function limitarEntrada() {
    const valorAtual = input.value;
    const ultimoValorInput = valorAtual.charAt(valorAtual.length - 1);

    const unicode = ultimoValorInput.charCodeAt(0);

    if (!(unicode >= 48 && unicode <= 57) && 
        unicode !== 42 && 
        unicode !== 43 && 
        unicode !== 45 && 
        unicode !== 47 &&
        unicode !== 61 &&
        unicode !== 46) {
        input.value = valorAtual.slice(0, -1);
        console.log('Apenas números e os operadores.');
        // input.placeholder = 'Apenas números e os operadores.';
        return;
    }

    if (valorAtual.length === 1 && operadores.includes(ultimoValorInput)) {
        input.value = '';
        console.log('O operador não pode vir primeiro');
        return;
    }

    let contadorOperadores = 0;

    for (let i = 0; i < valorAtual.length; i++) {
        if (operadores.includes(valorAtual[i])) {
            contadorOperadores++;
        }
    }

    if (contadorOperadores > 1 && operadores.includes(ultimoValorInput)) {
        input.value = valorAtual.slice(0, -1);
        console.log('Apenas uma operação por vez');
    }
}

const botoesDeOperadores = document.querySelectorAll('.operador-botao');
const botoesNumeros = document.querySelectorAll('.botoes-numeros');
const botaoIgual = document.querySelector('.botao-igual');

let primeiroNumero = null;
let operador = null;
let calculoFinalizado = false;

function adicionarNumero(numero) {
    if (calculoFinalizado) {
        input.value = '';
        calculoFinalizado = false;
    }

    input.value += numero;
}

function selecionarOperador(op) {
    if (input.value === '') return;

    primeiroNumero = parseFloat(input.value);
    operador = op;
    input.value + operador; 
    calculoFinalizado = false;
}

function calcular() {
    if (primeiroNumero === null || operador === null) return;

    const partes = input.value.split(operador);
    if (partes.length !== 2 || partes[1] === '') return;

    const segundoNumero = parseFloat(partes[1]);
    let resultado;

    switch (operador) {
        case '+':
            resultado = primeiroNumero + segundoNumero;
            break;
        case '-':
            resultado = primeiroNumero - segundoNumero;
            break;
        case '*':
            resultado = primeiroNumero * segundoNumero;
            break;
        case '/':
            if (segundoNumero === 0) {
                input.value = 'Erro: Divisão por zero';
                calculoFinalizado = true;
                return;
            }
            resultado = primeiroNumero / segundoNumero;
            break;
        default:
            return;
    }

    input.value = resultado;
    operador = null;
    calculoFinalizado = true;
}


botoesNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        adicionarNumero(botao.textContent);
        limitarEntrada();
    });
});

botoesDeOperadores.forEach(botao => {
    botao.addEventListener('click', () => {
        selecionarOperador(botao.textContent);
        limitarEntrada();
    });
});

botaoIgual.addEventListener('click', calcular);



input.addEventListener('input', function () {
    limitarEntrada();
});


input.addEventListener('keydown', function(event) {
    const key = event.key;


    if (['+', '-', '*', '/'].includes(key)) {
        selecionarOperador(key);
    }

    else if (key === 'Enter') {
        calcular();
        event.preventDefault(); 
    }

    else if (key === 'Backspace') {
        input.value = input.value.slice(0, -1);
    }

    else if (key === '.') {
        if (!input.value.includes('.')) {
        input.value + '.';
        }
    }

    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        apagarNumerosCampo();
    }
});