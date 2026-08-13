

const cadastroForm = document.getElementById("cadastroForm");

const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const mostrarSenha = document.getElementById("mostrarSenha");
const mostrarConfirmacao = document.getElementById("mostrarConfirmacao");

const mensagem = document.getElementById("mensagem");


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
// MOSTRAR CONFIRMAÇÃO
// ===============================

mostrarConfirmacao.addEventListener("click", function () {

    if (confirmarSenha.type === "password") {
        confirmarSenha.type = "text";
        mostrarConfirmacao.textContent = "🙈";
    } else {
        confirmarSenha.type = "password";
        mostrarConfirmacao.textContent = "👁";
    }

});


// ===============================
// CADASTRAR
// ===============================

cadastroForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const termos = document.getElementById("termos").checked;

    if (senha.value.length < 6) {

        mensagem.textContent =
            "A senha deve ter pelo menos 6 caracteres.";

        mensagem.style.color = "#d93025";

        return;
    }


    if (senha.value !== confirmarSenha.value) {

        mensagem.textContent =
            "As senhas não são iguais.";

        mensagem.style.color = "#d93025";

        return;
    }


    if (!termos) {

        mensagem.textContent =
            "Aceite os termos para continuar.";

        mensagem.style.color = "#d93025";

        return;
    }


    // Verifica se já existe usuário
    const usuarioExistente =
        JSON.parse(localStorage.getItem("usuarioEcoFactory"));

    if (
        usuarioExistente &&
        usuarioExistente.email === email
    ) {

        mensagem.textContent =
            "Este e-mail já está cadastrado.";

        mensagem.style.color = "#d93025";

        return;
    }


    // Salva usuário
    const usuario = {

        nome: nome,
        email: email,
        senha: senha.value

    };


    localStorage.setItem(
        "usuarioEcoFactory",
        JSON.stringify(usuario)
    );


    mensagem.textContent =
        "Conta criada com sucesso!";

    mensagem.style.color = "#168a3c";


    // Depois de 1 segundo vai para o login
    setTimeout(function () {

        window.location.href = "index.html";

    }, 1000);

});