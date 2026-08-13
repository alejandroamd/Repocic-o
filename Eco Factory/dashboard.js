// ==========================================
// ECOFACTORY - DASHBOARD
// ==========================================


// ==========================================
// 1. VERIFICAR LOGIN
// ==========================================

const usuarioLogado =
    localStorage.getItem("ecoFactoryLogado");

if (usuarioLogado !== "true") {

    window.location.href = "index.html";

}


// ==========================================
// 2. PEGAR DADOS DO USUÁRIO
// ==========================================

const nomeUsuario =
    localStorage.getItem("ecoFactoryNome") || "Usuário";

const emailUsuario =
    localStorage.getItem("ecoFactoryEmail") || "";


// ==========================================
// 3. MOSTRAR NOME DO USUÁRIO
// ==========================================

// Seu HTML usa id="userName"
const nomeElement =
    document.getElementById("userName");

if (nomeElement) {

    nomeElement.textContent = nomeUsuario;

}


// ==========================================
// 4. MOSTRAR PRIMEIRA LETRA NO AVATAR
// ==========================================

const avatar =
    document.getElementById("userAvatar");

if (avatar) {

    const primeiraLetra =
        nomeUsuario.charAt(0).toUpperCase();

    avatar.textContent =
        primeiraLetra;

}


// ==========================================
// 5. DATA ATUAL
// ==========================================

const dataElement =
    document.getElementById("dataAtual");

if (dataElement) {

    const hoje = new Date();

    dataElement.textContent =
        hoje.toLocaleDateString("pt-BR");

}


// ==========================================
// 6. MENU LATERAL
// ==========================================

const menuItems =
    document.querySelectorAll(".menu-item");

menuItems.forEach(function(item) {

    item.addEventListener("click", function(event) {

        // Não altera o menu do botão Sair
        if (item.id === "logout") {
            return;
        }

        // Remove active de todos
        menuItems.forEach(function(menu) {

            menu.classList.remove("active");

        });

        // Adiciona active no clicado
        item.classList.add("active");

    });

});


// ==========================================
// 7. LOGOUT
// ==========================================

const logout =
    document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", function(event) {

        event.preventDefault();

        // Apaga sessão
        localStorage.removeItem(
            "ecoFactoryLogado"
        );

        localStorage.removeItem(
            "ecoFactoryNome"
        );

        localStorage.removeItem(
            "ecoFactoryEmail"
        );

        // Volta para login
        window.location.href =
            "index.html";

    });

}


// ==========================================
// 8. ANIMAÇÃO DOS CARDS
// ==========================================

const cards =
    document.querySelectorAll(".card");

cards.forEach(function(card, index) {

    card.style.opacity = "0";
    card.style.transform = "translateY(10px)";

    setTimeout(function() {

        card.style.transition =
            "0.4s ease";

        card.style.opacity = "1";
        card.style.transform =
            "translateY(0)";

    }, index * 100);

});


// ==========================================
// 9. ANIMAÇÃO DAS BARRAS
// ==========================================

const progressBars =
    document.querySelectorAll(".progress div");

progressBars.forEach(function(bar) {

    const largura =
        bar.style.width;

    bar.style.width = "0";

    setTimeout(function() {

        bar.style.transition =
            "width 1s ease";

        bar.style.width =
            largura;

    }, 300);

});


// ==========================================
// 10. LOG
// ==========================================

console.log(
    "EcoFactory Dashboard carregado."
);

console.log(
    "Usuário:",
    nomeUsuario
);

console.log(
    "E-mail:",
    emailUsuario
);