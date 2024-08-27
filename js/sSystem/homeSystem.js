if (localStorage.getItem('isAuthenticated') !== 'true') {                     // Aqui é verificado se o usuário que acessou essa página está authenticado. Se não, ele é enviado par a tela de login do sistema
    window.location.href = '/pages/pagesWeb/login.html';
}

document.getElementById("botaoVoltarWeb").onclick = function() {
    window.location.href = "/pages/pagesWeb/home.html";
};










