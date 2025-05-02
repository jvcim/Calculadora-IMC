document.getElementById("formIMC").addEventListener("submit", calcularIMC);

function calcularIMC(event) {
  event.preventDefault();

  const peso = document.getElementById("Peso").value.replace(",", ".");
  const altura = document.getElementById("Altura").value.replace(",", ".");

  const pesoConvertido = Number(peso);
  const alturaConvertida = Number(altura);
  const resultado = document.getElementById("Resultado");

  if (isNaN(pesoConvertido) || isNaN(alturaConvertida) || alturaConvertida <= 0) {
    resultado.innerHTML = `<span class="text-red-600">Insira valores válidos para peso e altura.</span>`;
    return;
  }

  const imc = (pesoConvertido / (alturaConvertida * alturaConvertida)).toFixed(2);
  let classificacao = "";
  let cor = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    cor = "text-yellow-500";
    icone = "⚠️";
  } else if (imc <= 24.9) {
    classificacao = "Peso normal";
    cor = "text-green-600";
    icone = "✅";
  } else if (imc <= 29.9) {
    classificacao = "Sobrepeso";
    cor = "text-yellow-600";
    icone = "⚠️";
  } else if (imc <= 34.9) {
    classificacao = "Obesidade grau I";
    cor = "text-orange-600";
    icone = "❗";
  } else {
    classificacao = "Obesidade grau II ou mais";
    cor = "text-red-600";
    icone = "❌";
  }

  resultado.innerHTML = `
    <p class="${cor}">${icone}
      Seu IMC é <strong>${imc}</strong><br>${classificacao}
    </p>`;
}
