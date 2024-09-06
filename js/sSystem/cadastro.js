function showForm(formId, cardElement) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(formId).style.display = 'block';

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });

    cardElement.classList.add('active');

}

function showInitialForm() {
    const initialCard = document.querySelector('.card');
    showForm('cadastroPaciente', initialCard); 
}
window.onload = showInitialForm;

//#region  [Cadastro Dentista]
///// Aqui será buscado do banco todos os enderecos disponíveis para associar a um Dentista /////
// document.addEventListener("DOMContentLoaded", function() {
//     const selectElement = document.getElementById("endereco-select");
//     let enderecosCarregados = false;

//     selectElement.addEventListener("click", function() {
//         // Verifica se os endereços já foram carregados
//         if (enderecosCarregados) return;

//         fetch("https://localhost:7237/api/Paciente")
//             .then(response => response.json())
//             .then(data => {
//                 data.forEach(endereco => {
//                     const option = document.createElement("option");
//                     option.value = endereco.id;
//                     option.textContent = endereco.descricao;
//                     selectElement.appendChild(option);
//                 });
//                 enderecosCarregados = true;
//             })
//             .catch(error => {
//                 console.error("Erro ao carregar os endereços:", error);
//             });
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    const selectElement = document.getElementById("endereco-select");
    let enderecosCarregados = false;

    selectElement.addEventListener("click", function() {
        if (enderecosCarregados) return;

        fetch("https://localhost:7237/api/Endereco")
            .then(response => response.json())
            .then(result => {
                const { data, errors } = result;

                if (errors && errors.length > 0) {
                    console.error("Erros retornados pela API:", errors);
                    return;
                }

                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(endereco => {
                        const option = document.createElement("option");
                        option.value = endereco.id;
                        option.textContent = endereco.descricao;
                        selectElement.appendChild(option);
                    });
                } else {
                    console.error("Nenhum endereço foi retornado.");
                }
                enderecosCarregados = true;
            })
            .catch(error => {
                console.error("Erro ao carregar os endereços:", error);
            });
    });
});

function limpa_formulario_dentista() {
    // Limpa valores do formulário de cep.
    document.getElementById('nomeDentista').value = ("");
    document.getElementById('dataDeNascimento').value = ("");
    document.getElementById('sobreNomeDentista').value = ("");
    document.getElementById('CPFDentista').value = ("");
    document.getElementById('emailDentista').value = ("");
    document.getElementById('numeroDeTelefoneDentista').value = ("");
    document.getElementById('especializacaoDentista').value = ("");
    document.getElementById('numeroDeRegistro').value = ("");
    document.getElementById('endereco-select').value = ("");
}

document.getElementById('cadastro-dentista-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeDentista').value;
    const dataDeNascimento = document.getElementById('dataDeNascimento').value;
    const sobreNome = document.getElementById('sobreNomeDentista').value;
    const cpf = document.getElementById('CPFDentista').value;
    const email = document.getElementById('emailDentista').value;
    const numeroDeTelefone = document.getElementById('numeroDeTelefoneDentista').value;
    const especializacao = document.getElementById('especializacaoDentista').value;
    const numeroDeRegistro = document.getElementById('numeroDeRegistro').value;
    const idEndereco = document.getElementById('endereco-select').value;

    const dentista = {
        nome: nome,
        dataDeNascimento: dataDeNascimento,
        sobreNome: sobreNome,
        cpf: cpf,
        email: email,
        numeroDeTelefone: numeroDeTelefone,
        especializacao: especializacao,
        numeroDeRegistro: numeroDeRegistro,
        idEndereco: idEndereco
    }

    fetch('https://localhost:7237/api/Dentista', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dentista)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                const error = new Error(`Erro na requisição: ${response.status}`);
                error.data = data;
                throw error;
            }
            return data;
        })
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data); 
        limpa_formulario_dentista();
    })
    .catch(error => {
        console.error('Erro:', error.data.errors || error.message);
    });
})

//#endregion

//#region [Cadastro Endereco]
function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    document.getElementById('CEPEndereco').value = ("");
    document.getElementById('ruaEndereco').value = ("");
    document.getElementById('numeroEndereco').value = ("");
    document.getElementById('bairroEndereco').value = ("");
    document.getElementById('cidadeEndereco').value = ("");
    document.getElementById('estadoEndereco').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        // Atualiza os campos com os valores.
        document.getElementById('ruaEndereco').value = (conteudo.logradouro);
        document.getElementById('bairroEndereco').value = (conteudo.bairro);
        document.getElementById('cidadeEndereco').value = (conteudo.localidade);
        document.getElementById('estadoEndereco').value = (conteudo.uf);
    } else {
        // CEP não Encontrado.
        limpa_formulário_cep();
        document.getElementById('cep-error').textContent = 'O CEP informado não é válido';
    }
}


function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep != "") {
        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {

            // Cria um elemento javascript.
            var script = document.createElement('script');

            // Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            // Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
            document.getElementById('cep-error').textContent = '';
            // document.getElementById('CEPEndereco').style.border = ' border: 1px solid #5271ff;';
        } else {
            // cep é inválido.
            limpa_formulário_cep();
            document.getElementById('cep-error').textContent = 'Formato de CEP inválido.';
        }
    } else {
        // cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

document.getElementById('cadastro-endereco-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.textContent = '';
    });

    const cep = document.getElementById('CEPEndereco').value;
    const rua = document.getElementById('ruaEndereco').value;
    const numero = document.getElementById('numeroEndereco').value;
    const bairro = document.getElementById('bairroEndereco').value;
    const cidade = document.getElementById('cidadeEndereco').value;
    const estado = document.getElementById('estadoEndereco').value;

    const endereco = {
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado
    };

    fetch('https://localhost:7237/api/Endereco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(endereco)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                const error = new Error('Erro na requisição');
                error.data = data;
                throw error;
            }
            return data;
        });
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        document.getElementById('CEPEndereco').style.border = '1px solid #ccc';
        document.getElementById('ruaEndereco').style.border = '1px solid #ccc;';
        document.getElementById('numeroEndereco').style.border = '1px solid #ccc';
        document.getElementById('bairroEndereco').style.border = '1px solid #ccc';
        document.getElementById('cidadeEndereco').style.border = '1px solid #ccc';
        document.getElementById('estadoEndereco').style.border = '1px solid #ccc';
        limpa_formulário_cep();

        // Exibir alerta de sucesso usando SweetAlert2
        Swal.fire({
            title: 'Sucesso!',
            text: 'Endereço cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Limpar mensagens de erro após sucesso (opcional)
        document.querySelectorAll('.error-message').forEach(function(span) {
            span.textContent = '';
        });
    })
    .catch(error => {
        if (error.data && error.data.errors) {
            error.data.errors.forEach(err => {
                // Exibir erro abaixo do campo correspondente
                if (err.includes('CEP')) {
                    document.getElementById('CEPEndereco').style.borderColor = 'red';
                    document.getElementById('numeroEndereco').style.borderColor = 'red';
                    document.getElementById('cep-error').textContent = err;
                } else if (err.includes('Rua')) {
                    document.getElementById('ruaEndereco').style.borderColor = 'red';
                    document.getElementById('rua-error').textContent = err;
                } else if (err.includes('Número')) {
                    document.getElementById('numeroEndereco').style.borderColor = 'red';
                    document.getElementById('numero-error').textContent = err;
                } else if (err.includes('Bairro')) {
                    document.getElementById('bairroEndereco').style.borderColor = 'red';
                    document.getElementById('bairro-error').textContent = err;
                } else if (err.includes('Cidade')) {
                    document.getElementById('cidadeEndereco').style.borderColor = 'red';
                    document.getElementById('cidade-error').textContent = err;
                } else if (err.includes('Estado')) {
                    document.getElementById('estadoEndereco').style.borderColor = 'red';
                    document.getElementById('estado-error').textContent = err;
                }
            });
        } else {
            console.error('Erro:', error.message);
        }
    });
});


//#endregion


