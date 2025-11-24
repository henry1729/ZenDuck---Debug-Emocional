🫧 ZenDuck: Systemctl Isolate Rescue.target Emocional 🦆
🚀 OVERVIEW: SAÚDE MENTAL É REQUISITO DE SISTEMA
O ZenDuck é uma Single Page Application (SPA) de alto impacto, desenvolvida como projeto final da Imersão Front-end da Alura + Google.

Nosso projeto traduz o Burnout, a Ansiedade e a Sobrecarga em comandos de software. Ele funciona como um Debugger Emocional: mapeia sintomas em Logs de Erro e entrega soluções em Scripts de Correção (Dicas do Pato) baseados em neurociência.

Propósito: Tratar a Saúde Mental como o Requisito de Sistema mais vital.

✨ REFINAMENTO E DESIGN IMERSIVO (UX Score: 10/10)
O ZenDuck foi construído com foco obsessivo na Usabilidade e na Estética de "Mente Limpa".

Estilo Visual: Design Efeito de Vidro Fosco (Glassmorphism), sobre a paleta Tema Spa & Água, conferindo uma sensação imediata de limpeza de cache.

Imersão Sonora: Implementação de áudio refinado, com música ambiente suave e volume controlado (0.05) e sons de feedback temático (bolhas, quack).

Acessibilidade: Botões de controle (Música e +Espuma) são fixos e flutuantes para fácil acesso e controle total da experiência.

UX de Busca: Suporte a busca via tecla ENTER e correções específicas de bugs de navegador (-webkit-autofill) para um fluxo de trabalho profissional.

🛠️ STACK TÉCNICO E ARQUITETURA
O projeto é uma aplicação puramente Front-end, otimizada para ser leve e rápida, simulando a estrutura de uma aplicação completa.

1. Lógica de Dados e Priorização
O conteúdo dinâmico é carregado a partir de dados.js (JSON-in-JS), simulando a resposta de uma API. A busca utiliza priorização em múltiplas camadas:

Prioridade Alta: Match no Título (listaOuro).

Prioridade Média: Match nas Tags (listaPrata).

Prioridade Baixa: Match na Descrição (listaBronze).

2. Controle de Áudio (Web Audio API)
O controle de volume é feito via JavaScript para garantir a sutiliza e evitar sobrecarga sonora:

JavaScript

// O volume da música de fundo é ajustado para ser extremamente sutil (0.05)
somAmbiente.volume = 0.05;

// O volume do alerta (Quack) é configurado para ser perceptível, mas não invasivo.
somQuack.volume = 0.3; 
3. Metáforas e Conteúdo
A tradução de sintomas para comandos técnicos é a chave da experiência:

Se for Burnout: O comando é Systemctl Isolate Rescue.target (Pausa imediata e não programada para resfriamento da CPU).

Se for Ansiedade/Caos: O comando é Clean_Cache_SPA() (Comando para focar e respirar).

🚀 EXECUÇÃO
O ZenDuck é estático e pode ser executado diretamente no navegador.

Bash

# 1. Clonar o Repositório
git clone https://github.com/henry1729/ZenDuck-Debug-Emocional.git

# 2. Inicializar o Ambiente
# Abra 'index.html' no seu navegador.
open index.html 
👨‍💻 Autoria
Projeto desenvolvido por Henry/henry1729 para a Imersão Front-end Alura + Google.
