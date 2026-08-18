class EnderecoRepository {
  constructor() {
    this.storageKey = 'enderecos_storage';
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
    const enderecos = this.obterTodos();
    return enderecos.find(endereco => endereco.id === id) || null;
  }

  salvar(endereco) {
    const enderecos = this.obterTodos();
    const indice = enderecos.findIndex(e => e.id === endereco.id);
    
    if (indice >= 0) {
      enderecos[indice] = endereco;
    } else {
      enderecos.push(endereco);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(enderecos));
    return endereco;
  }

  deletar(id) {
    const enderecos = this.obterTodos();
    const novaLista = enderecos.filter(e => e.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(novaLista));
    return true;
  }

  obterPorCidade(cidade) {
    const enderecos = this.obterTodos();
    return enderecos.filter(e => e.cidade.toLowerCase() === cidade.toLowerCase());
  }

  obterPorBairro(bairro) {
    const enderecos = this.obterTodos();
    return enderecos.filter(e => e.bairro.toLowerCase().includes(bairro.toLowerCase()));
  }

  contar() {
    return this.obterTodos().length;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnderecoRepository;
}
