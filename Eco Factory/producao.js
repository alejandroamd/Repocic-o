// =====================================================
// ECOFACTORY - PRODUÇÃO
// =====================================================


// =====================================================
// VERIFICAR LOGIN
// =====================================================

if (
    localStorage.getItem("ecoFactoryLogado") !== "true"
) {

    window.location.href = "index.html";

}


// =====================================================
// ELEMENTOS
// =====================================================

const tabelaProducao =
    document.getElementById("tabelaProducao");

const contador =
    document.getElementById("contador");

const modal =
    document.getElementById("modalProducao");

const novaProducao =
    document.getElementById("novaProducao");

const fecharModal =
    document.getElementById("fecharModal");

const form =
    document.getElementById("formProducao");

const maquinaProducao =
    document.getElementById("maquinaProducao");

const filtroMaquina =
    document.getElementById("filtroMaquina");

const filtroProduto =
    document.getElementById("filtroProduto");

const dataInicio =
    document.getElementById("dataInicio");

const dataFim =
    document.getElementById("dataFim");

const buscar =
    document.getElementById("buscar");

const limparFiltros =
    document.getElementById("limparFiltros");

const semRegistros =
    document.getElementById("semRegistros");


// =====================================================
// NOME DO USUÁRIO
// =====================================================

const nomeUsuario =
    localStorage.getItem("ecoFactoryNome") || "Cliente";

const nomeElement =
    document.getElementById("nomeUsuario");

if (nomeElement) {

    nomeElement.textContent =
        "Olá, " + nomeUsuario;

}


// =====================================================
// AVATAR
// =====================================================

const avatar =
    document.getElementById("userAvatar");

if (avatar) {

    avatar.textContent =
        nomeUsuario
            .charAt(0)
            .toUpperCase();

}


// =====================================================
// BANCO LOCAL DE MÁQUINAS
// =====================================================

function obterMaquinas() {

    const dados =
        localStorage.getItem("ecoFactoryMaquinas");

    if (!dados) {

        return [];

    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar máquinas:",
            erro
        );

        return [];

    }

}


// =====================================================
// BANCO LOCAL DE PRODUÇÃO
// =====================================================

function obterProducoes() {

    const dados =
        localStorage.getItem("ecoFactoryProducoes");

    if (!dados) {

        return [];

    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar produção:",
            erro
        );

        return [];

    }

}


// =====================================================
// SALVAR PRODUÇÕES
// =====================================================

function salvarProducoes(producoes) {

    localStorage.setItem(
        "ecoFactoryProducoes",
        JSON.stringify(producoes)
    );

}


// =====================================================
// CARREGAR MÁQUINAS NOS SELECTS
// =====================================================

function carregarMaquinas() {

    const maquinas =
        obterMaquinas();


    maquinaProducao.innerHTML = `
        <option value="">
            Selecione uma máquina
        </option>
    `;


    filtroMaquina.innerHTML = `
        <option value="todos">
            Todas
        </option>
    `;


    maquinas.forEach(function(maquina) {


        // SELECT DO CADASTRO

        const optionCadastro =
            document.createElement("option");

        optionCadastro.value =
            maquina.id;

        optionCadastro.textContent =
            maquina.id + " - " + maquina.nome;

        maquinaProducao.appendChild(
            optionCadastro
        );


        // SELECT DO FILTRO

        const optionFiltro =
            document.createElement("option");

        optionFiltro.value =
            maquina.id;

        optionFiltro.textContent =
            maquina.nome;

        filtroMaquina.appendChild(
            optionFiltro
        );

    });

}


// =====================================================
// NOME DA MÁQUINA
// =====================================================

function nomeDaMaquina(id) {

    const maquinas =
        obterMaquinas();

    const maquina =
        maquinas.find(function(item) {

            return item.id === id;

        });


    if (maquina) {

        return maquina.nome;

    }


    return "Máquina removida";

}


// =====================================================
// RENDERIZAR TABELA
// =====================================================

function renderizarProducoes(lista) {

    tabelaProducao.innerHTML = "";


    contador.textContent =
        lista.length +
        (
            lista.length === 1
                ? " registro"
                : " registros"
        );


    if (lista.length === 0) {

        semRegistros.style.display =
            "block";

        atualizarResumo([]);

        return;

    }


    semRegistros.style.display =
        "none";


    lista.forEach(function(producao) {


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>
                ${formatarData(producao.data)}
            </td>

            <td>
                <strong>
                    ${nomeDaMaquina(producao.maquinaId)}
                </strong>

                <small>
                    ${producao.maquinaId}
                </small>
            </td>

            <td>
                ${escapeHTML(producao.produto)}
            </td>

            <td>
                <strong>
                    ${Number(producao.quantidade).toLocaleString("pt-BR")}
                </strong>
            </td>

            <td>
                <span class="turno">
                    ${producao.turno}
                </span>
            </td>

            <td>

                <button
                    class="action-button delete"
                    onclick="excluirProducao('${producao.id}')">

                    🗑

                </button>

            </td>

        `;


        tabelaProducao.appendChild(tr);

    });


    atualizarResumo(lista);

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatarData(data) {

    if (!data) {

        return "-";

    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return data;

    }


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// =====================================================
// EVITAR HTML INJETADO
// =====================================================

function escapeHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto;

    return div.innerHTML;

}


// =====================================================
// RESUMO
// =====================================================

function atualizarResumo(lista) {

    let total = 0;


    lista.forEach(function(item) {

        total +=
            Number(item.quantidade) || 0;

    });


    const totalElement =
        document.getElementById("producaoTotal");

    const registrosElement =
        document.getElementById("totalRegistros");

    const mediaElement =
        document.getElementById("mediaProducao");


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString("pt-BR");

    }


    if (registrosElement) {

        registrosElement.textContent =
            lista.length;

    }


    if (mediaElement) {

        const media =
            lista.length > 0
                ? total / lista.length
                : 0;

        mediaElement.textContent =
            Math.round(media).toLocaleString("pt-BR");

    }

}


// =====================================================
// APLICAR FILTROS
// =====================================================

function aplicarFiltros() {

    let producoes =
        obterProducoes();


    const maquinaSelecionada =
        filtroMaquina.value;


    const produtoTexto =
        filtroProduto.value
            .trim()
            .toLowerCase();


    const inicio =
        dataInicio.value;


    const fim =
        dataFim.value;


    // FILTRO MÁQUINA

    if (
        maquinaSelecionada !== "todos"
    ) {

        producoes =
            producoes.filter(function(item) {

                return (
                    item.maquinaId ===
                    maquinaSelecionada
                );

            });

    }


    // FILTRO PRODUTO

    if (produtoTexto !== "") {

        producoes =
            producoes.filter(function(item) {

                return item.produto
                    .toLowerCase()
                    .includes(produtoTexto);

            });

    }


    // DATA INICIAL

    if (inicio !== "") {

        producoes =
            producoes.filter(function(item) {

                return item.data >= inicio;

            });

    }


    // DATA FINAL

    if (fim !== "") {

        producoes =
            producoes.filter(function(item) {

                return item.data <= fim;

            });

    }


    renderizarProducoes(
        producoes
    );

}


// =====================================================
// ABRIR MODAL
// =====================================================

novaProducao.addEventListener(
    "click",
    function() {

        carregarMaquinas();

        modal.classList.add("show");

    }
);


// =====================================================
// FECHAR MODAL
// =====================================================

fecharModal.addEventListener(
    "click",
    function() {

        modal.classList.remove("show");

    }
);


// =====================================================
// FECHAR CLICANDO FORA
// =====================================================

modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


// =====================================================
// CADASTRAR PRODUÇÃO
// =====================================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const data =
            document.getElementById(
                "dataProducao"
            ).value;


        const maquinaId =
            maquinaProducao.value;


        const produto =
            document.getElementById(
                "produtoProducao"
            ).value.trim();


        const quantidade =
            Number(
                document.getElementById(
                    "quantidadeProducao"
                ).value
            );


        const turno =
            document.getElementById(
                "turnoProducao"
            ).value;


        if (
            !data ||
            !maquinaId ||
            !produto ||
            !quantidade ||
            !turno
        ) {

            mostrarMensagem(
                "Preencha todos os campos.",
                "erro"
            );

            return;

        }


        const producoes =
            obterProducoes();


        const nova =
            {

                id:
                    "PRD-" +
                    Date.now(),

                data:
                    data,

                maquinaId:
                    maquinaId,

                produto:
                    produto,

                quantidade:
                    quantidade,

                turno:
                    turno

            };


        producoes.push(nova);


        salvarProducoes(
            producoes
        );


        mostrarMensagem(
            "Produção cadastrada com sucesso!",
            "sucesso"
        );


        form.reset();


        setTimeout(function() {

            modal.classList.remove(
                "show"
            );

            renderizarProducoes(
                obterProducoes()
            );

        }, 700);

    }
);


// =====================================================
// MENSAGEM
// =====================================================

function mostrarMensagem(
    texto,
    tipo
) {

    const mensagem =
        document.getElementById(
            "mensagemProducao"
        );


    mensagem.textContent =
        texto;


    mensagem.className =
        "mensagem " + tipo;

}


// =====================================================
// EXCLUIR PRODUÇÃO
// =====================================================

function excluirProducao(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir este registro?"
        );


    if (!confirmar) {

        return;

    }


    let producoes =
        obterProducoes();


    producoes =
        producoes.filter(function(item) {

            return item.id !== id;

        });


    salvarProducoes(
        producoes
    );


    aplicarFiltros();

}


// =====================================================
// FILTROS
// =====================================================

buscar.addEventListener(
    "click",
    aplicarFiltros
);


filtroMaquina.addEventListener(
    "change",
    aplicarFiltros
);


filtroProduto.addEventListener(
    "input",
    aplicarFiltros
);


limparFiltros.addEventListener(
    "click",
    function() {

        dataInicio.value = "";
        dataFim.value = "";

        filtroMaquina.value =
            "todos";

        filtroProduto.value =
            "";

        renderizarProducoes(
            obterProducoes()
        );

    }
);


// =====================================================
// LOGOUT
// =====================================================

const logout =
    document.getElementById("logout");


if (logout) {

    logout.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            localStorage.removeItem(
                "ecoFactoryLogado"
            );


            localStorage.removeItem(
                "ecoFactoryNome"
            );


            window.location.href =
                "index.html";

        }
    );

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

carregarMaquinas();

renderizarProducoes(
    obterProducoes()
);