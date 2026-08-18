<!-- GUIA RÁPIDO DE USO - PANELA SOLIDÁRIA -->

# 🍲 Guia Rápido - Panela Solidária

## ⚡ Iniciar Rapidamente

### 1. Abrir no Navegador
```
Abra: src/public/index.html
```

### 2. Usar a Interface
- Clique em "QUERO DOAR"
- Preencha os formulários nas abas
- Veja as doações registradas

## 📚 Estrutura Arquivos Criados

### ✅ MODELS (4 arquivos)
```
src/models/
├── Doador.js      - Entidade Doador
├── Alimento.js    - Entidade Alimento
├── Doacao.js      - Entidade Doação
└── Endereco.js    - Entidade Endereço
```

### ✅ REPOSITORIES (4 arquivos)
```
src/repositories/
├── DoadorRepository.js      - CRUD Doadores
├── AlimentoRepository.js    - CRUD Alimentos
├── DoacaoRepository.js      - CRUD Doações
└── EnderecoRepository.js    - CRUD Endereços
```

### ✅ SERVICES (3 arquivos)
```
src/services/
├── DoadorService.js         - Lógica Doadores
├── AlimentoService.js       - Lógica Alimentos
└── DoacaoService.js         - Lógica Doações
```

### ✅ CONTROLLERS (3 arquivos)
```
src/controllers/
├── DoadorController.js      - Controle Doadores
├── AlimentoController.js    - Controle Alimentos
└── DoacaoController.js      - Controle Doações
```

### ✅ FRONTEND
```
src/public/
├── index.html       - Landing page completa
├── css/style.css    - Estilos responsivos
└── js/app.js        - Lógica da interface
```

### ✅ DOCUMENTAÇÃO
```
├── README.md           - Documentação completa
├── DIAGRAMA_UML.md     - Diagramas UML
└── src/index.js        - Exemplos de uso
```

## 🎯 Funcionalidades Implementadas

### Doadores
✅ Cadastrar doador
✅ Listar doadores
✅ Buscar doador por ID
✅ Atualizar doador
✅ Deletar doador
✅ Validações completas

### Alimentos
✅ Cadastrar alimento
✅ Listar alimentos
✅ Buscar alimento
✅ Atualizar alimento
✅ Deletar alimento

### Doações
✅ Registrar doação
✅ Listar doações
✅ Buscar doação
✅ Atualizar status
✅ Gerar relatório

### Landing Page
✅ 8 seções completas
✅ Menu responsivo
✅ Modal para doações
✅ Formulário de contato
✅ Timeline da campanha
✅ Pontos de coleta
✅ Parceiros
✅ Footer completo

## 🔗 Relacionamentos Implementados

### 1. Doador → Endereço (1:1)
Um doador tem um endereço

### 2. Doador → Doação (1:N)
Um doador pode fazer várias doações

### 3. Doação → Alimento (1:N)
Uma doação pode ter vários alimentos

## 📊 Validações

✅ Email único de doadores
✅ Todos os campos obrigatórios
✅ Quantidade de alimentos > 0
✅ Formato de email válido
✅ Mínimo 1 alimento por doação
✅ Mensagens de erro claras

## 🎨 Design Responsivo

✅ Mobile: 480px
✅ Tablet: 768px
✅ Desktop: 1024px+
✅ Dark mode suportado
✅ Acessibilidade WCAG AA

## 💾 Persistência de Dados

Dados salvos em localStorage:
- `doadores_storage`
- `alimentos_storage`
- `doacoes_storage`
- `enderecos_storage`

## 🚀 Próximas Melhorias (opcional)

- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Upload de imagens
- [ ] Gráficos de relatórios
- [ ] Exportar dados em PDF/CSV
- [ ] Envio de email
- [ ] Mapa de pontos de coleta
- [ ] Sistema de avaliações

## 📞 Suporte

Ver DIAGRAMA_UML.md para documentação detalhada
Ver src/index.js para exemplos de código

---

**Projeto Completo e Pronto para Uso! 🎉**
