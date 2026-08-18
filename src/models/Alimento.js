class Alimento {
  constructor(id, nome, quantidade, unidade, descricao = '') {
    this.id = id || this.gerarId();
    this.nome = nome;
    this.quantidade = quantidade;
    this.unidade = unidade; // ex: kg, L, unidade, pacote
    this.descricao = descricao;
  }

  gerarId() {
    return 'alim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  obterInfo() {
    return `${this.quantidade} ${this.unidade} de ${this.nome}`;
  }

  validar() {
    return this.nome && this.nome.trim() !== '' &&
           this.quantidade > 0 &&
           this.unidade && this.unidade.trim() !== '';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Alimento;
}
