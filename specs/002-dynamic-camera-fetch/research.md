# Research: Obfuscação e Proteção do Local Cache

## Tópicos Investigados

### 1. Nível de Segurança do frontend sem Banco de Dados (Referente ao pedido do usuário)
O usuário solicitou que as variáveis da lista de câmeras obtidas da requisição externa (`/cameras`) e armazenadas localmente no Browser não possam ser lidas facilmente pelo link direto, gerando uma barreira de segurança adicional.

**Decision (Decisão):** Utilizar um encriptador em tempo-de-execução utilizando o próprio Token JWT da Sessão (que já possuímos) como "Chave" de ofuscação (XOR Cipher ou AES nativo) para encriptar o Storage.
**Rationale:** Como não teremos intermédio de banco de dados e só usaremos HTML Básico, a única forma de guardar um JSON na `sessionStorage` sem ser ilegível ("`[{"id":"m3","cameraID":"..."}]`") é criptografar ou ofuscar a string antes de salvar, e reverter o processo ao ler. Usar o JWT único do usuário como senha de ofuscação garante que só aquele login possa gerar e re-ler a string.
**Alternatives Considered:** 
- `Base64 (btoa)`: Descartado. É reversível com 2 cliques, qualquer pessoa em sã consciência sabe decodificar um base64.
- `window.crypto.subtle (AES-GCM)`: Excelente, é o padrão ouro para não vazar a configuração. Criaremos funções em JavaScript puro `encryptBlob()` e `decryptBlob()` nativas para rodar no `dashboard.html`.

### 2. Formato do Fetch Nativo e Rate Limit Computacional
**Decision:** Para o limite de tempo (Rate Limiting) exigido na Spec, não usaremos bibliotecas gigantes.
**Rationale:** Como a instrução diz "tudo no mesmo HTML básico", faremos uma trava no evento de tempo: se `Date.now() - lastFetchTime < 60000` (1 minuto), a função de botão ignora a execução e sequer envia o HTTP Request, prevenindo sobrecarga de requisições. 
