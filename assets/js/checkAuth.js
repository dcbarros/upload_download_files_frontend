function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert("Você precisa estar autenticado para acessar esta página.");
        window.location.href = "index.html"; 
    }
}

checkAuthentication();