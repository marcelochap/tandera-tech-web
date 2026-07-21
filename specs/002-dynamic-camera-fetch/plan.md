# Implementation Plan: Busca Dinâmica de Câmeras

## 1. Technical Stack Constraints
- HTML Vanilla, JavaScript Nativo (ES6+ assíncrono).
- API via rotas REST usando Header CORS aceito.
- Uso exclusivo das ferramentas Browser API para limitação tática e mascaramento.

## 2. Architecture Changes

### Frontend
- **Obfuscação Anti-Snooping:** Função leve misturando base64 (`atob`/`btoa`) e um XOR/Vigenère simples com o JWT que o usuário obteve no passo 001. As câmeras obtidas não viverão na aba limpa de visualizadores.
- **Rede Inteligente (Rate Limiting Cliente):** Variáveis como `localStorage.setItem('tandera_cameras_timestamp', Date.now())` determinarão quando o próximo `fetch` físico contra a nuvem será destrancado. Toda atualização "spammada" antes desse limite retornará um corte prévio carregado pelo buffer local (que estará criptografado).

## 3. Data Flow
1. Computa tempo do ultimo request no Storage.
2. Se delta < 300000ms (5 Minutos) e existir payload: Lê payload criptografado, usa JWT pra decriptar e popula UI. 
3. Se delta estourou ou não tem payload: Bate no `GET https://${servidorDaFabrica}/cameras`. Encapsula usando JWT como Segredo.
4. Salva no Storage: Timestamp de agora e a Hash do Objeto de Câmeras blindadas. Lê payload normal pra UI.

## 4. Dependencies
- Sem bibliotecas externas. Algoritmo Vanilla de Encode (anti script kiddies).

## 5. Security & Risk Mitigation
- Resolve perfeitamente o request de não expor configurações sigilosas cruas na Session de devs iniciantes bisbilhotando (o browser F12).

## 6. Implementation Phases (Work Breakdown)
Ações focadas estritamente em refabricação de `dashboard.html` e `historico.html`.
