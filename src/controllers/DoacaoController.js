class DoacaoController {
  constructor() {
    this.doacaoService = new DoacaoService();
    this.doadorController = new DoadorController();
    this.alimentoController = new AlimentoController();
  }

  registrarDoacao(req) {
    try {
      const { doadorId, alimentos } = req;

      // Validar entrada
      if (!doadorId) {
        return {
          sucesso: false,
          mensagem: 'ID do doador é obrigatório.',
          dados: null
        };
      }

      if (!Array.isArray(alimentos) || alimentos.length === 0) {
        return {
          sucesso: false,
          mensagem: 'Mínimo um alimento é obrigatório.',
          dados: null
        };
      }

      // Registrar doação via service
      const doacao = this.doacaoService.registrarDoacao(doadorId, alimentos);

      return {
        sucesso: true,
        mensagem: 'Doação registrada com sucesso!',
        dados: doacao
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao registrar doação.',
        dados: null
      };
    }
  }

  listarDoacoes() {
    try {
      const doacoes = this.doacaoService.obterTodasDoacoes();
      return {
        sucesso: true,
        mensagem: 'Doações listadas com sucesso.',
        dados: doacoes,
        total: doacoes.length
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao listar doações.',
        dados: null
      };
    }
  }

  obterDoacao(id) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID da doação é obrigatório.',
          dados: null
        };
      }

      const doacao = this.doacaoService.obterDoacaoPorId(id);
      return {
        sucesso: true,
        mensagem: 'Doação obtida com sucesso.',
        dados: doacao
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao obter doação.',
        dados: null
      };
    }
  }

  obterDoacoesDoDoador(doadorId) {
    try {
      if (!doadorId) {
        return {
          sucesso: false,
          mensagem: 'ID do doador é obrigatório.',
          dados: null
        };
      }

      const doacoes = this.doacaoService.obterDoacoesDoDoador(doadorId);
      return {
        sucesso: true,
        mensagem: 'Doações do doador obtidas com sucesso.',
        dados: doacoes,
        total: doacoes.length
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao obter doações.',
        dados: null
      };
    }
  }

  atualizarStatusDoacao(id, novoStatus) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID da doação é obrigatório.',
          dados: null
        };
      }

      if (!novoStatus) {
        return {
          sucesso: false,
          mensagem: 'Novo status é obrigatório.',
          dados: null
        };
      }

      const doacao = this.doacaoService.atualizarStatusDoacao(id, novoStatus);
      return {
        sucesso: true,
        mensagem: 'Status da doação atualizado com sucesso.',
        dados: doacao
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao atualizar status.',
        dados: null
      };
    }
  }

  deletarDoacao(id) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID da doação é obrigatório.',
          dados: null
        };
      }

      this.doacaoService.deletarDoacao(id);
      return {
        sucesso: true,
        mensagem: 'Doação deletada com sucesso.',
        dados: null
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao deletar doação.',
        dados: null
      };
    }
  }

  obterRelatorioCampanha() {
    try {
      const relatorio = this.doacaoService.obterRelatorioCampanha();
      return {
        sucesso: true,
        mensagem: 'Relatório da campanha obtido com sucesso.',
        dados: relatorio
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao obter relatório.',
        dados: null
      };
    }
  }

  obterEstatisticas() {
    try {
      const stats = this.doacaoService.obterEstatisticas();
      return {
        sucesso: true,
        mensagem: 'Estatísticas obtidas.',
        dados: stats
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao obter estatísticas.',
        dados: null
      };
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DoacaoController;
}
