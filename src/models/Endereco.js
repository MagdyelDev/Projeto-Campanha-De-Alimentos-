class Endereco {
  constructor(id, rua, numero, bairro, cidade, cep) {
    this.id = id || this.gerarId();
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.cep = cep;
  }

  gerarId() {
    return 'end_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  obterEndereco() {
    return `${this.rua}, ${this.numero}, ${this.bairro}, ${this.cidade} - ${this.cep}`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Endereco;
}
