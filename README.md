# 🍲 Panela Solidária - Campanha de Doação de Alimentos

![Status](https://img.shields.io/badge/Status-Completo-brightgreen)
![Linguagem](https://img.shields.io/badge/Linguagem-JavaScript-yellow)
![Arquitetura](https://img.shields.io/badge/Arquitetura-MVC%20em%20Camadas-blue)
![Responsivo](https://img.shields.io/badge/Responsivo-Mobile%20First-success)

> Projeto educacional de uma campanha web para arrecadação de alimentos, desenvolvido com arquitetura em camadas (Models, Repositories, Services, Controllers) e interface responsiva em HTML5, CSS3 e JavaScript vanilla.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Arquitetura](#arquitetura)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Relacionamentos entre Objetos](#relacionamentos-entre-objetos)
- [Diagramas UML](#diagramas-uml)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## 🎯 Visão Geral

**Panela Solidária** é uma campanha web dedicada a combater a fome através da arrecadação de alimentos. O projeto implementa uma **arquitetura em camadas** profissional com separação clara de responsabilidades:

- **Models**: Representam as entidades (Doador, Alimento, Doação, Endereço)
- **Repositories**: Gerenciam persistência de dados
- **Services**: Implementam regras de negócio
- **Controllers**: Controlam requisições e respostas
- **Frontend**: Landing page responsiva e intuitiva

---

## 📦 Requisitos Atendidos

### ✅ Técnicos (Professor):
- Arquitetura em camadas (Models, Repositories, Services, Controllers)
- Mínimo 3 objetos relacionados (Doador, Doação, Alimento, Endereço)
- Relacionamentos coerentes entre objetos
- Funcionalidades de CRUD completas
- Código no GitHub (repositório público)
- Diagrama UML com relacionamentos

### ✅ Funcionais:
- Visualizar informações sobre a campanha
- Cadastrar doadores
- Cadastrar alimentos
- Registrar doações
- Relacionar doações ao doador
- Exibir informações cadastradas

### ✅ Design (Landing Page):
- HTML5 semântico
- CSS3 puro (Flexbox/Grid)
- JavaScript vanilla
- Design mobile-first e responsivo
- Paleta de cores: laranja vibrante (#FF6B00)
- Acessibilidade WCAG 2.1

---

## 🏗️ Arquitetura em Camadas

```
USUÁRIO (Interface Web)
    ↓
CONTROLLERS (DoadorController, AlimentoController, DoacaoController)
    ↓
SERVICES (DoadorService, AlimentoService, DoacaoService)
    ↓
REPOSITORIES (DoadorRepository, AlimentoRepository, DoacaoRepository)
    ↓
MODELS (Doador, Alimento, Doacao, Endereco)
    ↓
DADOS (localStorage)
```

---

## 📁 Estrutura de Projeto

```
src/
├── index.js                    # Exemplos de uso
├── models/                     # Entidades
│   ├── Doador.js
│   ├── Alimento.js
│   ├── Doacao.js
│   └── Endereco.js
├── repositories/               # Acesso a dados
│   ├── DoadorRepository.js
│   ├── AlimentoRepository.js
│   ├── DoacaoRepository.js
│   └── EnderecoRepository.js
├── services/                   # Lógica de negócio
│   ├── DoadorService.js
│   ├── AlimentoService.js
│   └── DoacaoService.js
├── controllers/                # Controladores
│   ├── DoadorController.js
│   ├── AlimentoController.js
│   └── DoacaoController.js
└── public/
    ├── index.html              # Landing page
    ├── css/style.css           # Estilos responsivos
    └── js/app.js               # Lógica da interface
```

---

## 🚀 Como Usar

### Abrir a Landing Page

```bash
# Abra no navegador:
src/public/index.html
```

### Funcionalidades do Modal

1. **Cadastro de Doador**: Preencha nome, telefone, email e endereço
2. **Cadastro de Alimento**: Adicione itens para doação
3. **Registrar Doação**: Selecione doador e alimentos
4. **Visualizar Doações**: Veja histórico de doações

---

## ⭐ Funcionalidades

✅ Cadastro de Doadores com Endereço
✅ Cadastro de Alimentos
✅ Registro de Doações
✅ Relacionamentos entre Objetos
✅ Visualização de Doações
✅ Atualizar Status de Doações
✅ Relatório Consolidado
✅ Landing Page Completa
✅ Formulário de Contato
✅ Menu Responsivo

---

## 🔗 Relacionamentos

### 1️⃣ Um Doador possui um Endereço (1:1)
```javascript
const doador = new Doador(null, "João", "11987654321", "joao@email.com", endereco);
```

### 2️⃣ Um Doador realiza 1..N Doações (1:N)
```javascript
doador.realizarDoacao(doacao1);
doador.realizarDoacao(doacao2);
```

### 3️⃣ Uma Doação contém 1..N Alimentos (1:N)
```javascript
doacao.adicionarAlimento(alimento1);
doacao.adicionarAlimento(alimento2);
```

---

## 📊 Diagrama UML

Veja o arquivo [DIAGRAMA_UML.md](DIAGRAMA_UML.md) para diagrama completo com Mermaid.

```
Doador ──── possui ──── Endereço (1:1)
   │
   └── realiza ──── Doação (1:N)
                       │
                       └── contém ──── Alimento (1:N)
```

---

## 💻 Tecnologias

- **JavaScript ES6+** (Vanilla)
- **HTML5** (Semântico)
- **CSS3** (Flexbox/Grid)
- **localStorage** (Persistência)
- **GitHub** (Versionamento)

---

## 🎨 Design

- **Paleta**: Laranja (#FF6B00), Branco, Cinza
- **Tipografia**: Poppins
- **Responsivo**: Mobile-First
- **Acessibilidade**: WCAG AA

---

## ✅ Validações

- Email único de doadores
- Campos obrigatórios
- Quantidade > 0
- Formato de email válido
- Mínimo 1 alimento por doação

---

## 📞 Contato

Para dúvidas: consulte os comentários nos arquivos e DIAGRAMA_UML.md

---

**Obrigado por usar Panela Solidária! 🍲❤️**