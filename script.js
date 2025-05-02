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
  let icone = "";

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

  resultado.innerHTML = `<p class="${cor}">${icone} Seu IMC é <strong>${imc}</strong> - ${classificacao}</p>`;

  salvarNoHistorico(imc, classificacao);
  renderizarHistorico();
}

function salvarNoHistorico(imc, classificacao) {
  const novaEntrada = {
    imc: imc,
    classificacao: classificacao,
    data: new Date().toLocaleString("pt-BR")
  };

  const historicoAtual = JSON.parse(localStorage.getItem("historicoIMC")) || [];
  historicoAtual.unshift(novaEntrada);
  localStorage.setItem("historicoIMC", JSON.stringify(historicoAtual));
}

function renderizarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historicoIMC")) || [];
  const divHistorico = document.getElementById("historicoIMC");
  divHistorico.innerHTML = "";

  if (historico.length === 0) return;

  divHistorico.innerHTML = `<h2 class="text-lg font-semibold text-white mb-2">Histórico</h2>`;

  historico.forEach((item) => {
    const bloco = document.createElement("div");
    bloco.className = "bg-slate-700 text-white p-3 rounded shadow";
    bloco.innerHTML = `
      <div><strong>IMC:</strong> ${item.imc}</div>
      <div><strong>Classificação:</strong> ${item.classificacao}</div>
      <div><strong>Data:</strong> ${item.data}</div>
    `;
    divHistorico.appendChild(bloco);
  });
}

// exibe histórico ao carregar
renderizarHistorico();
