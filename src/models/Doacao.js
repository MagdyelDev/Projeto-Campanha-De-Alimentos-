class Doacao {
  constructor(id, dataDoacao, doador, alimentos = []) {
    this.id = id || this.gerarId();
    this.dataDoacao = dataDoacao || new Date();
    this.doador = doador; // Objeto Doador
    this.alimentos = alimentos; // Array de objetos Alimento
    this.status = 'registrada'; // registrada, recebida, entregue
  }

  gerarId() {
    return 'doacao_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  adicionarAlimento(alimento) {
    if (alimento instanceof Alimento) {
      this.alimentos.push(alimento);
      return true;
    }
    return false;
  }

  removerAlimento(alimentoId) {
    this.alimentos = this.alimentos.filter(alim => alim.id !== alimentoId);
  }

  obterInfo() {
    return {
      id: this.id,
      data: this.dataDoacao,
      doador: this.doador ? this.doador.obterInfo() : null,
      alimentos: this.alimentos.map(alim => ({
        id: alim.id,
        nome: alim.nome,
        quantidade: alim.quantidade,
        unidade: alim.unidade,
        descricao: alim.descricao
      })),
      status: this.status,
      totalAlimentos: this.alimentos.length
    };
  }

  validar() {
    return this.doador && this.doador instanceof Doador &&
           this.alimentos && this.alimentos.length > 0 &&
           this.alimentos.every(alim => alim instanceof Alimento && alim.validar());
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Doacao;
}
