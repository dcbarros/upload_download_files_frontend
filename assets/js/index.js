import { authentication } from './services.js';

const form = document.getElementById("forms");

form.addEventListener('submit', async (evento) => {
    evento.preventDefault(); 

    const loginInput = document.getElementById("exampleInputEmail1");
    const passwordInput = document.getElementById("exampleInputPassword1");

    const email = loginInput.value.trim();
    const senha = passwordInput.value.trim();

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {

        const token = await authentication(email, senha);

        alert("Autenticação bem-sucedida!");
        // console.log("Token recebido:", token);

        localStorage.setItem('authToken', token);

        window.location.href = "downloadUp.html";
        form.reset(); 
    } catch (error) {
        alert(`Erro ao autenticar: ${error.message}`);
        // console.error("Erro:", error);
    }
});
