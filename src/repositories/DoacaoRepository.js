class DoacaoRepository {
  constructor() {
    this.storageKey = 'doacoes_storage';
    this.inicializarStorage();
  }

  inicializarStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  obterTodos() {
    const dados = localStorage.getItem(this.storageKey);
    return dados ? JSON.parse(dados) : [];
  }

  obterPorId(id) {
    const doacoes = this.obterTodos();
    return doacoes.find(doacao => doacao.id === id) || null;
  }

  obterPorDoador(doadorId) {
    const doacoes = this.obterTodos();
    return doacoes.filter(d => d.doador && d.doador.id === doadorId);
  }

  salvar(doacao) {
    const doacoes = this.obterTodos();
    const indice = doacoes.findIndex(d => d.id === doacao.id);
    
    if (indice >= 0) {
      doacoes[indice] = doacao;
    } else {
      doacoes.push(doacao);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(doacoes));
    return doacao;
  }

  deletar(id) {
    const doacoes = this.obterTodos();
    const novaLista = doacoes.filter(d => d.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(novaLista));
    return true;
  }

  obterPorPeriodo(dataInicio, dataFim) {
    const doacoes = this.obterTodos();
    return doacoes.filter(d => {
      const dataDonacao = new Date(d.dataDoacao);
      return dataDonacao >= dataInicio && dataDonacao <= dataFim;
    });
  }

  contar() {
    return this.obterTodos().length;
  }

  obterPorStatus(status) {
    const doacoes = this.obterTodos();
    return doacoes.filter(d => d.status === status);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DoacaoRepository;
}
