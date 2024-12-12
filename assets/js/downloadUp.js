import { upload, dbArquivos } from "./services.js";

const baseUrl = 'http://localhost:8080';

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

document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.getElementById("arquivos");

    try {
        const response = await dbArquivos();

        response.forEach(item => {
            const linha = document.createElement('tr');
            
            const celulaId = document.createElement('td');
            celulaId.textContent = item.id;
            linha.appendChild(celulaId);

            const celulaNome = document.createElement('td');
            celulaNome.textContent = item.fileName;
            linha.appendChild(celulaNome);

            const celulaTipo = document.createElement('td');
            celulaTipo.textContent = item.fileType;
            linha.appendChild(celulaTipo);

            const celulaUrl = document.createElement('td');
            const link = document.createElement('a');
            link.href = `${baseUrl}/file/download/${item.id}`;
            link.textContent = "Baixar";
            link.target = "_blank";
            celulaUrl.appendChild(link);
            linha.appendChild(celulaUrl);

            tbody.append(linha);
        });
    } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
    }
});

document.getElementById("logout").addEventListener("click", () =>{
    localStorage.clear();
    window.location.href = "index.html"; 
})
