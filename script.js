function calcularIMC(event) {

event.preventDefault();

//Pegando valor do imput
const peso = document.getElementById("Peso").value;
const altura = document.getElementById("Altura").value;

//convertendo dados do input em número
const pesoConvertido = Number(peso);
const alturaConvertida = Number(altura);

const imc = (pesoConvertido / (alturaConvertida * alturaConvertida)).toFixed(2);

let classificacao = ""
if (imc < 18.5)
  classificacao = "Abaixo do peso";
else if (imc >= 18.5 && imc <= 24.9) {
  classificacao = "Peso normal";
} else if (imc >= 25 && imc <= 29.9) {
  classificacao = "Sobrepeso";
} else if (imc >= 30 && imc <= 34.9) {
  classificacao = "Obesidade grau I";
} else {
  classificacao = "Obesidade grau II ou mais";
}

const resultado = document.getElementById("Resultado");
resultado.innerText = `Seu IMC é ${imc} - ${classificacao}`;
}
