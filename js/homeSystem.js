// Verifica se o usuário está autenticado
if (localStorage.getItem('isAuthenticated') !== 'true') {
    // Redireciona para a página de login se não estiver autenticado
    window.location.href = '/pages/pagesWeb/login.html';
}

// Função para preencher as informações do usuário
async function preencherInformacoesUsuario() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.acessoDeUsuario;
        const response = await fetch(`https://localhost:7237/api/UsuarioDoSistema/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro na solicitação');
        }
        const userData = await response.json();
        document.getElementById('user-name').textContent = userData.nomeCompleto;
        document.getElementById('user-username').textContent = userData.acessoDeUsuario;
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
    }
}

// Chama a função para preencher as informações do usuário quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', preencherInformacoesUsuario);

document.getElementById("botaoVoltarWeb").onclick = function() {
    window.location.href = "/pages/pagesWeb/home.html";
};
