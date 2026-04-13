# Feature Specification: Busca Dinâmica de Câmeras

## 1. Description
Esta funcionalidade visa substituir a configuração fixa e nativa das informações ("IDs de máquina" e "IDs de câmera") na interface do projeto. Em vez de hardcodar variáveis no dashboard, o frontend passará a chamar uma API remota `GET /cameras` no servidor de destino para obter dinamicamente a relação de câmeras daquele determinado usuário. Também implementa travas de performance e limites de requisição no lado do cliente.

## 2. Business Value
- Escabilidade para múltiplos clientes (Inquilinos), de forma que uma única página HTML possa atender indústrias e fábricas diferentes sem necessidade de reescrever o código;
- Redução na complexidade de Manutenção;
- Aumento da segurança, mitigando ataques de sobrecarga e Denial of Service (DoS) por meio de rate limiting nas requisições do frontend.

## 3. User Scenarios & Experience

**Cenário 1: Login inicial bem sucedido**
* **Ator:** Usuário logado
* **Ação:** O usuário acessa a página do dashboard e o sistema se conecta à URL autorizada correspondente (`serverIp`).
* **Resultado:** O sistema varre silenciosamente a lista correta de câmeras autorizadas desse usuário e renderiza os gráficos e botões em tela sem intervenção.

**Cenário 2: Prevenção de Abuso Temporário**
* **Ator:** Usuário Impaciente (ou Script Malicioso via console)
* **Ação:** O usuário clica várias vezes rapidamente no botão de atualizar os gráficos ou tenta forçar multiplas requisições de configuração da Câmera.
* **Resultado:** O frontend trava a requisição, utilizando uma janela temporal de tempo de espera (Rate limit) e impede o sobrecarregamento do servidor, processando apenas a primeira chamada útil ou emitindo um aviso amigável.

**Cenário 3: Falha de conexão com a API**
* **Ator:** Sistema / Backend Offline
* **Ação:** O sistema tenta obter as `cameras`, mas o endereço de rede correspondente àquela indústria está desligado.
* **Resultado:** O dashboard informa graficamente ao sistema que "As máquinas não estão respondendo" ao invés de quebrar silenciosamente no layout.

## 4. Functional Requirements

- **FR-001 (Busca Dinâmica)**: O `dashboard.html` e o `historico.html` devem extrair a array de câmeras realizando uma chamada securizada e validada (`GET`) para o endpoint de destino.
- **FR-002 (Cópia Base)**: A estrutura de dados esperada do retorno `GET /cameras` deve aninhar informações compatíveis com o desenho antigo, onde contem o ID visual da maquina (ex: `m3`) e o UUID da câmera (ex: `6892...`).
- **FR-003 (Rate Limiting Cliente)**: Deve existir um mecanismo de limitação no navegador (Throttle/Debounce ou Cache) impedindo mais do que 1 atualização de metadados a cada X segundos ou bloqueando requisições abusivas repetidas da configuração de base.
- **FR-004 (Cache na Sessão)**: As câmeras obtidas da API devem ser armazenadas no `sessionStorage`. O frontend deverá verificar esse cache primeiro; e caso exista, pulará novas chamadas para não onerar o servidor, exigindo fechamento da aba para purgar os dados (Option A selecionada).
- **FR-005 (Tratamento de Falha)**: Caso o Fetch no `/cameras` resulte em erros ou 404/500, o mapa não deve explodir a tela HTML mas sim interromper as exibições em tela.

## 5. Non-Functional Requirements
- **NFR-001 (Performance)**: A listagem deve demorar menos de 500ms para renderizar em conexões normais.
- **NFR-002 (Integração)**: Deve respeitar o cabeçalho SSL de segurança implementado na fase 001.

## 6. Success Criteria
- O frontend não possuirá nenhum ID de câmera chumbado no script do Layout final.
- Usuários de fábricas distintas que receberem diferentes *ServerIPs* após login conseguirão ver as suas máquinas de forma nativa e sem cross-bleeding de dados de log.
- Usuários repetindo chamadas compulsivamente para a base de câmeras serão bloqueados localmente.

## 7. Assumptions & Exclusions
- **Premissas (Assumptions):** O servidor Node.js/Destino tem a rota `GET /cameras` configurada adequadamente, em formato JSON (sendo retornado um Array de objetos) e o CORS para aquele IP permite a origem do front.
- **Exclusões (Exclusions):** Esse projeto de front não criará rotas de banco de dados para adicionar novas câmeras; Focará apenas em consultar informações já postas no destino.
