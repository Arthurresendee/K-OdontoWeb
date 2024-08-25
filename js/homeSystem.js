 // Verifica se o usuário está autenticado
 if (localStorage.getItem('isAuthenticated') !== 'true') {
    // Redireciona para a página de login se não estiver autenticado
    window.location.href = '/pages/pagesWeb/login.html';
}

document.getElementById("botaoVoltarWeb").onclick = function() {
    window.location.href = "/pages/pagesWeb/home.html";
};