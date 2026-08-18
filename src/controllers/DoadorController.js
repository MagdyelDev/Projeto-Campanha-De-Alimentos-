class DoadorController {
  constructor() {
    this.doadorService = new DoadorService();
  }

  cadastrarDoador(req) {
    try {
      const { nome, telefone, email, rua, numero, bairro, cidade, cep } = req;

      // Validar entrada
      if (!nome || !telefone || !email || !rua || !numero || !bairro || !cidade || !cep) {
        return {
          sucesso: false,
          mensagem: 'Todos os campos são obrigatórios.',
          dados: null
        };
      }

      // Criar endereço
      const endereco = new Endereco(undefined, rua, numero, bairro, cidade, cep);

      // Cadastrar doador via service
      const doador = this.doadorService.cadastrarDoador(nome, telefone, email, endereco);

      return {
        sucesso: true,
        mensagem: 'Doador cadastrado com sucesso!',
        dados: doador
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao cadastrar doador.',
        dados: null
      };
    }
  }

  listarDoadores() {
    try {
      const doadores = this.doadorService.obterTodosDoadores();
      return {
        sucesso: true,
        mensagem: 'Doadores listados com sucesso.',
        dados: doadores,
        total: doadores.length
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao listar doadores.',
        dados: null
      };
    }
  }

  obterDoador(id) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID do doador é obrigatório.',
          dados: null
        };
      }

      const doador = this.doadorService.obterDoadorPorId(id);
      return {
        sucesso: true,
        mensagem: 'Doador obtido com sucesso.',
        dados: doador
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao obter doador.',
        dados: null
      };
    }
  }

  atualizarDoador(id, req) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID do doador é obrigatório.',
          dados: null
        };
      }

      const doador = this.doadorService.atualizarDoador(id, req);
      return {
        sucesso: true,
        mensagem: 'Doador atualizado com sucesso.',
        dados: doador
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao atualizar doador.',
        dados: null
      };
    }
  }

  deletarDoador(id) {
    try {
      if (!id) {
        return {
          sucesso: false,
          mensagem: 'ID do doador é obrigatório.',
          dados: null
        };
      }

      this.doadorService.deletarDoador(id);
      return {
        sucesso: true,
        mensagem: 'Doador deletado com sucesso.',
        dados: null
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: erro.message || 'Erro ao deletar doador.',
        dados: null
      };
    }
  }

  obterEstatisticas() {
    try {
      const stats = this.doadorService.obterEstatisticas();
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
  module.exports = DoadorController;
}
