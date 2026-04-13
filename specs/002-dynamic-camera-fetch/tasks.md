# Tasks: Busca Dinâmica de Câmeras

**Input**: Design documents from `/specs/002-dynamic-camera-fetch/`
**Prerequisites**: plan.md, spec.md, research.md

## Phase 1: Security Core (Funções de Criptografia)

**Purpose**: Garantir que as configurações salvadas no Browser não sejam legíveis ("Anti-Snooping").

- [ ] T001 [P] [US1] Criar script nativo de encriptação simples (Base64 + XOR Cipher) no `dashboard.html`.
- [ ] T002 [US1] Encapsular o manipulador de `sessionStorage` para só realizar gravações encriptadas usando o Token do Google local como Password (salt).

## Phase 2: Endpoint Integration & Rate Limit

**Purpose**: Desligar as variáveis estáticas e bater no servidor destino.

- [ ] T003 [P] [US2] Substituir constante `maquinas` antiga para Variável vazia.
- [ ] T004 [US2] Escrever função assíncrona `carregarCameras()` travada via `Date.now()` para prevenir spam (Limitar Requests < 1 minuto de cache válido).
- [ ] T005 [US2] Executar `fetch(${serverUrl}/cameras)`. Validar o JSON recebido (extrair `.id` e `.cameraID`).
- [ ] T006 [US2] Garantir que o renderizador de Combo Box e canvas inicialize SOMENTE APÓS o carregamento de `carregarCameras()`.

## Phase 3: Propagation (Histórico)

**Purpose**: Levar os dados criptografados protegidos na porta da frente (Dashboard) para o portão do histórico.

- [ ] T007 [US3] Copiar o módulo de descriptografia de Cache para o começo do script no `historico.html`.
- [ ] T008 [US3] Ligar a `const cameraId` ao cache carregado dinamicamente das configurações.

---

## Dependencies & Execution Order

- **Phase 2** depende da **Phase 1**.
- **Phase 3** pode isolar dependências em testes, porém necessita da criptografia criada na fase 1 copiável.
