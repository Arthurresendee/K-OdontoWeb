document.getElementById("meu-botao").onclick = function() {
    window.location.href = "../html/home.html";
};

async function loginUser(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('https://localhost:7237/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, senha })
    });

    const data = await response.json();
    if (data.success) {
        console.log('Login bem-sucedido');

    } else if (!data.success){
        alert("Usuário ou senha incorreto!")
    }

}

document.getElementById('form-login').addEventListener('submit', loginUser);
