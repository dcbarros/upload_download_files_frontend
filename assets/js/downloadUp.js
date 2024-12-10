import { upload } from "./services.js";

document.getElementById("uploadButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("formFileMultiple");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Por favor, selecione um arquivo para enviar.");
        return;
    }

    const file = files[0];
    const uploadButton = document.getElementById("uploadButton");
    uploadButton.textContent = "Enviando...";
    uploadButton.disabled = true;

    try {
        const response = await upload(file);
        alert("Arquivo enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
        alert("Erro ao enviar o arquivo. Consulte o console para mais detalhes.");
    } finally {
        uploadButton.textContent = "Enviar";
        uploadButton.disabled = false;
    }
});
