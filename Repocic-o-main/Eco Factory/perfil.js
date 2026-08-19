// =====================================================
// ECOFACTORY - PERFIL
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

const topUserName =
    document.getElementById("topUserName");

const topUserAvatar =
    document.getElementById("topUserAvatar");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profileAvatar =
    document.getElementById("profileAvatar");

const infoNome =
    document.getElementById("infoNome");

const infoEmail =
    document.getElementById("infoEmail");

const infoTipo =
    document.getElementById("infoTipo");

const logout =
    document.getElementById("logout");

const logoutButton =
    document.getElementById("logoutButton");


// =====================================================
// PEGAR USUÁRIO DO CADASTRO
// =====================================================

const usuarioSalvo =
    localStorage.getItem("ecoFactoryUsuario");


// =====================================================
// VERIFICAR SE EXISTE USUÁRIO
// =====================================================

if (!usuarioSalvo) {

    window.location.href = "index.html";

}


// =====================================================
// CONVERTER DADOS
// =====================================================

let usuario = null;

try {

    usuario =
        JSON.parse(usuarioSalvo);

} catch (erro) {

    console.error(
        "Erro ao carregar usuário:",
        erro
    );

    localStorage.removeItem(
        "ecoFactoryUsuario"
    );

    window.location.href =
        "index.html";

}


// =====================================================
// DADOS DO USUÁRIO
// =====================================================

if (usuario) {

    const nome =
        usuario.nome || "Usuário";

    const email =
        usuario.email ||
        "E-mail não informado";


    // =================================================
    // NOME NO TOPO
    // =================================================

    if (topUserName) {

        topUserName.textContent =
            nome;

    }


    // =================================================
    // NOME DO PERFIL
    // =================================================

    if (profileName) {

        profileName.textContent =
            nome;

    }


    // =================================================
    // NOME NAS INFORMAÇÕES
    // =================================================

    if (infoNome) {

        infoNome.textContent =
            nome;

    }


    // =================================================
    // E-MAIL DO PERFIL
    // =================================================

    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    // =================================================
    // E-MAIL NAS INFORMAÇÕES
    // =================================================

    if (infoEmail) {

        infoEmail.textContent =
            email;

    }


    // =================================================
    // TIPO DE CONTA
    // =================================================

    if (infoTipo) {

        if (
            usuario.tipo === "google"
        ) {

            infoTipo.textContent =
                "Conta Google";

        } else {

            infoTipo.textContent =
                "Usuário do sistema";

        }

    }


    // =================================================
    // PRIMEIRA LETRA DO NOME
    // =================================================

    const primeiraLetra =
        nome
            .trim()
            .charAt(0)
            .toUpperCase();


    // =================================================
    // AVATAR DO TOPO
    // =================================================

    if (topUserAvatar) {

        topUserAvatar.textContent =
            primeiraLetra;

    }


    // =================================================
    // AVATAR DO PERFIL
    // =================================================

    if (profileAvatar) {

        profileAvatar.textContent =
            primeiraLetra;

    }

}


// =====================================================
// FUNÇÃO SAIR
// =====================================================

function sairDaConta() {

    // Remove somente a sessão

    localStorage.removeItem(
        "ecoFactoryLogado"
    );

    localStorage.removeItem(
        "ecoFactoryEmail"
    );


    // Mantém o cadastro salvo
    // para poder entrar novamente


    window.location.href =
        "index.html";

}


// =====================================================
// BOTÃO SAIR - SIDEBAR
// =====================================================

if (logout) {

    logout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sairDaConta();

        }
    );

}


// =====================================================
// BOTÃO SAIR - PERFIL
// =====================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sairDaConta();

        }
    );

}