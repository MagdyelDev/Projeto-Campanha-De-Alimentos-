class AlimentoService {
  constructor() {
    this.alimentoRepository = new AlimentoRepository();
  }

  cadastrarAlimento(nome, quantidade, unidade, descricao = '') {
    // Validar dados
    if (!nome || !nome.trim()) {
      throw new Error('Nome do alimento é obrigatório.');
    }
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero.');
    }
    if (!unidade || !unidade.trim()) {
      throw new Error('Unidade de medida é obrigatória.');
    }

    // Criar e validar alimento
    const alimento = new Alimento(undefined, nome, quantidade, unidade, descricao);
    if (!alimento.validar()) {
      throw new Error('Dados do alimento inválidos.');
    }

    return this.alimentoRepository.salvar(alimento);
  }

  obterTodosAlimentos() {
    return this.alimentoRepository.obterTodos();
  }

  obterAlimentoPorId(id) {
    const alimento = this.alimentoRepository.obterPorId(id);
    if (!alimento) {
      throw new Error('Alimento não encontrado.');
    }
    return alimento;
  }

  buscarAlimentosPorNome(nome) {
    if (!nome || nome.trim() === '') {
      throw new Error('Termo de busca é obrigatório.');
    }
    return this.alimentoRepository.obterPorNome(nome);
  }

  atualizarAlimento(id, dadosAtualizacao) {
    const alimento = this.obterAlimentoPorId(id);
    
    if (dadosAtualizacao.nome) {
      alimento.nome = dadosAtualizacao.nome;
    }
    if (dadosAtualizacao.quantidade !== undefined && dadosAtualizacao.quantidade > 0) {
      alimento.quantidade = dadosAtualizacao.quantidade;
    }
    if (dadosAtualizacao.unidade) {
      alimento.unidade = dadosAtualizacao.unidade;
    }
    if (dadosAtualizacao.descricao !== undefined) {
      alimento.descricao = dadosAtualizacao.descricao;
    }

    if (!alimento.validar()) {
      throw new Error('Dados do alimento inválidos após atualização.');
    }

    return this.alimentoRepository.salvar(alimento);
  }

  deletarAlimento(id) {
    return this.alimentoRepository.deletar(id);
  }

  /**
   * Obtém estatísticas de alimentos
   */
  obterEstatisticas() {
    const alimentos = this.alimentoRepository.obterTodos();
    return {
      totalAlimentos: alimentos.length,
      totalItens: alimentos.reduce((sum, a) => sum + a.quantidade, 0)
    };
  }

  validarArrayAlimentos(alimentos) {
    return Array.isArray(alimentos) && 
           alimentos.length > 0 && 
           alimentos.every(alim => alim.validar());
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AlimentoService;
}
