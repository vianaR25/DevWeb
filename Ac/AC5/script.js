document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectSelect = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const fileInput = document.getElementById("file");
    const submitButton = document.getElementById("submitButton");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const successMessage = document.getElementById("successMessage");
    const filePreview = document.getElementById("filePreview");

    // Função para habilitar/desabilitar o botão de envio
    const checkFormValidity = () => {
        submitButton.disabled = !(
            nameInput.value.trim() &&
            emailInput.validity.valid &&
            phoneInput.value.trim() &&
            subjectSelect.value &&
            messageInput.value.trim().length >= 100
        );
    };

    // 1. Acessar os valores dos inputs do formulário
    form.addEventListener("input", checkFormValidity);

    // 2. Atualizar o conteúdo da página ao digitar nos campos
    nameInput.addEventListener("input", () => {
        document.querySelector("h1").innerText = `Seja Bem-Vindo, ${nameInput.value}`;
    });

    // 3. Validar entradas do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!emailInput.validity.valid) {
            emailInput.classList.add("invalid");
            alert("Email inválido");
            return;
        }
        if (messageInput.value.trim().length < 100) {
            messageInput.classList.add("invalid");
            alert("A mensagem deve ter pelo menos 100 caracteres.");
            return;
        }
        emailInput.classList.remove("invalid");
        messageInput.classList.remove("invalid");
        
        // 6. Mostrar spinner de carregamento
        loadingSpinner.style.display = "block";

        // 7. Exibir mensagem de sucesso e redirecionar
        setTimeout(() => {
            loadingSpinner.style.display = "none";
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
                form.reset();
                window.location.href = "https://youtu.be/Ud2JlYL_zfw";
            }, 2000);
        }, 1000);
    });

    // 4. Redefinir o formulário após o envio
    form.addEventListener("reset", () => {
        filePreview.innerHTML = "";
    });

    // 8. Validar tamanho da mensagem
    messageInput.addEventListener("input", () => {
        messageInput.classList.toggle("invalid", messageInput.value.length < 100);
        checkFormValidity();
    });

    // 9. Feedback visual para campos inválidos
    const addInvalidClass = (input) => input.classList.add("invalid");
    const removeInvalidClass = (input) => input.classList.remove("invalid");

    [nameInput, emailInput, phoneInput, subjectSelect, messageInput].forEach((input) => {
        input.addEventListener("input", () => {
            input.classList.remove("invalid");
        });
        input.addEventListener("invalid", () => addInvalidClass(input));
    });

    // 10. Máscara para o campo de telefone
    phoneInput.addEventListener("input", (event) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length >= 11) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        } else if (value.length >= 6) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else if (value.length >= 2) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
    });

    // 11. Exibir mensagem de erro se nenhum assunto for selecionado
    subjectSelect.addEventListener("change", () => {
        subjectSelect.classList.toggle("invalid", !subjectSelect.value);
        checkFormValidity();
    });

    // 12. Pré-visualização do arquivo de imagem selecionado
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Pré-visualização da Imagem" width="100">`;
            };
            reader.readAsDataURL(file);
        } else {
            filePreview.innerHTML = "";
        }
    });
});
