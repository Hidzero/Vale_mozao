const valesPorMes = {
    janeiro: ["Café da manhã na cama", "Massagem relaxante", "Cinema a dois"],
    fevereiro: ["Jantar especial", "Passeio surpresa", "Vale abraço"],
    março: ["Vale filme em casa", "Pizza no domingo", "Dia sem tarefas"],
    abril: ["Viagem de um dia", "Sorvete liberado", "Vale carinho"],
    maio: ["Passeio no parque", "Vale sossego", "Pequeno presente"],
    junho: ["Vale chamego", "Cartinha romântica", "Noite de jogos"],
    julho: ["Vale bolo", "Série favorita", "Manhã sem alarmes"],
    agosto: ["Piquenique", "Vale beijo", "Entrega de flores"],
    setembro: ["Vale carinho", "Assistir ao pôr do sol", "Comida favorita"],
    outubro: ["Halloween divertido", "Vale chocolate", "Vale mimo"],
    novembro: ["Vale declaração", "Filme no cinema", "Comidinha caseira"],
    dezembro: ["Vale Natal", "Cartão especial", "Surpresa de Ano Novo"]
};

localStorage.clear();


const numeroWhatsApp = '5521967214778';

function enviarWhatsApp(mensagem) {
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

function carregarValesDoMes() {
  const dataAtual = new Date();
  const nomeMes = dataAtual.toLocaleString('pt-BR', { month: 'long' }).toLowerCase();
  const vales = valesPorMes[nomeMes] || [];

  const container = document.getElementById('vales-container');
  container.innerHTML = '';

  vales.forEach((vale, index) => {
    const template = document.getElementById('vale-template');
    const clone = template.content.cloneNode(true);

    const titulo = clone.querySelector('.vale-titulo');
    titulo.textContent = vale;

    const botao = clone.querySelector('button.usar');
    const chave = `${nomeMes}-${index}`;
    if (localStorage.getItem(chave)) {
      botao.textContent = 'Usado';
      botao.disabled = true;
      clone.querySelector('.vale-card').classList.add('usado');
    }

    botao.addEventListener('click', () => {
      localStorage.setItem(chave, 'true');
      botao.textContent = 'Usado';
      botao.disabled = true;
      clone.querySelector('.vale-card').classList.add('usado');
      enviarWhatsApp(`Estou usando o vale: ${vale}`);
    });

    container.appendChild(clone);
  });
}

document.addEventListener('DOMContentLoaded', carregarValesDoMes);