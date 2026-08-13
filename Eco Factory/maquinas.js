// =====================================================
// ECOFACTORY - MÁQUINAS
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
// DADOS
// =====================================================

const maquinasIniciais = [

    {
        id: "M001",
        nome: "Prensa Hidráulica",
        tipo: "Prensa",
        status: "Ativo",
        localizacao: "Setor A"
    },

    {
        id: "M002",
        nome: "Torno CNC",
        tipo: "Usinagem",
        status: "Ativo",
        localizacao: "Setor B"
    },

    {
        id: "M003",
        nome: "Esteira Transportadora",
        tipo: "Transporte",
        status: "Ativo",
        localizacao: "Setor C"
    },

    {
        id: "M004",
        nome: "Caldeira",
        tipo: "Térmico",
        status: "Manutenção",
        localizacao: "Setor D"
    },

    {
        id: "M005",
        nome: "Robô de Solda",
        tipo: "Soldagem",
        status: "Parada",
        localizacao: "Setor A"
    }

];


// =====================================================
// OBTER MÁQUINAS
// =====================================================

function obterMaquinas() {

    const dados =
        localStorage.getItem(
            "ecoFactoryMaquinas"
        );


    if (!dados) {

        localStorage.setItem(
            "ecoFactoryMaquinas",
            JSON.stringify(
                maquinasIniciais
            )
        );

        return maquinasIniciais;

    }


    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(erro);

        return [];

    }

}


// =====================================================
// SALVAR
// =====================================================

function salvarMaquinas(maquinas) {

    localStorage.setItem(
        "ecoFactoryMaquinas",
        JSON.stringify(maquinas)
    );

}


// =====================================================
// ELEMENTOS
// =====================================================

const tabela =
    document.getElementById(
        "tabelaMaquinas"
    );

const modal =
    document.getElementById(
        "modalMaquina"
    );

const novaMaquina =
    document.getElementById(
        "novaMaquina"
    );

const fecharModal =
    document.getElementById(
        "fecharModal"
    );

const form =
    document.getElementById(
        "formMaquina"
    );


// =====================================================
// RENDERIZAR
// =====================================================

function renderizarMaquinas(
    lista = obterMaquinas()
) {

    tabela.innerHTML = "";


    const contador =
        document.getElementById(
            "contador"
        );


    contador.textContent =
        lista.length +
        (
            lista.length === 1
                ? " máquina"
                : " máquinas"
        );


    lista.forEach(function(maquina) {

        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>
                ${maquina.id}
            </td>

            <td>
                <strong>
                    ${maquina.nome}
                </strong>
            </td>

            <td>
                ${maquina.tipo}
            </td>

            <td>

                <span class="status ${classeStatus(maquina.status)}">
                    ${maquina.status}
                </span>

            </td>

            <td>
                ${maquina.localizacao}
            </td>

            <td>

                <button
                    class="action-button"
                    onclick="verMaquina('${maquina.id}')">

                    👁

                </button>


                <button
                    class="action-button"
                    onclick="excluirMaquina('${maquina.id}')">

                    🗑

                </button>

            </td>

        `;


        tabela.appendChild(tr);

    });

}


// =====================================================
// STATUS
// =====================================================

function classeStatus(status) {

    if (status === "Ativo") {

        return "ativo";

    }

    if (status === "Manutenção") {

        return "manutencao";

    }

    return "parada";

}


// =====================================================
// ABRIR MODAL
// =====================================================

novaMaquina.addEventListener(
    "click",
    function() {

        modal.classList.add("show");

    }
);


// =====================================================
// FECHAR
// =====================================================

fecharModal.addEventListener(
    "click",
    function() {

        modal.classList.remove(
            "show"
        );

    }
);


// =====================================================
// CADASTRAR
// =====================================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nome =
            document.getElementById(
                "nomeMaquina"
            ).value.trim();


        const tipo =
            document.getElementById(
                "tipoMaquina"
            ).value;


        const localizacao =
            document.getElementById(
                "localizacaoMaquina"
            ).value.trim();


        if (
            !nome ||
            !tipo ||
            !localizacao
        ) {

            return;

        }


        const maquinas =
            obterMaquinas();


        const numero =
            maquinas.length + 1;


        const nova = {

            id:
                "M" +
                String(numero)
                    .padStart(3, "0"),

            nome:
                nome,

            tipo:
                tipo,

            status:
                "Ativo",

            localizacao:
                localizacao

        };


        maquinas.push(
            nova
        );


        salvarMaquinas(
            maquinas
        );


        form.reset();


        modal.classList.remove(
            "show"
        );


        renderizarMaquinas();

    }
);


// =====================================================
// EXCLUIR
// =====================================================

function excluirMaquina(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta máquina?"
        );


    if (!confirmar) {

        return;

    }


    let maquinas =
        obterMaquinas();


    maquinas =
        maquinas.filter(function(maquina) {

            return maquina.id !== id;

        });


    salvarMaquinas(
        maquinas
    );


    renderizarMaquinas();

}


// =====================================================
// VER DETALHES
// =====================================================

function verMaquina(id) {

    localStorage.setItem(
        "ecoFactoryMaquinaSelecionada",
        id
    );


    window.location.href =
        "detalhes-maquina.html";

}


// =====================================================
// PESQUISA
// =====================================================

const buscar =
    document.getElementById(
        "buscarMaquina"
    );


const filtroStatus =
    document.getElementById(
        "filtroStatus"
    );


const filtroTipo =
    document.getElementById(
        "filtroTipo"
    );


function filtrar() {

    const texto =
        buscar.value
            .toLowerCase()
            .trim();


    const status =
        filtroStatus.value;


    const tipo =
        filtroTipo.value;


    let maquinas =
        obterMaquinas();


    maquinas =
        maquinas.filter(function(maquina) {


            const correspondeTexto =
                maquina.nome
                    .toLowerCase()
                    .includes(texto) ||

                maquina.id
                    .toLowerCase()
                    .includes(texto);


            const correspondeStatus =
                status === "todos" ||
                maquina.status === status;


            const correspondeTipo =
                tipo === "todos" ||
                maquina.tipo === tipo;


            return (
                correspondeTexto &&
                correspondeStatus &&
                correspondeTipo
            );

        });


    renderizarMaquinas(
        maquinas
    );

}


buscar.addEventListener(
    "input",
    filtrar
);


filtroStatus.addEventListener(
    "change",
    filtrar
);


filtroTipo.addEventListener(
    "change",
    filtrar
);


// =====================================================
// LIMPAR
// =====================================================

const limpar =
    document.getElementById(
        "limparFiltros"
    );


if (limpar) {

    limpar.addEventListener(
        "click",
        function() {

            buscar.value = "";

            filtroStatus.value =
                "todos";

            filtroTipo.value =
                "todos";

            renderizarMaquinas();

        }
    );

}


// =====================================================
// LOGOUT
// =====================================================

const logout =
    document.querySelector(
        ".logout"
    );


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
// INICIAR
// =====================================================

obterMaquinas();

renderizarMaquinas();