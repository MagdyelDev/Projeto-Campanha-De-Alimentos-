class Doador {
  constructor(id, nome, telefone, email, endereco) {
    this.id = id || this.gerarId();
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco; // Objeto Endereco
    this.dataCadastro = new Date();
  }

  gerarId() {
    return 'doador_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  obterInfo() {
    return {
      id: this.id,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      endereco: this.endereco ? this.endereco.obterEndereco() : 'Sem endereço',
      dataCadastro: this.dataCadastro
    };
  }

  validar() {
    return this.nome && this.nome.trim() !== '' &&
           this.telefone && this.telefone.trim() !== '' &&
           this.email && this.email.includes('@') &&
           this.endereco && this.endereco instanceof Endereco;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Doador;
}
