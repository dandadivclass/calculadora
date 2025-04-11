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



//aqui utilizando o input pois ele permite as "teclas mortas" e esta limitando
//para que o usuario digite apenas numeros baseados na tabela ascii e os operadores essenciais


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
            console.log('Digite apenas números e os operadores +, -, *, /.');
        }

        //aqui a lógica é a de ocorrência onde vemos quantas vezes o operador aparece 
        //no input do usuario e limitamos para que ele apareça apenas uma vez
        //e nao pode aparecer no inicio da expressao

        let contadorOperadores = 0;
    
        if (valorAtual.length > 0 && operadores.includes(valorAtual[0])) {
            console.log('O operador não pode vir primeiro');
            input.value = '';
        }
        
        for (let i = 0; i < valorAtual.length; i++) {
            if (operadores.includes(valorAtual[i])) {
                contadorOperadores++;
            }
        }
    
        if (contadorOperadores > 1 && operadores.includes(ultimoValorInput)) {
            input.value = valorAtual.slice(0, -1);
            console.log('Apenas uma operação por vez');
        }
    
    // (* 42) (+ 43) (- 45) (/ 47) (= 61)
}


//começando as operações


const botoesDeOperadores = document.querySelectorAll('.operador-botao');
const botoesNumeros = document.querySelectorAll('.botoes-numeros');
const botaoIgual = document.querySelector('.botao-igual');


let primeiroNumero = null;
let operador = null;
let esperandoSegundoNumero = false;

function adicionarNumero(numero) {
    input.value += numero;
  }
  
function selecionarOperador(op) {
    primeiroNumero = parseFloat(input.value);
    operador = op;
    input.value + operador;  
    esperandoSegundoNumero = true;  
}
  
function calcular() {
    if (primeiroNumero === null || operador === null) return;

    const partes = input.value.split(operador); //cortando a expressao depois do operador
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
            return;
        }
            resultado = primeiroNumero / segundoNumero;
        break;
        default:
        return;
    }

    input.value = resultado;
    primeiroNumero = resultado;
    operador = null;
    esperandoSegundoNumero = false;
}

botoesNumeros.forEach(botao => {
  botao.addEventListener('click', () => {
    adicionarNumero(botao.textContent);
  });
});

botoesDeOperadores.forEach(botao => {
  botao.addEventListener('click', () => {
    selecionarOperador(botao.textContent);
  });
});

botaoIgual.addEventListener('click', calcular);




//usando o teclado fisico

input.addEventListener('input', function () {
    limitarEntrada();
});

input.addEventListener('keydown', function(event) {
    const key = event.key;
    if(key == 'Enter'){
        calcular();
    }
})

//usando o teclado virtual

botoesDeOperadores.forEach(botao => {
    botao.addEventListener('click', function() {
        limitarEntrada();
    });
});

botoesNumeros.forEach(botao => {
    botao.addEventListener('click', function() {
        limitarEntrada();
    });
});



