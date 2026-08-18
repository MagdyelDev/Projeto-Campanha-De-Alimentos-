class AlimentoController {
  constructor() {
    this.alimentoService = new AlimentoService();
  }

  cadastrarAlimento(req) {
    try {
      const { nome, quantidade, unidade, descricao } = req;

      // Validar entrada
      if (!nome || !quantidade || !unidade) {
        return {
          sucesso: false,
          mensagem: 'Nome, quantidade e unidade são obrigatórios.',
          dados: null
        };
      }

      // Cadastrar alimento via service
      const alimento = this.alimentoService.cadastrarAlimento(
        nome,
        parseFloat(quantidade),
        unidade,
        descricao || ''
      );

      return {
        sucesso: true,
        mensagem: 'Alimento cadastrado com sucesso!',
        dados: alimento
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao cadastrar alimento.',
        dados: null
      };
    }
  }

  listarAlimentos() {
    try {
      const alimentos = this.alimentoService.obterTodosAlimentos();
      return {
        sucesso: true,
        mensagem: 'Alimentos listados com sucesso.',
        dados: alimentos,
        total: alimentos.length
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao listar alimentos.',
        dados: null
      };
    }
  }

  obterAlimento(id) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID do alimento é obrigatório.',
          dados: null
        };
      }

      const alimento = this.alimentoService.obterAlimentoPorId(id);
      return {
        sucesso: true,
        mensagem: 'Alimento obtido com sucesso.',
        dados: alimento
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao obter alimento.',
        dados: null
      };
    }
  }

  buscarAlimentos(termo) {
    try {
      if (!termo) {
        return {
          sucesso: false,
          mensagem: 'Termo de busca é obrigatório.',
          dados: null
        };
      }

      const alimentos = this.alimentoService.buscarAlimentosPorNome(termo);
      return {
        sucesso: true,
        mensagem: 'Busca realizada com sucesso.',
        dados: alimentos,
        total: alimentos.length
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao buscar alimentos.',
        dados: null
      };
    }
  }

  atualizarAlimento(id, req) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID do alimento é obrigatório.',
          dados: null
        };
      }

      const alimento = this.alimentoService.atualizarAlimento(id, req);
      return {
        sucesso: true,
        mensagem: 'Alimento atualizado com sucesso.',
        dados: alimento
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao atualizar alimento.',
        dados: null
      };
    }
  }

  deletarAlimento(id) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID do alimento é obrigatório.',
          dados: null
        };
      }

      this.alimentoService.deletarAlimento(id);
      return {
        sucesso: true,
        mensagem: 'Alimento deletado com sucesso.',
        dados: null
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao deletar alimento.',
        dados: null
      };
    }
  }

  obterEstatisticas() {
    try {
      const stats = this.alimentoService.obterEstatisticas();
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
  module.exports = AlimentoController;
}
