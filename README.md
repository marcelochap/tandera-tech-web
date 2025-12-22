# Tandera Tech - Sistema de Monitoramento de Qualidade 🏗️🤖

Sistema de monitoramento em tempo real para controle de qualidade na fabricação de blocos de concreto, utilizando visão computacional e relatórios analíticos.

## 🚀 Sobre o Projeto
Este sistema foi desenvolvido para centralizar a visualização de dados gerados por uma IA de visão computacional posicionada em máquinas de fabricação de blocos. Ele substitui o monitoramento básico via WhatsApp por um dashboard web responsivo, permitindo análises históricas e tomadas de decisão baseadas em dados.

### Principais Funcionalidades
- **Autenticação Segura**: Tela de login para controle de acesso.
- **Monitoramento em Tempo Real**: Visualização da última foto capturada pela máquina junto com a classificação da IA (Bom, Ruim ou Incerto).
- **Dashboard de Produção**: Gráfico de área que compara a produção total com a produção de peças aprovadas.
- **Filtros Personalizados**: Consulta de histórico por intervalos de datas selecionáveis.
- **Interface Responsiva**: Design otimizado para uso em smartphones e desktops.

## 🛠️ Tecnologias Utilizadas
* **HTML5 / CSS3**: Estrutura e estilização (Flexbox/Grid).
* **JavaScript (Vanilla)**: Lógica de consumo de API e manipulação do DOM.
* **Chart.js**: Biblioteca para renderização dos gráficos de desempenho.
* **API Rest**: Integração com servidor de processamento de imagens.

## 📁 Estrutura do Repositório
- `index.html`: Página inicial de Login.
- `dashboard.html`: Painel principal com monitoramento das máquinas.
- `historico.html`: Página de relatórios e gráficos analíticos.

## ⚙️ Como Executar o Projeto
1. Clone este repositório ou baixe os arquivos.
2. Certifique-se de que todos os arquivos `.html` estão na mesma pasta.
3. Como o projeto consome uma API externa, é necessário que o servidor da API esteja configurado com as permissões de **CORS** ativadas.
4. Abra o arquivo `index.html` em qualquer navegador moderno.

> **Nota Técnica**: Durante o desenvolvimento, caso a API apresente erro de CORS e você não tenha acesso ao backend, utilize a extensão "Allow CORS" no navegador Chrome para testes locais.

## 📈 Próximos Passos
- [ ] Implementar visualização para a segunda máquina (Câmera 02).
- [ ] Conectar os gráficos de histórico diretamente aos endpoints de estatísticas da API.
- [ ] Implementar sistema de logout real com limpeza de sessão.

---
Desenvolvido por **Tandera Tech** - *Inovação em Visão Computacional para a Indústria.*
