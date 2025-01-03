document.getElementById("botao-nav-home").onclick = function() {
    window.location.href = "/pages/pagesSystem/homeSystem.html";
};

function showForm(formId, cardElement) {
    // Esconde todos os formulários
    document.querySelectorAll('.form-section').forEach(section => {
        section.style.display = 'none';
    });

    // Exibe o formulário correspondente ao card clicado
    document.getElementById(formId).style.display = 'block';

    // Remove a classe 'active' de todos os cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });

    // Adiciona a classe 'active' ao card clicado
    cardElement.classList.add('active');

    // Esconde todas as tabelas
    document.querySelectorAll('.tabela-section').forEach(section => {
        section.style.display = 'none';
    });

    // Exibe a tabela correspondente ao card clicado
    if (formId === 'cadastroPaciente') {
        document.getElementById('tabelaPacientesSection').style.display = 'block';
    } else if (formId === 'cadastroDentista') {
        document.getElementById('tabelaDentistasSection').style.display = 'block';
    } else if (formId === 'cadastroEndereco') {
        document.getElementById('tabelaEnderecosSection').style.display = 'block';
    }
}

// Exibir o primeiro formulário ao carregar a página (Paciente)
window.onload = function() {
    showForm('cadastroPaciente', document.querySelector('.card'));
};


// Exibir o primeiro formulário ao carregar a página (Paciente)
window.onload = function() {
    showForm('cadastroPaciente', document.querySelector('.card'));
}

// Exibir o primeiro formulário ao carregar a página (Paciente)
window.onload = function() {
    showForm('cadastroPaciente', document.querySelector('.card'));
};

function showInitialForm() {
    const initialCard = document.querySelector('.card');
    showForm('cadastroPaciente', initialCard); 
}
window.onload = showInitialForm;

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

document.addEventListener("DOMContentLoaded", function() {
    const selectElement = document.getElementById("endereco-selectPaciente");
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

document.addEventListener("DOMContentLoaded", function() {
    const selectElement = document.getElementById("dentista-selectPaciente");
    let dentistasCarregados = false; // Esta variável vai impedir o carregamento repetido

    selectElement.addEventListener("click", function() {
        if (dentistasCarregados) return; // Verifica se os dentistas já foram carregados
        fetch("https://localhost:7237/api/Dentista")
            .then(response => response.json())
            .then(result => {
                const { data, errors } = result;

                if (errors && errors.length > 0) {
                    console.error("Erros retornados pela API:", errors);
                    return;
                }

                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(dentista => {
                        const option = document.createElement("option");
                        option.value = dentista.id;
                        option.textContent = dentista.nome;
                        selectElement.appendChild(option);
                    });
                } else {
                    console.error("Nenhum dentista foi retornado.");
                }
                dentistasCarregados = true; // Atualiza a variável corretamente
            })
            .catch(error => {
                console.error("Erro ao carregar os dentistas:", error);
            });
    });
});

document.getElementById('cadastro-paciente-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.textContent = '';
    });

    // Coletar os valores do formulário
    const nomeCompleto = document.getElementById('nomeCompletoPaciente').value;
    const sexo = parseInt(document.getElementById('sexo-selectPaciente').value, 10); // Converter para número
    const dataNascimento = document.getElementById('dataNascimentoPaciente').value;
    const cpf = document.getElementById('cpfPaciente').value;
    const rg = document.getElementById('rgPaciente').value;
    const numeroDeTelefone = document.getElementById('numeroDeTelefonePaciente').value;
    const whatsapp = document.getElementById('whatsappPaciente').value;
    const telefone = document.getElementById('telefonePaciente').value;
    const email = document.getElementById('emailPaciente').value;
    const dentistaResponsavel = document.getElementById('dentista-selectPaciente').value;
    const endereco = document.getElementById('endereco-selectPaciente').value;

    // Verificar se o dentista foi selecionado
    if (!dentistaResponsavel) {
        document.getElementById('dentista-error').textContent = 'Por favor, selecione um dentista.';
        return;
    }

    // Objeto Paciente a ser enviado para a API
    const paciente = {
        nome: nomeCompleto,
        sexo: sexo, // Passar valor numérico
        dataDeNascimento: dataNascimento,
        cpf: cpf,
        rg: rg,
        numeroDeTelefone: numeroDeTelefone,
        whatsapp: whatsapp,
        telefone: telefone,
        email: email,
        idDentista: dentistaResponsavel,
        idEndereco: endereco
    };

    // Fazer a requisição POST para a API
    fetch('https://localhost:7237/api/Paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
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
        console.log('Paciente cadastrado com sucesso:', data);

        // Resetar o formulário e mensagens de erro após o sucesso
        document.getElementById('cadastro-paciente-form').reset();
        document.querySelectorAll('.error-message').forEach(function(span) {
            span.textContent = '';
        });

        // Exibir alerta de sucesso usando SweetAlert2
        Swal.fire({
            title: 'Sucesso!',
            text: 'Paciente cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    })
    .catch(error => {
        console.error('Erro:', error.data?.errors || error.message);
        if (error.data && error.data.errors) {
            error.data.errors.forEach(err => {
                // Exibir erro abaixo do campo correspondente
                if (err.includes('Nome completo')) {
                    document.getElementById('nomeCompletoPaciente').style.borderColor = 'red';
                    document.getElementById('nomeCompletoPaciente').focus();
                    document.getElementById('nome-error').textContent = err;
                } else if (err.includes('Sexo')) {
                    document.getElementById('sexo-selectPaciente').style.borderColor = 'red';
                    document.getElementById('sexo-error').textContent = err;
                } else if (err.includes('Data de Nascimento')) {
                    document.getElementById('dataNascimentoPaciente').style.borderColor = 'red';
                    document.getElementById('dataNascimento-error').textContent = err;
                } else if (err.includes('CPF')) {
                    document.getElementById('cpfPaciente').style.borderColor = 'red';
                    document.getElementById('cpf-error').textContent = err;
                } else if (err.includes('RG')) {
                    document.getElementById('rgPaciente').style.borderColor = 'red';
                    document.getElementById('rg-error').textContent = err;
                } else if (err.includes('Telefone')) {
                    document.getElementById('numeroDeTelefonePaciente').style.borderColor = 'red';
                    document.getElementById('numero-error').textContent = err;
                } else if (err.includes('WhatsApp')) {
                    document.getElementById('whatsappPaciente').style.borderColor = 'red';
                    document.getElementById('whatsapp-error').textContent = err;
                } else if (err.includes('Email')) {
                    document.getElementById('emailPaciente').style.borderColor = 'red';
                    document.getElementById('email-error').textContent = err;
                } else if (err.includes('Dentista')) {
                    document.getElementById('dentista-selectPaciente').style.borderColor = 'red';
                    document.getElementById('dentista-error').textContent = err;
                } else if (err.includes('Endereço')) {
                    document.getElementById('endereco-selectPaciente').style.borderColor = 'red';
                    document.getElementById('endereco-error').textContent = err;
                }
            });
        }
    });
});


function resetarOsEstilosDosInputsDeDentista() {
    document.getElementById('nomeDentista').style.border = '1px solid #ccc';
    document.getElementById('dataDeNascimento').style.border = '1px solid #ccc';
    document.getElementById('sobreNomeDentista').style.border = '1px solid #ccc';
    document.getElementById('CPFDentista').style.border = '1px solid #ccc';
    document.getElementById('emailDentista').style.border = '1px solid #ccc';
    document.getElementById('numeroDeTelefoneDentista').style.border = '1px solid #ccc';
    document.getElementById('especializacaoDentista').style.border = '1px solid #ccc';
    document.getElementById('numeroDeRegistro').style.border = '1px solid #ccc';
    document.getElementById('endereco-select').style.border = '1px solid #ccc';
}

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
    
    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.textContent = '';
    });

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
    };

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
                const error = new Error('Erro na requisição');
                error.data = data;
                throw error;
            }
            return data;
        });
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        
        // Resetar o estilo dos campos após sucesso
        resetarOsEstilosDosInputsDeDentista();
        limpa_formulario_dentista(); // Limpar formulário após sucesso

        // Exibir alerta de sucesso usando SweetAlert2
        Swal.fire({
            title: 'Sucesso!',
            text: 'Dentista cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

    })
    .catch(error => {
        resetarOsEstilosDosInputsDeDentista();
        if (error.data && error.data.errors) {
            console.error('Erro:', error.data.errors || error.message);
            error.data.errors.forEach(err => {
                // Exibir erro abaixo do campo correspondente
                if (err.includes('Nome')) {
                    document.getElementById('nomeDentista').style.borderColor = 'red';
                    document.getElementById('nomeDentista-error').textContent = err;
                } else if (err.includes('Data de Nascimento')) {
                    document.getElementById('dataDeNascimento').style.borderColor = 'red';
                    document.getElementById('dataDeNascimento-error').textContent = err;
                } else if (err.includes('Sobrenome')) {
                    document.getElementById('sobreNomeDentista').style.borderColor = 'red';
                    document.getElementById('sobreNomeDentista-error').textContent = err;
                } else if (err.includes('CPF')) {
                    document.getElementById('CPFDentista').style.borderColor = 'red';
                    document.getElementById('CPFDentista-error').textContent = err;
                } else if (err.includes('Email')) {
                    document.getElementById('emailDentista').style.borderColor = 'red';
                    document.getElementById('emailDentista-error').textContent = err;
                } else if (err.includes('Celular')) {
                    document.getElementById('numeroDeTelefoneDentista').style.borderColor = 'red';
                    document.getElementById('numeroDeTelefoneDentista-error').textContent = err;
                } else if (err.includes('Especialização')) {
                    document.getElementById('especializacaoDentista').style.borderColor = 'red';
                    document.getElementById('especializacaoDentista-error').textContent = err;
                } else if (err.includes('Número de Registro')) {
                    document.getElementById('numeroDeRegistro').style.borderColor = 'red';
                    document.getElementById('numeroDeRegistroDentista-error').textContent = err;
                } else if (err.includes('Endereço')) {
                    document.getElementById('endereco-select').style.borderColor = 'red';
                    document.getElementById('endereco-select-error').textContent = err;
                }
            });
        } else {
            console.error('Erro:', error.message);
        }
    });
});


function limpa_formulario_dentista() {
    document.getElementById('cadastro-dentista-form').reset();
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.textContent = '';
    });
}


//#endregion

//#region [Cadastro Endereco]
function resetarOsEstilosDosInputsDeEndereco() {
    document.getElementById('CEPEndereco').style.border = '1px solid #ccc';
    document.getElementById('ruaEndereco').style.border = '1px solid #ccc;';
    document.getElementById('numeroEndereco').style.border = '1px solid #ccc';
    document.getElementById('bairroEndereco').style.border = '1px solid #ccc';
    document.getElementById('cidadeEndereco').style.border = '1px solid #ccc';
    document.getElementById('estadoEndereco').style.border = '1px solid #ccc';
}

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
        resetarOsEstilosDosInputsDeEndereco();
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
        resetarOsEstilosDosInputsDeDentista();
        if (error.data && error.data.errors) {
            console.error('Erro:', error.data.errors || error.message);
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
document.getElementById('buscar-por-cep').addEventListener('click', function() {
    const cep = document.getElementById('cep-input').value;
    let url = 'https://localhost:7237/api/Endereco';

    // Se um CEP for fornecido, adicionar à URL
    if (cep) {
        url += `/cep/${cep}`;
    }

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar endereços.');
        }
        return response.json();
    })
    .then(data => {
        const tabelaBody = document.querySelector('#tabela-enderecos tbody');
        tabelaBody.innerHTML = ''; // Limpar a tabela antes de preencher

        if (data && data.data && data.data.length > 0) {
            data.data.forEach(endereco => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${endereco.cep}</td>
                    <td>${endereco.rua}</td>
                    <td>${endereco.numero}</td>
                    <td>${endereco.bairro}</td>
                    <td>${endereco.cidade}</td>
                    <td>${endereco.estado}</td>
                    <td>${endereco.descricao}</td>
                `;
                tabelaBody.appendChild(row);
            });
        } else {
            tabelaBody.innerHTML = '<tr><td colspan="8">Nenhum endereço encontrado</td></tr>';
        }
    })
    .catch(error => {
        console.error('Erro ao buscar endereços:', error);
        const tabelaBody = document.querySelector('#tabela-enderecos tbody');
        tabelaBody.innerHTML = '<tr><td colspan="8">Erro ao buscar endereços</td></tr>';
    });
});

//#endregion


