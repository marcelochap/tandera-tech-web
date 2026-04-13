# Feature Specification: Dynamic History Fetch

**Feature Branch**: `003-dynamic-history-fetch`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Agora eu quero trabalhar na página de historico, historico.html, ela tem que receber o código da camera em questão com o botão ver historico e fazer o fetch no servidor para a camera especifica com o ip do servidor do usuario logado. No código do historico.html hoje o cameraID é um valor fixo independende do botão apertado. Quero deixar isso dinamico de acordo com o botão que o usuario apertar."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navegação Direta via Dashboard (Priority: P1)

Como um operador de fábrica, ao clicar no botão "Ver Histórico" de uma máquina específica no Dashboard, quero ver os dados de produção reais daquela máquina no gráfico, para que eu possa analisar o desempenho individual dos equipamentos.

**Why this priority**: É o fluxo principal e o valor central da funcionalidade. Sem isso, a análise individual de hardware é impossível.

**Independent Test**: Pode ser testado abrindo o Dashboard, clicando em "Ver Histórico" em diferentes máquinas e verificando se o título da página e os dados do gráfico mudam de acordo com a máquina selecionada.

**Acceptance Scenarios**:

1. **Given** que o usuário está logado e no Dashboard, **When** clica em "Ver Histórico" da MÁQUINA 3, **Then** é redirecionado para `historico.html?camera=68920...&name=m3` e o gráfico exibe os dados da Câmera 3.
2. **Given** que o usuário está logado e no Dashboard, **When** clica em "Ver Histórico" da MÁQUINA 4, **Then** é redirecionado para `historico.html?camera=6814...&name=m4` e o gráfico exibe os dados da Câmera 4.

---

### User Story 2 - Carregamento via Parâmetros de URL (Priority: P2)

Como um usuário avançado, quero poder compartilhar ou marcar como favorito links diretos para o histórico de uma câmera específica, para que eu possa pular as etapas de login/dashboard quando a sessão já estiver ativa.

**Why this priority**: Melhora a usabilidade e permite integrações futuras mais simples.

**Independent Test**: Abrir manualmente uma URL de histórico com parâmetros válidos e verificar se a página carrega os dados corretamente.

**Acceptance Scenarios**:

1. **Given** que o usuário tem uma sessão válida (Token e ServerIp salvos), **When** acessa `historico.html?camera=[ID_VALIDO]`, **Then** o sistema extrai o ID e busca os dados no servidor remoto.

---

### User Story 3 - Fallback para Câmera Padrão (Priority: P3)

Como um sistema robusto, se eu acessar a página de histórico sem nenhum parâmetro na URL, o sistema deve tentar carregar a primeira câmera disponível no cache da sessão, para evitar uma tela de erro ou um gráfico vazio.

**Why this priority**: Melhora a resiliência do sistema em casos de navegação manual ou malformada.

**Independent Test**: Acessar `historico.html` limpando os parâmetros da URL e verificar se o sistema carrega os dados da primeira máquina da lista ou redireciona adequadamente.

**Acceptance Scenarios**:

1. **Given** que o cache de câmeras (`tandera_cameras`) existe, **When** acessa `historico.html` sem parâmetros, **Then** o sistema descriptografa o cache e usa o ID da primeira máquina encontrada.

---

### Edge Cases

- O que acontece quando o parâmetro `camera` na URL é inválido ou contém caracteres maliciosos? (O sistema deve validar o formato ou retornar erro 404/redirecionar).
- Como o sistema lida com falhas de rede ao buscar o histórico dinâmico? (Deve exibir um aviso de "Servidor Indisponível" no lugar do gráfico).
- O que acontece se o usuário acessar o Histórico sem que a lista de câmeras tenha sido carregada no Dashboard antes? (Deve forçar o redirecionamento para o Dashboard ou Login).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST extrair os parâmetros de identificação e nome da query string da URL.
- **FR-002**: O sistema MUST usar o endereço do servidor (obtido do armazenamento local da sessão) para construir o endpoint de histórico dinâmico.
- **FR-003**: O sistema MUST utilizar o token de sessão autenticado para autorizar a requisição de busca de dados.
- **FR-004**: O sistema MUST atualizar o título da página dinamicamente para exibir o nome da máquina sendo visualizada.
- **FR-005**: O sistema MUST processar a lista de câmeras em cache (usando o segredo derivado da sessão) caso o parâmetro de câmera falte na URL, para tentar um carregamento automático de fallback.
- **FR-006**: O sistema MUST garantir que, ao carregar a página, se nenhum ID de câmera for resolvido, o usuário seja alertado e redirecionado de volta ao menu principal por segurança.
- **FR-007**: O sistema MUST manter a funcionalidade dos filtros de data, aplicando-os à busca dinâmica no endpoint de histórico.

### Key Entities *(include if feature involves data)*

- **Camera ID**: String hexadecimal única que identifica o hardware no servidor de destino.
- **Server IP**: URL base do servidor de produção da fábrica em questão.
## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O gráfico de histórico carrega 100% dos dados reais do servidor remoto dinamicamente, sem nenhuma referência a IDs fixos no código-fonte.
- **SC-002**: A navegação entre Dashboard e Histórico leva menos de 2 segundos para iniciar o carregamento dos dados do gráfico.
- **SC-003**: O título da página exibe corretamente o nome da máquina injetado via parâmetro.
- **SC-004**: O acesso direto via URL com ID de câmera válido carrega os dados corretamente (desde que logado).

---

## Assumptions

- O endpoint remoto segue o contrato de resposta padrão de histórico do projeto.
- A sessão do usuário é válida por um período prolongado (ex: 8 horas).
- O navegador do usuário suporta armazenamento local persistente e parâmetros de URL.
- O método de obfuscação de dados é suficiente para proteger informações contra visualização casual no painel de ferramentas do desenvolvedor.
- O sistema de autenticação existente será reutilizado.
