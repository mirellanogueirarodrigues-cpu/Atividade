document.addEventListener("DOMContentLoaded", function () {
    
    // --- LÓGICA DA TELA DE CADASTRO/LOGIN ---
    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", function (e) {
            e.preventDefault(); // Impede o recarregamento padrão da página
            
            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmar-senha").value;

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem. Tente novamente.");
                return;
            }

            // Armazena o nome inserido para usar futuramente caso queira personalizar
            localStorage.setItem("nomeAluno", document.getElementById("nome").value);
            
            // Redireciona para a página do blog
            window.location.href = "blog.html";
        });
    }

    // --- LÓGICA DO QUIZ DINÂMICO ---
    const btnStartQuiz = document.getElementById("btn-start-quiz");
    const quizStart = document.getElementById("quiz-start");
    const quizContainer = document.getElementById("quiz-container");
    const btnNext = document.getElementById("btn-next");
    const quizResult = document.getElementById("quiz-result");

    let currentQuestion = 1;
    let score = 0;
    const totalQuestions = 6;

    if (btnStartQuiz) {
        btnStartQuiz.addEventListener("click", function () {
            quizStart.classList.add("hidden");
            quizContainer.classList.remove("hidden");
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", function () {
            // Verifica se o usuário escolheu uma opção para a pergunta atual
            const selectedOption = document.querySelector(`input[name="p${currentQuestion}"]:checked`);
            
            if (!selectedOption) {
                alert("Por favor, selecione uma resposta antes de continuar!");
                return;
            }

            // Se estiver correto, soma pontuação
            if (selectedOption.value === "correct") {
                score++;
            }

            // Oculta pergunta atual
            document.getElementById(`q${currentQuestion}`).classList.add("hidden");

            // Avança ou Finaliza
            if (currentQuestion < totalQuestions) {
                currentQuestion++;
                // Mostra a próxima pergunta
                document.getElementById(`q${currentQuestion}`).classList.remove("hidden");
                
                // Se for a última pergunta, muda o texto do botão
                if (currentQuestion === totalQuestions) {
                    btnNext.textContent = "Ver Resultado";
                }
            } else {
                // Fim do quiz: exibe o resultado final de acordo com a pontuação
                quizContainer.classList.add("hidden");
                quizResult.classList.remove("hidden");

                let feedbackHTML = "";

                if (score === 6) {
                    feedbackHTML = `
                        <h2>🏆 Parabéns!</h2>
                        <p class="score-text">Você acertou ${score} de ${totalQuestions} questões.</p>
                        <p>Você domina o Barroco e conhece muito bem Gregório de Matos.</p>
                    `;
                } else if (score >= 4) {
                    feedbackHTML = `
                        <h2>👏 Muito bom!</h2>
                        <p class="score-text">Você acertou ${score} de ${totalQuestions} questões.</p>
                        <p>Continue estudando para alcançar a pontuação máxima.</p>
                    `;
                } else {
                    feedbackHTML = `
                        <h2>📚 Que tal revisar?</h2>
                        <p class="score-text">Você acertou ${score} de ${totalQuestions} questões.</p>
                        <p>Dê mais uma olhada no conteúdo do blog e tente novamente para melhorar sua nota!</p>
                    `;
                }

                feedbackHTML += `<br><a href="quiz.html" class="btn-main" style="text-decoration:none; display:inline-block;">Refazer Quiz</a>`;
                quizResult.innerHTML = feedbackHTML;
            }
        });
    }
});