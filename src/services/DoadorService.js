class DoadorService {
  constructor() {
    this.doadorRepository = new DoadorRepository();
    this.enderecoRepository = new EnderecoRepository();
  }

  cadastrarDoador(nome, telefone, email, endereco) {
    // Validar e-mail único
    const doadorExistente = this.doadorRepository.obterPorEmail(email);
    if (doadorExistente) {
      throw new Error('Esse e-mail já está cadastrado no sistema.');
    }

    // Validar dados
    if (!nome || !nome.trim()) {
      throw new Error('Nome do doador é obrigatório.');
    }
    if (!telefone || !telefone.trim()) {
      throw new Error('Telefone é obrigatório.');
    }
    if (!email || !email.includes('@')) {
      throw new Error('E-mail inválido.');
    }
    if (!endereco) {
      throw new Error('Endereço é obrigatório.');
    }

    // Salvar endereço
    this.enderecoRepository.salvar(endereco);

    // Criar e salvar doador
    const doador = new Doador(undefined, nome, telefone, email, endereco);
    if (!doador.validar()) {
      throw new Error('Dados do doador inválidos.');
    }

    return this.doadorRepository.salvar(doador);
  }

  obterTodosDoadores() {
    return this.doadorRepository.obterTodos();
  }

  obterDoadorPorId(id) {
    const doador = this.doadorRepository.obterPorId(id);
    if (!doador) {
      throw new Error('Doador não encontrado.');
    }
    return doador;
  }

  atualizarDoador(id, dadosAtualizacao) {
    const doador = this.obterDoadorPorId(id);
    
    // Atualizar campos permitidos
    if (dadosAtualizacao.nome) {
      doador.nome = dadosAtualizacao.nome;
    }
    if (dadosAtualizacao.telefone) {
      doador.telefone = dadosAtualizacao.telefone;
    }
    if (dadosAtualizacao.email) {
      // Validar novo e-mail se for diferente
      if (dadosAtualizacao.email !== doador.email) {
        const doadorComEmail = this.doadorRepository.obterPorEmail(dadosAtualizacao.email);
        if (doadorComEmail) {
          throw new Error('Esse e-mail já está cadastrado.');
        }
      }
      doador.email = dadosAtualizacao.email;
    }

    if (!doador.validar()) {
      throw new Error('Dados do doador inválidos após atualização.');
    }

    return this.doadorRepository.salvar(doador);
  }

  deletarDoador(id) {
    return this.doadorRepository.deletar(id);
  }

  obterEstatisticas() {
    return {
      totalDoadores: this.doadorRepository.contar(),
      enderecos: this.enderecoRepository.contar()
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DoadorService;
}
