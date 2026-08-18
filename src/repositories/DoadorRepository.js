class DoadorRepository {
  constructor() {
    this.storageKey = 'doadores_storage';
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
    const doadores = this.obterTodos();
    return doadores.find(doador => doador.id === id) || null;
  }

  salvar(doador) {
    const doadores = this.obterTodos();
    const indice = doadores.findIndex(d => d.id === doador.id);
    
    if (indice >= 0) {
      doadores[indice] = doador;
    } else {
      doadores.push(doador);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(doadores));
    return doador;
  }

  deletar(id) {
    const doadores = this.obterTodos();
    const novaLista = doadores.filter(d => d.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(novaLista));
    return true;
  }

  obterPorEmail(email) {
    const doadores = this.obterTodos();
    return doadores.find(d => d.email.toLowerCase() === email.toLowerCase()) || null;
  }

  contar() {
    return this.obterTodos().length;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DoadorRepository;
}
