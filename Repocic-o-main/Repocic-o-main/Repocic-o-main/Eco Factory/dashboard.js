
javascript
// =====================================================
// ECOFACTORY - DASHBOARD
// =====================================================


// =====================================================
// VERIFICAR LOGIN
// =====================================================

if (localStorage.getItem("ecoFactoryLogado") !== "true") {
    window.location.href = "index.html";
}


// =====================================================
// ELEMENTOS
// =====================================================

const totalMaquinas = document.getElementById("totalMaquinas");
const totalProducao = document.getElementById("totalProducao");

const maquinasAtivas = document.getElementById("maquinasAtivas");
const maquinasManutencao = document.getElementById("maquinasManutencao");
const maquinasParadas = document.getElementById("maquinasParadas");

const userName = document.getElementById("userName");
const userAvatar = document.getElementById("userAvatar");

const logout = document.getElementById("logout");


// =====================================================
// CARREGAR NOME DA CONTA
// =====================================================

function carregarUsuario() {

    let nome = "";

    // -----------------------------------------------
    // PEGAR DADOS DO USUÁRIO
    // -----------------------------------------------

    const usuarioSalvo =
        localStorage.getItem("ecoFactoryUsuario");

    if (usuarioSalvo) {

        try {

            const usuario = JSON.parse(usuarioSalvo);

            if (
                usuario &&
                typeof usuario.nome === "string" &&
                usuario.nome.trim() !== ""
            ) {

                nome = usuario.nome.trim();

            }

        } catch (erro) {

            console.error(
                "Erro ao ler ecoFactoryUsuario:",
                erro
            );

        }

    }


    // -----------------------------------------------
    // TENTAR ecoFactoryNome
    // -----------------------------------------------

    if (!nome) {

        const nomeSalvo =
            localStorage.getItem("ecoFactoryNome");

        if (
            nomeSalvo &&
            nomeSalvo.trim() !== ""
        ) {

            nome = nomeSalvo.trim();

        }

    }


    // -----------------------------------------------
    // ÚLTIMO RECURSO
    // -----------------------------------------------

    if (!nome) {
        nome = "Usuário";
    }


    // -----------------------------------------------
    // MOSTRAR NOME NO DASHBOARD
    // -----------------------------------------------

    if (userName) {
        userName.textContent = nome;
    }


    // -----------------------------------------------
    // MOSTRAR PRIMEIRA LETRA
    // -----------------------------------------------

    if (userAvatar) {

        userAvatar.textContent =
            nome.charAt(0).toUpperCase();

    }

}


// =====================================================
// CARREGAR MÁQUINAS
// =====================================================

function carregarMaquinas() {

    const maquinasSalvas =
        localStorage.getItem("ecoFactoryMaquinas");

    let maquinas = [];

    if (maquinasSalvas) {

        try {

            maquinas = JSON.parse(maquinasSalvas);

        } catch (erro) {

            console.error(
                "Erro ao carregar máquinas:",
                erro
            );

            maquinas = [];

        }

    }


    // Total de máquinas

    if (totalMaquinas) {

        totalMaquinas.textContent =
            maquinas.length;

    }


    let ativas = 0;
    let manutencao = 0;
    let paradas = 0;


    maquinas.forEach(function (maquina) {

        const status =
            String(
                maquina.status ||
                maquina.estado ||
                ""
            )
            .trim()
            .toLowerCase();


        if (
            status === "ativo" ||
            status === "ativa" ||
            status === "funcionando"
        ) {

            ativas++;

        }


        else if (
            status === "manutencao" ||
            status === "manutenção" ||
            status === "em manutencao" ||
            status === "em manutenção"
        ) {

            manutencao++;

        }


        else if (
            status === "parada" ||
            status === "parado"
        ) {

            paradas++;

        }

    });


    // Atualizar status

    if (maquinasAtivas) {
        maquinasAtivas.textContent = ativas;
    }

    if (maquinasManutencao) {
        maquinasManutencao.textContent = manutencao;
    }

    if (maquinasParadas) {
        maquinasParadas.textContent = paradas;
    }

}


// =====================================================
// CARREGAR PRODUÇÃO
// =====================================================

function carregarProducao() {

    const producoesSalvas =
        localStorage.getItem("ecoFactoryProducoes");

    let producoes = [];

    if (producoesSalvas) {

        try {

            producoes = JSON.parse(producoesSalvas);

        } catch (erro) {

            console.error(
                "Erro ao carregar produção:",
                erro
            );

            producoes = [];

        }

    }


    let total = 0;


    producoes.forEach(function (producao) {

        const quantidade =
            Number(
                producao.quantidade ||
                producao.quantidadeProducao ||
                0
            );


        if (!isNaN(quantidade)) {
            total += quantidade;
        }

    });


    if (totalProducao) {

        totalProducao.textContent =
            total.toLocaleString("pt-BR");

    }

}


// =====================================================
// BOTÃO SAIR
// =====================================================

if (logout) {

    logout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            localStorage.removeItem(
                "ecoFactoryLogado"
            );

            localStorage.removeItem(
                "ecoFactoryEmail"
            );

            window.location.href =
                "index.html";

        }
    );

}


// =====================================================
// ATUALIZAR DASHBOARD
// =====================================================

function atualizarDashboard() {

    carregarUsuario();

    carregarMaquinas();

    carregarProducao();

}


// =====================================================
// INICIAR
// =====================================================

atualizarDashboard();


// =====================================================
// ATUALIZAR AO VOLTAR PARA A PÁGINA
// =====================================================

window.addEventListener(
    "focus",
    atualizarDashboard
);


window.addEventListener(
    "storage",
    atualizarDashboard
);

