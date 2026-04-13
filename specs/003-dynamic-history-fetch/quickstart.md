# Dynamic History Quickstart

## Local Development
Since the project relies natively on Vanilla JS and `http-server`, the execution is straight-forward.

1. Ensure the API backend is running or mock credentials are known.
2. Spin up `http-server` via `npx -y http-server . -p 5500 -c-1`
3. Navigate to Dashboard, and click "Ver Histórico".
4. Alternately, access directly via `http://localhost:5500/historico.html?camera=6814d7d7272a9e45300f8252&name=M4`.

The Javascript will securely resolve the target IP from Local Cache and use standard `fetch` API commands to plot the Charts.js implementation.
