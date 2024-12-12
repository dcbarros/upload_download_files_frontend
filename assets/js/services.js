const baseUrl = 'http://localhost:8080';

export async function authentication(username, password) {
    const url = `${baseUrl}/auth/authenticate`;

    const credentials = btoa(`${username}:${password}`);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Token recebido:", data.token);

        if (!data.token) {
            throw new Error("Resposta inválida: token ausente.");
        }

        return data.token; 
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}

export async function upload(file) {
    const url = `${baseUrl}/file/upload`;
    const token = localStorage.getItem('authToken');
    
    if(!token){
        throw new Error('Token JWT ausente.')
    }

    const formData = new FormData();
    formData.append("file", file);
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, 
        });

        if (!response.ok) {
            throw new Error(`Erro ao fazer upload: ${response.status}`);
        }

        console.log(response.json())

    } catch (error) {
        console.error('Erro durante o upload do arquivo:', error);
        throw error;
    }

}

export async function dbArquivos() {
    const url = `${baseUrl}/file/allfiles`;
    const token = localStorage.getItem('authToken');

    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if(!response.ok){
            throw new Error('Erro ao buscar os dados');
        }
        const dados = await response.json();
        return dados;
    } catch (error) {
        return [];
    }
}
