# 🌿 EcoTrip: Calculadora de Emissão de CO₂

Um simulador interativo de impacto ambiental para viagens, desenvolvido para informar e conscientizar sobre a pegada de carbono, além de incentivar escolhas de transporte mais sustentáveis.

## 📖 Sobre o Projeto

A Calculadora EcoTrip é uma aplicação web desenvolvida com JavaScript Moderno (ES6+) que permite aos usuários estimar a quantidade de Dióxido de Carbono (CO₂) emitida em viagens terrestres entre diversas cidades brasileiras. A ferramenta compara diferentes modais de transporte (Carro, Ônibus, Caminhão e Bicicleta), oferecendo uma análise visual clara sobre qual opção é mais ecológica, além de estimar o custo para compensação dessas emissões através de Créditos de Carbono. Este projeto foi desenvolvido para o Curso Prático de GitHub Copilot da plataforma DIO, sob orientação do professor Pablo Nunes Lopes.

### 🤖 Desenvolvimento Assistido por IA (GitHub Copilot)

Este projeto foi construído como um caso de uso prático das capacidades do GitHub Copilot. A IA atuou como um "Pair Programmer" em todas as etapas do desenvolvimento:

- Geração de Código Boilerplate: Criação rápida da estrutura HTML semântica e do esqueleto CSS inicial.

- Lógica de Negócios Complexa: Auxílio na implementação dos algoritmos de cálculo de emissão e conversão para créditos de carbono no arquivo calculator.js.

- Refatoração e Modernização: Sugestões para transformar código legado em ES6+ Moderno.

- Documentação Automática: Geração de comentários JSDoc padronizados para todas as funções e objetos.

- Styling (CSS): Sugestão de paletas de cores harmônicas e implementação de layouts responsivos com CSS Grid e Flexbox.

- DevOps (CI/CD): Criação do workflow de deploy automatizado para o GitHub Pages via GitHub Actions.

## 🎯 Visão Geral e Objetivos

O EcoTrip tem como objetivo conscientizar viajantes sobre o impacto invisível de seus deslocamentos. A aplicação permite:

- Calcular: Estimar a emissão exata de CO₂ baseada na distância e no veículo.

- Comparar: Visualizar a diferença de impacto entre Carro, Ônibus, Caminhão e Bicicleta.

- Compensar: Traduzir a poluição gerada em métricas financeiras (Créditos de Carbono) para neutralização.

## ✨ Funcionalidades

1. 📍 Inteligência de Rotas:

- Autopreenchimento: Ao selecionar uma origem e destino compatíveis (ex: São Paulo para Rio de Janeiro), o sistema preenche a distância automaticamente usando um banco de dados local otimizado.

- Modo Manual: Flexibilidade para inserir distâncias personalizadas caso a rota não esteja no banco de dados.

- Suporte Bidirecional: O algoritmo reconhece que a distância de A para B é a mesma de B para A.

2. 📊 Comparador Visual:
   
- Comparador de Modais: Uma seção dedicada mostra visualmente o quão eficiente (ou poluente) é a escolha do usuário em comparação ao uso de um carro comum.

- Indicadores de Cor: Feedback visual imediato (Verde = Sustentável, Vermelho = Poluente).

3. 💰 Economia de Carbono:
   
- Cálculo de Emissão de Carbono: Calcula automaticamente quantos kg de CO₂ foram emitidos para o modo de transporte escolhido, além de mostrar quantos kg de CO₂ seriam evitados ao escolher transportes alternativos.

- Estimativa de Créditos de Carbono: Calcula quantos créditos são necessários para neutralizar a viagem e o custo estimado em Reais (BRL).

## 🛠️ Arquitetura do Projeto e Tecnologias Utilizadas

O projeto segue uma arquitetura Modular, onde cada arquivo JavaScript tem uma responsabilidade única, facilitando a manutenção e escalabilidade.

- Estrutura:

carbon-calculator/

│   ├── index.html                # Estrutura semântica (Cards, Formulários, Grids)

│   ├── css/

   └── style.css             # Estilização completa (Variáveis, BEM, Animações, Responsividade)

│   ├── js/                       # JavaScript (ES6+): Modularização com objetos globais (RoutesDB, CONFIG, Calculator, UI)

│        ├── routesData.js        # [MODEL] Base de dados estática de cidades e distâncias

│        ├── config.js             # [CONFIG] Constantes (fatores de emissão) e setups iniciais

│        ├── calculator.js         # [LOGIC] Regras de negócio pura (Cálculos matemáticos)

│        ├── ui.js                 # [VIEW] Manipulação do DOM, formatação e templates HTML

│        └── app.js                # [CONTROLLER] Ponto de entrada, validação e orquestração de eventos

│   └── .github/
        └── workflows/
            └── deploy.yml        # Pipeline de CI/CD para deploy automático

## 🧮 Como Funciona o Cálculo

A lógica matemática reside em 'js/calculator.js' e utiliza os seguintes fatores médios de emissão:

**Modal de Transporte X Fator de Emissão (kg CO₂/km)**

Bicicleta 🚲 X 0.00 (Zero Emissão)

Ônibus 🚌 X 0.089 (Por passageiro)

Carro 🚗 X 0.120 (Médio a gasolina)

Caminhão 🚛 X 0.960 (Diesel leve)

> Fórmula: Emissão Total = Distância (km) × Fator de Emissão

## ⚙️ Deploy (CI/CD)

Este projeto possui uma pipeline configurada no GitHub Actions. Sempre que um push é feito na branch main, o sistema:

1. Verifica o código.

2. Prepara os artefatos.

3. Faz o deploy automático para o GitHub Pages.

## ⚠️ Limitações do Projeto

Como este é um projeto de portfólio e demonstração técnica, existem algumas limitações intencionais:

- Banco de Dados Simulado: As rotas e distâncias estão armazenadas em um arquivo estático (js/routesData.js) e não em um banco de dados real. Portanto, a calculadora cobre automaticamente apenas as principais rotas cadastradas (ex: Capitais, Sudeste, Sul).

- Fatores de Emissão Médios: Os cálculos usam fatores médios de emissão (kg CO₂/km). Na vida real, isso varia também conforme o modelo do veículo, combustível, carga, topografia, entre outros.

- Persistência de Dados: O histórico de cálculos não é salvo ao recarregar a página.

## 🚀 Como Executar o Projeto

Você pode rodar este projeto em qualquer máquina que tenha um navegador web moderno.

1. Opção 1: Via VS Code (Recomendado)
   
Tenha o Visual Studio Code instalado.

Instale a extensão Live Server.

Clone ou baixe este repositório.

Abra a pasta do projeto no VS Code.

Clique com o botão direito no arquivo index.html e selecione "Open with Live Server" OU clique em "Go Live" no canto inferior direito.

2. Opção 2: Via Navegador (Simples)
   
Baixe a pasta do projeto.

Navegue até a pasta e dê um duplo clique no arquivo index.html.

O projeto abrirá no seu navegador padrão.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você quiser adicionar mais rotas ao "banco de dados" ou melhorar o CSS ou brincar com o projeto, fique à vontade:

1. Faça um Fork do projeto.

2. Crie uma Branch para sua Feature (git checkout -b feature/NovaRota).

3. Adicione suas mudanças.

4. Faça o Commit (git commit -m 'Adiciona rota SP-Recife').

5. Faça o Push (git push origin feature/NovaRota).

6. Abra um Pull Request.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte de um desafio técnico da DIO (Digital Innovation One). Sinta-se à vontade para usar e modificar.
