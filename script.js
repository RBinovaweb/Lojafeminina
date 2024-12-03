let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  // Adicionar item ao carrinho
  carrinho.push({ nome, preco });
  alert(`${nome} foi adicionado ao carrinho!`);

  // Atualizar o valor total e mostrar os itens no carrinho
  calcularValorFinal();
  exibirItensCarrinho();
}

function enviarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }

  // Gerar a mensagem do pedido
  let mensagem = "Olá, gostaria de finalizar o pedido:\n\n";
  let total = 0;

  carrinho.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  // Codificar mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem);

  // Link do WhatsApp (substitua pelo número do WhatsApp da loja)
  const numeroWhatsApp = "5527997294468"; // Exemplo: +55 41 99999-9999
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

  // Abrir o WhatsApp
  window.open(url, "_blank");
}

function calcularTotal() {
  let total = 0;
  carrinho.forEach(item => {
    total += item.preco;
  });
  return total;
}

function aplicarCupom() {
  const cupom = document.getElementById('cupom').value;
  let desconto = 0;
  let freteGratis = false;

  if (cupom === 'DESCONTO10') {
    desconto = 0.10;  // 10% de desconto
  } else if (cupom === '2') {
    freteGratis = true;
    aplicarFreteGratis();
  }

  return { desconto, freteGratis };
}

function aplicarFreteGratis() {
  const frete = document.getElementById('frete');
  frete.innerText = 'Frete grátis';
  frete.style.color = 'green';  // Opcional, para destacar o frete grátis
}

function exibirItensCarrinho() {
  const carrinhoItensDiv = document.getElementById('carrinho-itens');
  carrinhoItensDiv.innerHTML = '';
  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    carrinhoItensDiv.appendChild(itemDiv);
  });
}

function calcularValorFinal() {
  let total = calcularTotal(); // Obter total dos itens
  const { desconto, freteGratis } = aplicarCupom(); // Aplicar cupom de desconto

  // Aplicar desconto
  let valorComDesconto = total * (1 - desconto);

  // Se frete grátis, não adicionar valor de frete
  if (freteGratis) {
    valorComDesconto += 0;  // Pode ajustar se tiver custo de frete
  }

  // Exibir o valor final
  document.getElementById('total').innerText = valorComDesconto.toFixed(2);
}

// Chama a função para calcular o total e aplicar o cupom ao mudar o campo de cupom
document.getElementById('cupom').addEventListener('input', calcularValorFinal);