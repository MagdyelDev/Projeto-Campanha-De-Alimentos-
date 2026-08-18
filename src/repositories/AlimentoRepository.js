class AlimentoRepository {
  constructor() {
    this.storageKey = 'alimentos_storage';
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
    const alimentos = this.obterTodos();
    return alimentos.find(alimento => alimento.id === id) || null;
  }

  salvar(alimento) {
    const alimentos = this.obterTodos();
    const indice = alimentos.findIndex(a => a.id === alimento.id);
    
    if (indice >= 0) {
      alimentos[indice] = alimento;
    } else {
      alimentos.push(alimento);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(alimentos));
    return alimento;
  }

  deletar(id) {
    const alimentos = this.obterTodos();
    const novaLista = alimentos.filter(a => a.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(novaLista));
    return true;
  }

  obterPorNome(nome) {
    const alimentos = this.obterTodos();
    return alimentos.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  contar() {
    return this.obterTodos().length;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AlimentoRepository;
}
