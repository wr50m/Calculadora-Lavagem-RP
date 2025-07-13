function calcularValor() {
    const valor = parseFloat(document.getElementById('valor').value);
    const radioSelecionado = document.querySelector('input[name="percentual"]:checked');
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "";

    if (isNaN(valor) || !radioSelecionado) {
        alert("Informe um valor válido e selecione um percentual.");
        return;
    }

    const percentual = parseInt(radioSelecionado.value);
    const valorFac = valor * (percentual / 100);
    const valorEntregue = valor - valorFac;

    const bloco = `
        <p><strong>Percentual:</strong> ${percentual}%</p>
        <p><strong>Valor Sujo:</strong> R$ ${valor.toFixed(2).replace('.', ',')}</p>
        <p><strong>Valor Entregue:</strong> R$ ${valorEntregue.toFixed(2).replace('.', ',')}</p>
        <p><strong>Valor Fac:</strong> R$ ${valorFac.toFixed(2).replace('.', ',')}</p>
    `;
    resultadoDiv.innerHTML = bloco;
    resultadoDiv.style.display = "block";

    const textoFinal = `Percentual: ${percentual}%\nValor Sujo: R$ ${valor.toFixed(2)}\nValor Entregue: R$ ${valorEntregue.toFixed(2)}\nValor Fac: R$ ${valorFac.toFixed(2)}\n`;
    localStorage.setItem("resultadoCalculo", textoFinal);

}

function baixarResultado() {
    const conteudo = localStorage.getItem("resultadoCalculo");
    if (!conteudo) {
        alert("Nenhum resultado disponível. Faça um cálculo primeiro.");
        return;
    }

    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resultado.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
