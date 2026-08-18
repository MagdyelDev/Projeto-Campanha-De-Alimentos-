console.log('====================================');
console.log('🍲 PANELA SOLIDÁRIA - SISTEMA INICIADO');
console.log('====================================\n');

// ====================================
// EXEMPLO 1: CRIAR ENDEREÇO
// ====================================

console.log('📌 EXEMPLO 1: Criar um Endereço');
console.log('-'.repeat(50));

const endereco1 = new Endereco(
  null,
  'Rua das Flores',
  '123',
  'Centro',
  'São Paulo',
  '01000-000'
);

console.log('Endereço criado:', endereco1.obterEndereco());
console.log();

// ====================================
// EXEMPLO 2: CADASTRAR DOADOR
// ====================================

console.log('👤 EXEMPLO 2: Cadastrar um Doador');
console.log('-'.repeat(50));

const doadorController = new DoadorController();

const resultado1 = doadorController.cadastrarDoador({
  nome: 'João Silva',
  telefone: '(11) 98765-4321',
  email: 'joao@email.com',
  rua: 'Rua das Flores',
  numero: '123',
  bairro: 'Centro',
  cidade: 'São Paulo',
  cep: '01000-000'
});

console.log('Resultado:', resultado1);
console.log();

// Cadastrar mais um doador
const resultado2 = doadorController.cadastrarDoador({
  nome: 'Maria Santos',
  telefone: '(11) 99876-5432',
  email: 'maria@email.com',
  rua: 'Av. Paulista',
  numero: '500',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
  cep: '01311-000'
});

console.log('Segundo doador cadastrado:', resultado2.dados.nome);
console.log();

// ====================================
// EXEMPLO 3: CADASTRAR ALIMENTOS
// ====================================

console.log('🥫 EXEMPLO 3: Cadastrar Alimentos');
console.log('-'.repeat(50));

const alimentoController = new AlimentoController();

const alimentos = [
  { nome: 'Arroz', quantidade: 50, unidade: 'kg', descricao: 'Arroz integral' },
  { nome: 'Feijão', quantidade: 30, unidade: 'kg', descricao: 'Feijão carioca' },
  { nome: 'Macarrão', quantidade: 20, unidade: 'pacotes', descricao: 'Macarrão integral' },
  { nome: 'Óleo de Cozinha', quantidade: 15, unidade: 'L', descricao: 'Óleo de soja' },
  { nome: 'Leite em Pó', quantidade: 10, unidade: 'kg', descricao: 'Leite integral' }
];

alimentos.forEach(alim => {
  const resultado = alimentoController.cadastrarAlimento(alim);
  if (resultado.sucesso) {
    console.log(`✓ Alimento "${alim.nome}" cadastrado com ID: ${resultado.dados.id}`);
  }
});

console.log();

// ====================================
// EXEMPLO 4: REGISTRAR DOAÇÕES
// ====================================

console.log('📦 EXEMPLO 4: Registrar Doações');
console.log('-'.repeat(50));

const doacaoController = new DoacaoController();

// Obter lista de doadores
const doadores = doadorController.listarDoadores();
console.log(`Total de doadores cadastrados: ${doadores.total}`);

// Obter lista de alimentos
const alimentosCadastrados = alimentoController.listarAlimentos();
console.log(`Total de alimentos cadastrados: ${alimentosCadastrados.total}`);
console.log();

if (doadores.total > 0 && alimentosCadastrados.total > 0) {
  // Registrar primeira doação
  const resultadoDoacao1 = doacaoController.registrarDoacao({
    doadorId: doadores.dados[0].id,
    alimentos: [
      { id: alimentosCadastrados.dados[0].id, quantidadeDoada: 1 },
      { id: alimentosCadastrados.dados[1].id, quantidadeDoada: 1 }
    ]
  });

  if (resultadoDoacao1.sucesso) {
    console.log('✓ Doação 1 registrada com sucesso!');
    console.log(`  Doador: ${doadores.dados[0].nome}`);
    console.log(`  Alimentos: ${resultadoDoacao1.dados.totalAlimentos}`);
  }

  // Registrar segunda doação
  if (doadores.total > 1) {
    const resultadoDoacao2 = doacaoController.registrarDoacao({
      doadorId: doadores.dados[1].id,
      alimentos: [
        { id: alimentosCadastrados.dados[2].id, quantidadeDoada: 1 },
        { id: alimentosCadastrados.dados[3].id, quantidadeDoada: 1 },
        { id: alimentosCadastrados.dados[4].id, quantidadeDoada: 1 }
      ]
    });

    if (resultadoDoacao2.sucesso) {
      console.log('✓ Doação 2 registrada com sucesso!');
      console.log(`  Doador: ${doadores.dados[1].nome}`);
      console.log(`  Alimentos: ${resultadoDoacao2.dados.totalAlimentos}`);
    }
  }
}

console.log();

// ====================================
// EXEMPLO 5: LISTAR DOAÇÕES
// ====================================

console.log('📋 EXEMPLO 5: Listar Todas as Doações');
console.log('-'.repeat(50));

const doacoes = doacaoController.listarDoacoes();
console.log(`Total de doações registradas: ${doacoes.total}`);

doacoes.dados.forEach((doacao, index) => {
  console.log(`\nDoação ${index + 1}:`);
  console.log(`  ID: ${doacao.id.substring(0, 12)}...`);
  console.log(`  Doador: ${doacao.doador.nome}`);
  console.log(`  Alimentos doados: ${doacao.totalAlimentos}`);
  console.log(`  Status: ${doacao.status}`);
});

console.log();

// ====================================
// EXEMPLO 6: ATUALIZAR STATUS DE DOAÇÃO
// ====================================

console.log('🔄 EXEMPLO 6: Atualizar Status de Doação');
console.log('-'.repeat(50));

if (doacoes.total > 0) {
  const primeiraDoacao = doacoes.dados[0];
  
  const resultadoAtualizacao = doacaoController.atualizarStatusDoacao(
    primeiraDoacao.id,
    'recebida'
  );

  if (resultadoAtualizacao.sucesso) {
    console.log(`✓ Status da doação atualizado para: ${resultadoAtualizacao.dados.status}`);
  }
}

console.log();

// ====================================
// EXEMPLO 7: OBTER DOAÇÕES POR DOADOR
// ====================================

console.log('👤 EXEMPLO 7: Doações de um Doador Específico');
console.log('-'.repeat(50));

if (doadores.total > 0) {
  const doacoesDoDoador = doacaoController.obterDoacoesDoDoador(doadores.dados[0].id);
  
  console.log(`Doador: ${doadores.dados[0].nome}`);
  console.log(`Total de doações: ${doacoesDoDoador.total}`);
  
  doacoesDoDoador.dados.forEach(d => {
    console.log(`  - Doação ID: ${d.id.substring(0, 8)}... (${d.status})`);
  });
}

console.log();

// ====================================
// EXEMPLO 8: RELATÓRIO COMPLETO DA CAMPANHA
// ====================================

console.log('📊 EXEMPLO 8: Relatório Completo da Campanha');
console.log('-'.repeat(50));

const relatorio = doacaoController.obterRelatorioCampanha();

console.log('📈 RELATÓRIO CONSOLIDADO:');
console.log('\n👥 DOADORES:');
console.log(`   Total cadastrados: ${relatorio.dados.doadores.totalDoadores}`);

console.log('\n🥫 ALIMENTOS:');
console.log(`   Total tipos: ${relatorio.dados.alimentos.totalAlimentos}`);
console.log(`   Total itens arrecadados: ${relatorio.dados.alimentos.totalItens}`);

console.log('\n📦 DOAÇÕES:');
console.log(`   Total registradas: ${relatorio.dados.doacoes.totalDoacoes}`);
console.log(`   Total itens doados: ${relatorio.dados.doacoes.totalAlimentosDoacoes}`);
console.log(`   Registradas: ${relatorio.dados.doacoes.doacoesRegistradas}`);
console.log(`   Recebidas: ${relatorio.dados.doacoes.doacoesRecebidas}`);
console.log(`   Entregues: ${relatorio.dados.doacoes.doacoesEntregues}`);

console.log();

// ====================================
// RESUMO
// ====================================

console.log('====================================');
console.log('✅ SISTEMA FUNCIONANDO COM SUCESSO!');
console.log('====================================\n');

console.log('📝 RESUMO DA ARQUITETURA EM CAMADAS:');
console.log('✓ Models: Representam as entidades do sistema');
console.log('✓ Repositories: Gerenciam persistência de dados');
console.log('✓ Services: Implementam regras de negócio');
console.log('✓ Controllers: Controlam requisições e respostas');
console.log();

console.log('🔗 RELACIONAMENTOS ENTRE OBJETOS:');
console.log('✓ Um Doador possui um Endereço');
console.log('✓ Um Doador pode realizar uma ou várias Doações');
console.log('✓ Uma Doação possui um ou vários Alimentos');
console.log();

console.log('💡 DICA: Acesse o navegador para usar a interface web:');
console.log('   Arquivo: src/public/index.html');
console.log();
