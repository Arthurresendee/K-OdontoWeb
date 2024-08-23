 // Verifica se o usuário está autenticado
 if (localStorage.getItem('isAuthenticated') !== 'true') {
    // Redireciona para a página de login se não estiver autenticado
    window.location.href = '/html/login.html';
}

document.getElementById("botaoVoltarWeb").onclick = function() {
    window.location.href = "/html/home.html";
};