/**
 * ==================================================================================
 * VARIÁVEIS GLOBAIS
 * ----------------------------------------------------------------------------------
 * Declaradas com 'let' para serem acessadas e modificadas por todas as funções.
 * ==================================================================================
 */
let somAmbiente;
let somBolhas;
let somQuack;
let campoPesquisaInput;
let btnMusica;
let musicaLigada = false;

/**
 * Toca um elemento de áudio do início.
 * Útil para efeitos sonoros curtos que podem ser repetidos antes de terminarem.
 * @param {HTMLAudioElement} elementoAudio O elemento de áudio a ser tocado.
 */
function tocarSom(elementoAudio) {
    if (elementoAudio) {
        elementoAudio.currentTime = 0; // Reinicia o áudio para o início
        elementoAudio.play().catch(e => console.error("Erro ao tocar áudio:", e));
    }
}

/**
 * Alterna a reprodução da música de fundo (liga/desliga).
 * Atualiza o texto do botão de música para refletir o estado atual.
 */
function toggleMusicaFundo() {
    if (somAmbiente.paused) {
        somAmbiente.play().catch(e => {
            console.error("Erro ao tentar tocar a música de fundo:", e);
        });
        btnMusica.textContent = '🎶 Música';
        musicaLigada = true;
    } else {
        somAmbiente.pause();
        btnMusica.textContent = '🔇 Música';
        musicaLigada = false;
    }
}

/**
 * ==================================================================================
 * INICIALIZAÇÃO DO DOM
 * ----------------------------------------------------------------------------------
 * Executa funções e configura listeners quando o conteúdo da página é carregado.
 * ==================================================================================
 */
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Inicialização dos Elementos do DOM ---
    campoPesquisaInput = document.getElementById("campo-pesquisa");
    somAmbiente = document.getElementById('som-ambiente');
    somBolhas = document.getElementById('som-bolhas');
    somQuack = document.getElementById('som-quack');
    btnMusica = document.getElementById('btn-musica');

    // --- 2. Configuração do Áudio Ambiente ---
    if (somAmbiente && btnMusica) {
        somAmbiente.volume = 0.01; // Volume bem baixo para não incomodar
        btnMusica.addEventListener('click', toggleMusicaFundo);
    }

    // --- 3. Lógica do Placeholder Dinâmico ---
    const frasesPlaceholder = [
        "O que está pesando na sua RAM? (Ex: sono...)",
        "Respire fundo... O que você sente?",
        "Nenhum bug mental dura para sempre...",
        "Seu cérebro não é CPU. Pode pausar.",
        "Carregando calma... Digite seu problema.",
        "Ansiedade? Burnout? O Pato te escuta."
    ];
    let indiceFrase = 0;

    if (campoPesquisaInput) {
        setInterval(() => {
            // Altera o placeholder apenas se o campo não estiver focado e estiver vazio
            if (document.activeElement !== campoPesquisaInput && campoPesquisaInput.value === "") {
                campoPesquisaInput.setAttribute("placeholder", frasesPlaceholder[indiceFrase]);
                indiceFrase = (indiceFrase + 1) % frasesPlaceholder.length;
            }
        }, 3500);
    }

    // --- 4. Listener para a Tecla "Enter" no Campo de Pesquisa ---
    if (campoPesquisaInput) {
        campoPesquisaInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Impede o comportamento padrão do Enter (ex: submeter formulário)
                pesquisar('topo');
                campoPesquisaInput.blur(); // Remove o foco do campo de pesquisa
            }
        });
    }
});

/**
 * Preenche o campo de pesquisa com um termo de atalho e executa a pesquisa.
 * @param {string} termo A palavra-chave a ser pesquisada.
 * @param {string} local O destino do resultado ('topo' ou 'baixo').
 */
function buscarAtalho(termo, local) {
    document.getElementById("campo-pesquisa").value = termo;
    pesquisar(local);
}

/**
 * Realiza a busca nos dados com base no valor do campo de pesquisa e exibe os resultados.
 * @param {string} [localDestino='topo'] Define onde os resultados serão exibidos. Aceita 'topo' ou 'baixo'.
 */
function pesquisar(localDestino = 'topo') {
    const campoPesquisaValue = document.getElementById("campo-pesquisa").value;

    const sectionAlvo = (localDestino === 'baixo') ?
        document.getElementById("resultado-baixo") :
        document.getElementById("resultado-topo");

    const LIMITE_RESULTADOS = 3;

    // Se o campo de pesquisa estiver vazio, exibe uma mensagem padrão.
    if (!campoPesquisaValue) {
        sectionAlvo.innerHTML = "<div class='item-resultado'><div class='conteudo-card'><p>🫧 Quack! Digite algo para lavarmos...</p></div></div>";
        return;
    }

    const termoPesquisa = campoPesquisaValue.toLowerCase();

    // Filas de prioridade para ordenar os resultados
    let listaOuro = []; // Resultados encontrados no título
    let listaPrata = []; // Resultados encontrados nas tags
    let listaBronze = []; // Resultados encontrados na descrição

    for (const dado of dados) {
        const titulo = dado.titulo.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        const tags = dado.tags.toLowerCase();

        if (titulo.includes(termoPesquisa)) {
            listaOuro.push(dado);
        } else if (tags.includes(termoPesquisa)) {
            listaPrata.push(dado);
        } else if (descricao.includes(termoPesquisa)) {
            listaBronze.push(dado);
        }
    }

    // Combina as listas de prioridade e limita o número de resultados
    const todosOsResultados = [...listaOuro, ...listaPrata, ...listaBronze];
    const resultadosFinais = todosOsResultados.slice(0, LIMITE_RESULTADOS);

    let htmlFinal = "";

    // Constrói o HTML para cada resultado encontrado
    for (let dado of resultadosFinais) {
        let dicaFormatada = dado.dica_tecnica.replace(/(#\s*dica_do_pato\s*>)/, '<strong>$1</strong>');
        let alertaFormatado = dado.red_flag || "";

        if (alertaFormatado) {
            alertaFormatado = alertaFormatado.replace(/(⚠️\s+Alerta de [^:]+:\s*)/, '<strong>$1</strong>');
            alertaFormatado = alertaFormatado.replace(/(⚠️\s+Alerta:\s*)/, '<strong>$1</strong>');
        }

        htmlFinal += `
            <div class="item-resultado">
                <div class="espuma-top"></div>
                <div class="conteudo-card">
                    <span class="tags">🧼 Problema Detectado</span> 
                    <h2>${dado.titulo}</h2>
                    <p class="descricao-meta"><strong>🦆 O que está rolando:</strong> ${dado.descricao}</p>
                    <p class="descricao-meta"><strong>📉 Log de Erros:</strong> ${dado.sintomas || "Sintomas variados."}</p>
                    <div class="area-dev">${dicaFormatada}</div>
                    <div class="area-ciencia">
                        <p><strong>📚 A Ciência:</strong> ${dado.ciencia || "Baseado em evidências."}</p>
                        <p class="red-flag">${alertaFormatado}</p>
                    </div> 
                </div>
            </div>
        `;
    }

    // Se nenhum resultado for encontrado, exibe uma mensagem específica.
    if (!htmlFinal) {
        if (somQuack) {
            somQuack.volume = 0.05;
        }
        tocarSom(somQuack);
        htmlFinal = `
            <div class="item-resultado">
                <div class="conteudo-card">
                    <h2>🦆 Nada encontrado</h2>
                    <p>Essa sujeira é nova! O Pato Sênior não encontrou esse bug na base de dados.</p>
                </div>
            </div>
        `;
    }

    // Insere o HTML final na seção de destino.
    sectionAlvo.innerHTML = htmlFinal;
}

/**
 * Cria e anima bolhas extras na tela para um efeito visual.
 * Toca um som de bolhas uma vez por chamada.
 */
function soltarBolhasExtras() {
    for (let i = 0; i < 10; i++) {
        const bolha = document.createElement("div");
        bolha.classList.add("bolha-extra");

        const tamanho = Math.floor(Math.random() * 40) + 10 + "px";
        bolha.style.width = tamanho;
        bolha.style.height = tamanho;
        bolha.style.left = Math.random() * 100 + "vw";
        bolha.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(bolha);

        // Remove a bolha da DOM após a animação para não sobrecarregar a página
        setTimeout(() => {
            bolha.remove();
        }, 5000);
    }

    if (somBolhas) {
        somBolhas.volume = 0.4;
    }
    tocarSom(somBolhas);
}