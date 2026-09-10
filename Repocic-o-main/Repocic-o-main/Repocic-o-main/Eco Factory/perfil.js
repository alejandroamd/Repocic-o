javascript
// =====================================================
// ECOFACTORY - MEU PERFIL
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

const topUserName = document.getElementById("topUserName");
const topUserAvatar = document.getElementById("topUserAvatar");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileAvatar = document.getElementById("profileAvatar");

const infoNome = document.getElementById("infoNome");
const infoEmail = document.getElementById("infoEmail");
const infoTipo = document.getElementById("infoTipo");

const logout = document.getElementById("logout");
const logoutButton = document.getElementById("logoutButton");


// =====================================================
// PEGAR CONTA SALVA
// =====================================================

let usuario = null;

const usuarioSalvo =
    localStorage.getItem("ecoFactoryUsuario");


// =====================================================
// LER DADOS DA CONTA
// =====================================================

if (usuarioSalvo) {

    try {

        usuario = JSON.parse(usuarioSalvo);

    } catch (erro) {

        console.error(
            "Erro ao ler os dados da conta:",
            erro
        );

    }

}


// =====================================================
// SE NÃO EXISTIR USUÁRIO
// =====================================================

if (!usuario) {

    const nomeSalvo =
        localStorage.getItem("ecoFactoryNome");

    const emailSalvo =
        localStorage.getItem("ecoFactoryEmail");


    if (nomeSalvo || emailSalvo) {

        usuario = {

            nome: nomeSalvo || "Usuário",

            email: emailSalvo || "E-mail não informado",

            tipo: "normal"

        };

    }

}


// =====================================================
// DADOS DA CONTA
// =====================================================

if (usuario) {

    const nome =
        usuario.nome || "Usuário";

    const email =
        usuario.email || "E-mail não informado";


    // =================================================
    // NOME NO TOPO
    // =================================================

    if (topUserName) {

        topUserName.textContent = nome;

    }


    // =================================================
    // NOME DO PERFIL
    // =================================================

    if (profileName) {

        profileName.textContent = nome;

    }


    // =================================================
    // NOME NAS INFORMAÇÕES
    // =================================================

    if (infoNome) {

        infoNome.textContent = nome;

    }


    // =================================================
    // E-MAIL NO PERFIL
    // =================================================

    if (profileEmail) {

        profileEmail.textContent = email;

    }


    // =================================================
    // E-MAIL NAS INFORMAÇÕES
    // =================================================

    if (infoEmail) {

        infoEmail.textContent = email;

    }


    // =================================================
    // TIPO DE CONTA
    // =================================================

    if (infoTipo) {

        if (usuario.tipo === "google") {

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
        nome.trim().charAt(0).toUpperCase() || "U";


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
// SAIR DA CONTA
// =====================================================

function sairDaConta(event) {

    if (event) {

        event.preventDefault();

    }


    localStorage.removeItem(
        "ecoFactoryLogado"
    );


    window.location.href =
        "index.html";

}


// =====================================================
// BOTÃO SAIR DA SIDEBAR
// =====================================================

if (logout) {

    logout.addEventListener(
        "click",
        sairDaConta
    );

}


// =====================================================
// BOTÃO SAIR DO PERFIL
// =====================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        sairDaConta
    );

}

