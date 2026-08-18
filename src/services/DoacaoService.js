class DoacaoService {
  constructor() {
    this.doacaoRepository = new DoacaoRepository();
    this.doadorService = new DoadorService();
    this.alimentoService = new AlimentoService();
  }

  registrarDoacao(doadorId, alimentos) {
    // Validar doador
    const doador = this.doadorService.obterDoadorPorId(doadorId);

    // Validar alimentos
    if (!Array.isArray(alimentos) || alimentos.length === 0) {
      throw new Error('Mínimo um alimento é obrigatório na doação.');
    }

    // Validar cada alimento
    const alimentosValidos = alimentos.map(alim => {
      if (!alim.id) {
        throw new Error('Alimento deve ter um ID válido.');
      }
      const alimentoDB = this.alimentoService.obterAlimentoPorId(alim.id);
      if (alim.quantidadeDoada <= 0) {
        throw new Error(`Quantidade de ${alimentoDB.nome} deve ser maior que zero.`);
      }
      return alimentoDB;
    });

    // Criar doação
    const doacao = new Doacao(undefined, new Date(), doador, alimentosValidos);
    
    if (!doacao.validar()) {
      throw new Error('Dados da doação inválidos.');
    }

    return this.doacaoRepository.salvar(doacao);
  }

  obterTodasDoacoes() {
    return this.doacaoRepository.obterTodos();
  }

  obterDoacaoPorId(id) {
    const doacao = this.doacaoRepository.obterPorId(id);
    if (!doacao) {
      throw new Error('Doação não encontrada.');
    }
    return doacao;
  }

  obterDoacoesDoDoador(doadorId) {
    this.doadorService.obterDoadorPorId(doadorId); // Validar que doador existe
    return this.doacaoRepository.obterPorDoador(doadorId);
  }

  obterDoacoesPorPeriodo(dataInicio, dataFim) {
    return this.doacaoRepository.obterPorPeriodo(dataInicio, dataFim);
  }

  atualizarStatusDoacao(id, novoStatus) {
    const statusValidos = ['registrada', 'recebida', 'entregue'];
    
    if (!statusValidos.includes(novoStatus)) {
      throw new Error(`Status inválido. Deve ser um de: ${statusValidos.join(', ')}`);
    }

    const doacao = this.obterDoacaoPorId(id);
    doacao.status = novoStatus;
    
    return this.doacaoRepository.salvar(doacao);
  }

  deletarDoacao(id) {
    return this.doacaoRepository.deletar(id);
  }

  obterEstatisticas() {
    const doacoes = this.doacaoRepository.obterTodos();
    const alimentoService = new AlimentoService();
    const alimentosStats = alimentoService.obterEstatisticas();

    const totalAlimentosDoacoes = doacoes.reduce((sum, d) => {
      return sum + d.alimentos.reduce((subsum, a) => subsum + a.quantidade, 0);
    }, 0);

    return {
      totalDoacoes: doacoes.length,
      totalAlimentosDoacoes: totalAlimentosDoacoes,
      doacoesRecebidas: this.doacaoRepository.obterPorStatus('recebida').length,
      doacoesEntregues: this.doacaoRepository.obterPorStatus('entregue').length,
      doacoesRegistradas: this.doacaoRepository.obterPorStatus('registrada').length
    };
  }

  /**
   * Obtém relatório completo da campanha
   */
  obterRelatorioCampanha() {
    const doadorService = new DoadorService();
    
    return {
      doadores: doadorService.obterEstatisticas(),
      alimentos: this.alimentoService.obterEstatisticas(),
      doacoes: this.obterEstatisticas()
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DoacaoService;
}
