javascript
// =====================================================
// ECOFACTORY - CADASTRO
// =====================================================


// =====================================================
// ELEMENTOS
// =====================================================

const cadastroForm = document.getElementById("cadastroForm");

const senha = document.getElementById("senha");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mostrarConfirmacao =
    document.getElementById("mostrarConfirmacao");

const mensagem =
    document.getElementById("mensagem");


// =====================================================
// MOSTRAR / ESCONDER SENHA
// =====================================================

if (mostrarSenha) {

    mostrarSenha.addEventListener("click", function () {

        if (senha.type === "password") {

            senha.type = "text";
            mostrarSenha.textContent = "🙈";

        } else {

            senha.type = "password";
            mostrarSenha.textContent = "👁";

        }

    });

}


// =====================================================
// MOSTRAR / ESCONDER CONFIRMAÇÃO
// =====================================================

if (mostrarConfirmacao) {

    mostrarConfirmacao.addEventListener("click", function () {

        if (confirmarSenha.type === "password") {

            confirmarSenha.type = "text";
            mostrarConfirmacao.textContent = "🙈";

        } else {

            confirmarSenha.type = "password";
            mostrarConfirmacao.textContent = "👁";

        }

    });

}


// =====================================================
// CADASTRO
// =====================================================

if (cadastroForm) {

    cadastroForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // =================================================
        // PEGAR DADOS
        // =================================================

        const nomeInput =
            document.getElementById("nome");

        const emailInput =
            document.getElementById("email");

        const termosInput =
            document.getElementById("termos");


        const nome =
            nomeInput.value.trim();

        const email =
            emailInput.value.trim().toLowerCase();

        const senhaValor =
            senha.value;

        const confirmarSenhaValor =
            confirmarSenha.value;

        const termos =
            termosInput.checked;


        // =================================================
        // LIMPAR MENSAGEM
        // =================================================

        mensagem.textContent = "";
        mensagem.style.color = "";


        // =================================================
        // VALIDAR NOME
        // =================================================

        if (nome === "") {

            mensagem.textContent =
                "Digite seu nome.";

            mensagem.style.color =
                "#d93025";

            nomeInput.focus();

            return;
        }


        // =================================================
        // VALIDAR E-MAIL
        // =================================================

        if (email === "") {

            mensagem.textContent =
                "Digite seu e-mail.";

            mensagem.style.color =
                "#d93025";

            emailInput.focus();

            return;
        }


        // =================================================
        // VALIDAR SENHA
        // =================================================

        if (senhaValor.length < 6) {

            mensagem.textContent =
                "A senha deve ter pelo menos 6 caracteres.";

            mensagem.style.color =
                "#d93025";

            senha.focus();

            return;
        }


        // =================================================
        // CONFIRMAR SENHA
        // =================================================

        if (senhaValor !== confirmarSenhaValor) {

            mensagem.textContent =
                "As senhas não são iguais.";

            mensagem.style.color =
                "#d93025";

            confirmarSenha.focus();

            return;
        }


        // =================================================
        // TERMOS
        // =================================================

        if (!termos) {

            mensagem.textContent =
                "Aceite os termos para continuar.";

            mensagem.style.color =
                "#d93025";

            return;
        }


        // =================================================
        // ENVIAR PARA O POSTGRESQL
        // =================================================

        try {

            const resposta = await fetch(
                "http://localhost:3000/api/usuarios",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        nome: nome,

                        email: email,

                        senha: senhaValor

                    })
                }
            );


            const dados =
                await resposta.json();


            // =================================================
            // VERIFICAR ERRO
            // =================================================

            if (!resposta.ok) {

                mensagem.textContent =
                    dados.mensagem ||
                    "Erro ao criar a conta.";

                mensagem.style.color =
                    "#d93025";

                return;
            }


            // =================================================
            // USUÁRIO CRIADO
            // =================================================

            const usuario = dados.usuario;


            // =================================================
            // SALVAR DADOS PARA O PERFIL
            // =================================================

            localStorage.setItem(
                "ecoFactoryUsuario",
                JSON.stringify(usuario)
            );

            localStorage.setItem(
                "ecoFactoryNome",
                usuario.nome
            );

            localStorage.setItem(
                "ecoFactoryEmail",
                usuario.email
            );


            // =================================================
            // NÃO DEIXAR LOGADO AUTOMATICAMENTE
            // =================================================

            localStorage.removeItem(
                "ecoFactoryLogado"
            );


            // =================================================
            // MENSAGEM
            // =================================================

            mensagem.textContent =
                "Conta criada com sucesso!";

            mensagem.style.color =
                "#2E7D32";


            // =================================================
            // DESABILITAR BOTÃO
            // =================================================

            const botao =
                cadastroForm.querySelector(
                    'button[type="submit"]'
                );


            if (botao) {

                botao.disabled = true;

                botao.textContent =
                    "Conta criada...";

            }


            // =================================================
            // IR PARA LOGIN
            // =================================================

            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1000);


        } catch (erro) {

            console.error(
                "Erro no cadastro:",
                erro
            );


            mensagem.textContent =
                "Não foi possível conectar ao servidor. " +
                "Verifique se o backend está funcionando.";

            mensagem.style.color =
                "#d93025";

        }

    });

}

