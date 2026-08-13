const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mensagem =
    document.getElementById("mensagem");

const googleButton =
    document.getElementById("googleButton");


// ===============================
// MOSTRAR SENHA
// ===============================

mostrarSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";

        mostrarSenha.textContent = "🙈";

    } else {

        senha.type = "password";

        mostrarSenha.textContent = "👁";

    }

});


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailDigitado =
        email.value.trim().toLowerCase();

    const senhaDigitada =
        senha.value;


    // Busca usuário cadastrado
    const usuario =
        JSON.parse(
            localStorage.getItem("usuarioEcoFactory")
        );


    // Se não existe cadastro
    if (!usuario) {

        mensagem.textContent =
            "Nenhuma conta cadastrada. Crie uma conta primeiro.";

        mensagem.style.color = "#d93025";

        return;
    }


    // Verifica email
    if (emailDigitado !== usuario.email) {

        mensagem.textContent =
            "E-mail ou senha incorretos.";

        mensagem.style.color = "#d93025";

        return;
    }


    // Verifica senha
    if (senhaDigitada !== usuario.senha) {

        mensagem.textContent =
            "E-mail ou senha incorretos.";

        mensagem.style.color = "#d93025";

        return;
    }


    // ===============================
    // LOGIN CORRETO
    // ===============================

    localStorage.setItem(
        "ecoFactoryLogado",
        "true"
    );


    localStorage.setItem(
        "ecoFactoryNome",
        usuario.nome
    );


    mensagem.textContent =
        "Login realizado com sucesso!";

    mensagem.style.color = "#168a3c";


    // Vai para o dashboard
    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 700);

});


// ===============================
// GOOGLE
// ===============================

googleButton.addEventListener("click", function () {

    mensagem.textContent =
        "Login com Google ainda não está configurado.";

    mensagem.style.color = "#777";

});














