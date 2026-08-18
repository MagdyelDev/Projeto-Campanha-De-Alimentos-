// ====================================
// CONTROLADORES DA APLICAÇÃO
// ====================================

const doadorController = new DoadorController();
const alimentoController = new AlimentoController();
const doacaoController = new DoacaoController();

// ====================================
// ELEMENTOS DO DOM
// ====================================

const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const btnDoarHeader = document.getElementById('btnDoarHeader');
const btnDoarHero = document.getElementById('btnDoarHero');

const modal = document.getElementById('modalDoacao');
const closeModal = document.getElementById('closeModal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const formularioContato = document.getElementById('formularioContato');

// ====================================
// HEADER E NAVEGAÇÃO
// ====================================

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/**
 * Efeito de sombra no header ao fazer scroll
 */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Atualizar link ativo conforme scroll
  atualizarNavActive();
});

function atualizarNavActive() {
  const secoes = document.querySelectorAll('section');
  let secaoAtiva = '';

  secoes.forEach(secao => {
    const top = secao.offsetTop;
    const altura = secao.clientHeight;
    if (window.scrollY >= top - 200) {
      secaoAtiva = secao.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(secaoAtiva)) {
      link.classList.add('active');
    }
  });
}

// ====================================
// MODAL E ABAS
// ====================================

function abrirModal() {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  carregarDoadores();
  atualizarListaDoacoes();
}

function fecharModal() {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

btnDoarHeader.addEventListener('click', (e) => {
  e.preventDefault();
  abrirModal();
});

btnDoarHero.addEventListener('click', abrirModal);

closeModal.addEventListener('click', fecharModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    
    // Remover classe active de todos os botões
    tabBtns.forEach(b => b.classList.remove('active'));
    
    // Adicionar classe active ao botão clicado
    btn.classList.add('active');
    
    // Ocultar todos os conteúdos
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Mostrar o conteúdo da aba selecionada
    document.getElementById(tabName).classList.add('active');
  });
});

// ====================================
// CADASTRO DE DOADOR
// ====================================

const formCadastroDoador = document.getElementById('formCadastroDoador');
const msgCadastroDoador = document.getElementById('msgCadastroDoador');

formCadastroDoador.addEventListener('submit', (e) => {
  e.preventDefault();

  const req = {
    nome: document.getElementById('doadorNome').value,
    telefone: document.getElementById('doadorTelefone').value,
    email: document.getElementById('doadorEmail').value,
    rua: document.getElementById('doadorRua').value,
    numero: document.getElementById('doadorNumero').value,
    bairro: document.getElementById('doadorBairro').value,
    cidade: document.getElementById('doadorCidade').value,
    cep: document.getElementById('doadorCep').value
  };

  const resultado = doadorController.cadastrarDoador(req);

  if (resultado.sucesso) {
    mostrarMensagem(msgCadastroDoador, resultado.mensagem, 'success');
    formCadastroDoador.reset();
    setTimeout(() => carregarDoadores(), 500);
  } else {
    mostrarMensagem(msgCadastroDoador, resultado.mensagem, 'error');
  }
});

function carregarDoadores() {
  const resultado = doadorController.listarDoadores();
  const selectDoador = document.getElementById('doacaoDoador');
  
  if (resultado.sucesso && resultado.dados.length > 0) {
    const optionsPadrao = '<option value="">Selecione um doador</option>';
    const optionsDoadores = resultado.dados
      .map(d => `<option value="${d.id}">${d.nome} (${d.email})</option>`)
      .join('');
    
    selectDoador.innerHTML = optionsPadrao + optionsDoadores;
  }
}

// ====================================
// CADASTRO DE ALIMENTO
// ====================================

const formCadastroAlimento = document.getElementById('formCadastroAlimento');
const msgCadastroAlimento = document.getElementById('msgCadastroAlimento');

formCadastroAlimento.addEventListener('submit', (e) => {
  e.preventDefault();

  const req = {
    nome: document.getElementById('alimentoNome').value,
    quantidade: document.getElementById('alimentoQuantidade').value,
    unidade: document.getElementById('alimentoUnidade').value,
    descricao: document.getElementById('alimentoDescricao').value
  };

  const resultado = alimentoController.cadastrarAlimento(req);

  if (resultado.sucesso) {
    mostrarMensagem(msgCadastroAlimento, resultado.mensagem, 'success');
    formCadastroAlimento.reset();
    setTimeout(() => carregarAlimentos(), 500);
  } else {
    mostrarMensagem(msgCadastroAlimento, resultado.mensagem, 'error');
  }
});

function carregarAlimentos() {
  const resultado = alimentoController.listarAlimentos();
  const container = document.getElementById('alimentosSelecionaveis');

  if (resultado.sucesso && resultado.dados.length > 0) {
    const alimentosHTML = resultado.dados
      .map(a => `
        <div class="alimento-checkbox" style="display: flex; align-items: center; gap: 10px; margin: 10px 0; padding: 10px; background: #F5F5F5; border-radius: 4px;">
          <input type="checkbox" value="${a.id}" class="alimento-check" id="alim_${a.id}">
          <label for="alim_${a.id}" style="cursor: pointer; margin: 0; flex-grow: 1;">
            ${a.nome} - ${a.quantidade} ${a.unidade}
          </label>
        </div>
      `)
      .join('');
    
    container.innerHTML = alimentosHTML;
  } else {
    container.innerHTML = '<p style="color: #666; padding: 10px;">Nenhum alimento cadastrado. Cadastre primeiro na aba anterior.</p>';
  }
}

// ====================================
// REGISTRAR DOAÇÃO
// ====================================

const formRegistrarDoacao = document.getElementById('formRegistrarDoacao');
const msgRegistrarDoacao = document.getElementById('msgRegistrarDoacao');

formRegistrarDoacao.addEventListener('submit', (e) => {
  e.preventDefault();

  const doadorId = document.getElementById('doacaoDoador').value;
  const alimentosSelecionados = Array.from(document.querySelectorAll('.alimento-check:checked'))
    .map(check => ({ id: check.value, quantidadeDoada: 1 }));

  if (!doadorId) {
    mostrarMensagem(msgRegistrarDoacao, 'Selecione um doador', 'error');
    return;
  }

  if (alimentosSelecionados.length === 0) {
    mostrarMensagem(msgRegistrarDoacao, 'Selecione pelo menos um alimento', 'error');
    return;
  }

  const resultado = doacaoController.registrarDoacao({
    doadorId: doadorId,
    alimentos: alimentosSelecionados
  });

  if (resultado.sucesso) {
    mostrarMensagem(msgRegistrarDoacao, resultado.mensagem, 'success');
    formRegistrarDoacao.reset();
    document.querySelectorAll('.alimento-check').forEach(c => c.checked = false);
    setTimeout(() => atualizarListaDoacoes(), 500);
  } else {
    mostrarMensagem(msgRegistrarDoacao, resultado.mensagem, 'error');
  }
});

function atualizarListaDoacoes() {
  const resultado = doacaoController.listarDoacoes();
  const container = document.getElementById('listaDoacoes');

  if (resultado.sucesso && resultado.dados.length > 0) {
    const doacoesHTML = resultado.dados
      .map(d => {
        const dataFormatada = new Date(d.dataDoacao).toLocaleDateString('pt-BR');
        const alimentosTexto = d.alimentos
          .map(a => `${a.nome} (${a.quantidade} ${a.unidade})`)
          .join(', ');
        
        return `
          <div class="doacao-item">
            <h4>Doação #${d.id.substring(0, 8)}</h4>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Doador:</strong> ${d.doador.nome}</p>
            <p><strong>Alimentos:</strong> ${alimentosTexto}</p>
            <p><strong>Status:</strong> ${d.status}</p>
          </div>
        `;
      })
      .join('');
    
    container.innerHTML = doacoesHTML;
  } else {
    container.innerHTML = '<p style="color: #666; padding: 10px;">Nenhuma doação registrada ainda.</p>';
  }
}

// ====================================
// FORMULÁRIO DE CONTATO
// ====================================

formularioContato.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Limpar mensagens de erro
  document.querySelectorAll('.error').forEach(el => el.classList.remove('show'));

  let temErro = false;

  // Validar nome
  if (nome === '' || nome.length < 3) {
    mostrarErro('erroNome', 'Digite um nome com mínimo 3 caracteres');
    temErro = true;
  }

  // Validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    mostrarErro('erroEmail', 'Digite um e-mail válido');
    temErro = true;
  }

  // Validar mensagem
  if (mensagem === '' || mensagem.length < 10) {
    mostrarErro('erroMensagem', 'A mensagem deve ter mínimo 10 caracteres');
    temErro = true;
  }

  if (temErro) {
    return;
  }

  // Simular envio
  const formInfo = document.getElementById('formInfo');
  formInfo.textContent = 'Enviando mensagem...';
  formInfo.classList.add('success');

  setTimeout(() => {
    formInfo.textContent = '✓ Mensagem enviada com sucesso! Obrigado por entrar em contato.';
    formularioContato.reset();

    setTimeout(() => {
      formInfo.classList.remove('success');
    }, 3000);
  }, 1500);
});

/**
 * Mostra mensagem de erro no formulário de contato
 */
function mostrarErro(elementoId, mensagem) {
  const elemento = document.getElementById(elementoId);
  elemento.textContent = mensagem;
  elemento.classList.add('show');
}

// ====================================
// UTILITÁRIOS
// ====================================

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.classList.remove('error', 'success');
  elemento.classList.add(tipo);
  
  setTimeout(() => {
    elemento.classList.remove(tipo);
  }, 3000);
}

// ====================================
// ANIMAÇÕES COM INTERSECTION OBSERVER
// ====================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Aplicar observer aos elementos com data-aos
document.querySelectorAll('[data-aos]').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(element);
});

// ====================================
// INICIALIZAÇÃO
// ====================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🍲 Panela Solidária iniciada!');
  console.log('Arquitetura em camadas carregada com sucesso.');
  
  // Carregar dados iniciais
  carregarDoadores();
  carregarAlimentos();
  atualizarListaDoacoes();
});

// ====================================
// ESTATÍSTICAS (opcional - para desenvolvimento)
// ====================================

window.obterEstatisticas = () => {
  const relatorio = doacaoController.obterRelatorioCampanha();
  console.log('Relatório da Campanha:', relatorio);
  return relatorio;
};

console.log('%c🍲 Bem-vindo ao Panela Solidária!', 'color: #FF6B00; font-size: 16px; font-weight: bold;');
console.log('%cDigite obterEstatisticas() no console para ver o relatório da campanha.', 'color: #666; font-size: 12px;');
