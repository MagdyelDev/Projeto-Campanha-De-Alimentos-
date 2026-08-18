document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     Header — sombra mais forte ao rolar
     ========================================================== */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ==========================================================
     Menu mobile
     ========================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ==========================================================
     Scrollspy — destaca o link ativo conforme a seção visível
     ========================================================== */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ==========================================================
     Revelação ao rolar (substitui a biblioteca AOS)
     ========================================================== */
  const aosItems = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  aosItems.forEach(item => aosObserver.observe(item));

  /* ==========================================================
     Modal de doação
     ========================================================== */
  const modal = document.getElementById('modalDoacao');
  const closeModal = document.getElementById('closeModal');
  const btnDoarHeader = document.getElementById('btnDoarHeader');
  const btnDoarHero = document.getElementById('btnDoarHero');

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeModalFn = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  btnDoarHeader.addEventListener('click', openModal);
  btnDoarHero.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeModalFn);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFn();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModalFn();
  });

  /* ---------- Abas do modal ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  /* ==========================================================
     Mini-CRUD de doações — tudo em memória, sem backend.
     Os dados somem ao recarregar a página; é só uma demonstração
     funcional da interface até haver um backend real conectado.
     ========================================================== */
  const doadores = [];
  const alimentos = [];
  const doacoes = [];

  const selectDoador = document.getElementById('doacaoDoador');
  const alimentosSelecionaveis = document.getElementById('alimentosSelecionaveis');
  const listaDoacoes = document.getElementById('listaDoacoes');

  function showMsg(elId, text, type) {
    const el = document.getElementById(elId);
    el.textContent = text;
    el.className = type;
  }

  // --- Cadastro de doador ---
  document.getElementById('formCadastroDoador').addEventListener('submit', (e) => {
    e.preventDefault();

    const doador = {
      id: Date.now(),
      nome: document.getElementById('doadorNome').value.trim(),
      telefone: document.getElementById('doadorTelefone').value.trim(),
      email: document.getElementById('doadorEmail').value.trim(),
      rua: document.getElementById('doadorRua').value.trim(),
      numero: document.getElementById('doadorNumero').value.trim(),
      bairro: document.getElementById('doadorBairro').value.trim(),
      cidade: document.getElementById('doadorCidade').value.trim(),
      cep: document.getElementById('doadorCep').value.trim(),
    };

    if (!doador.nome || !doador.email) {
      showMsg('msgCadastroDoador', 'Preencha ao menos nome e e-mail.', 'error');
      return;
    }

    doadores.push(doador);

    const option = document.createElement('option');
    option.value = doador.id;
    option.textContent = doador.nome;
    selectDoador.appendChild(option);

    showMsg('msgCadastroDoador', `Doador "${doador.nome}" cadastrado com sucesso!`, 'success');
    e.target.reset();
  });

  // --- Cadastro de alimento ---
  document.getElementById('formCadastroAlimento').addEventListener('submit', (e) => {
    e.preventDefault();

    const alimento = {
      id: Date.now(),
      nome: document.getElementById('alimentoNome').value.trim(),
      quantidade: document.getElementById('alimentoQuantidade').value,
      unidade: document.getElementById('alimentoUnidade').value.trim(),
      descricao: document.getElementById('alimentoDescricao').value.trim(),
    };

    if (!alimento.nome || !alimento.quantidade || !alimento.unidade) {
      showMsg('msgCadastroAlimento', 'Preencha nome, quantidade e unidade.', 'error');
      return;
    }

    alimentos.push(alimento);

    const label = document.createElement('label');
    label.className = 'alimento-check';
    label.innerHTML = `
      <input type="checkbox" value="${alimento.id}">
      ${alimento.nome} — ${alimento.quantidade} ${alimento.unidade}
    `;
    alimentosSelecionaveis.appendChild(label);

    showMsg('msgCadastroAlimento', `Alimento "${alimento.nome}" cadastrado com sucesso!`, 'success');
    e.target.reset();
  });

  // --- Registrar doação ---
  document.getElementById('formRegistrarDoacao').addEventListener('submit', (e) => {
    e.preventDefault();

    const doadorId = selectDoador.value;
    const checkboxes = alimentosSelecionaveis.querySelectorAll('input[type="checkbox"]:checked');

    if (!doadorId) {
      showMsg('msgRegistrarDoacao', 'Selecione um doador antes de registrar.', 'error');
      return;
    }

    if (checkboxes.length === 0) {
      showMsg('msgRegistrarDoacao', 'Selecione ao menos um alimento.', 'error');
      return;
    }

    const doador = doadores.find(d => d.id === Number(doadorId));
    const itensSelecionados = Array.from(checkboxes).map(cb =>
      alimentos.find(a => a.id === Number(cb.value))
    );

    const doacao = {
      id: Date.now(),
      doador,
      itens: itensSelecionados,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    doacoes.push(doacao);

    const item = document.createElement('div');
    item.className = 'doacao-item';
    item.innerHTML = `
      <h4>${doador.nome}</h4>
      <p><strong>Data:</strong> ${doacao.data}</p>
      <p><strong>Itens:</strong> ${itensSelecionados.map(i => `${i.nome} (${i.quantidade} ${i.unidade})`).join(', ')}</p>
    `;
    listaDoacoes.prepend(item);

    showMsg('msgRegistrarDoacao', 'Doação registrada com sucesso!', 'success');
    e.target.reset();
    checkboxes.forEach(cb => { cb.checked = false; });
  });

  /* ==========================================================
     Formulário de contato (seção Contato, fora do modal)
     ========================================================== */
  const formContato = document.getElementById('formularioContato');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(fieldId, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (message) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    } else {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }

  formContato.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const formInfo = document.getElementById('formInfo');

    let valido = true;

    if (!nome) {
      setError('nome', 'erroNome', 'Digite seu nome.');
      valido = false;
    } else {
      setError('nome', 'erroNome', '');
    }

    if (!email || !emailPattern.test(email)) {
      setError('email', 'erroEmail', 'Digite um e-mail válido.');
      valido = false;
    } else {
      setError('email', 'erroEmail', '');
    }

    if (!mensagem) {
      setError('mensagem', 'erroMensagem', 'Escreva sua mensagem.');
      valido = false;
    } else {
      setError('mensagem', 'erroMensagem', '');
    }

    if (!valido) {
      formInfo.className = 'form-info';
      formInfo.textContent = '';
      return;
    }

    // Sem backend conectado ainda — apenas confirma que o formulário está pronto para envio.
    formInfo.textContent = 'Mensagem pronta para envio! Conecte um backend ou serviço de e-mail para finalizar.';
    formInfo.className = 'form-info success';
    formContato.reset();
  });

});