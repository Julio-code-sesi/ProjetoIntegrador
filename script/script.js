// Função para criar o modal
function criarModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = fecharModal;

    const title = document.createElement('h2');
    title.textContent = 'Adicionar Nova Viagem';

    const form = document.createElement('form');
    form.id = 'form-adicao';

    const fields = [
        { label: 'Nome', type: 'text', id: 'nome' },
        { label: 'Telefone', type: 'text', id: 'telefone' },
        { label: 'CPF', type: 'text', id: 'cpf' },
        { label: 'Email', type: 'email', id: 'email' },
        { label: 'Origem', type: 'text', id: 'origem' },
        { label: 'Destino', type: 'text', id: 'destino' },
        { label: 'Número de Voo', type: 'text', id: 'numeroVoo' },
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.required = true;

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Cadastrar';
    button.onclick = adicionarViagem;

    form.appendChild(button);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Função para abrir o modal
function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function adicionarViagem() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const numeroVoo = document.getElementById("numeroVoo").value;

    const tabela = document.querySelector("table tbody");
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td style="background-color: #C6E0FF;">${nome}</td>
        <td style="background-color: #C6E0FF;">${telefone}</td>
        <td style="background-color: #C6E0FF;">${cpf}</td>
        <td style="background-color: #C6E0FF;">${email}</td>
        <td style="background-color: #C6E0FF;">${origem}</td>
        <td style="background-color: #C6E0FF;">${destino}</td>
        <td style="background-color: #C6E0FF;"><img src="img/Jõao.png" alt=""></td>
        <td style="background-color: #C6E0FF;">${numeroVoo}</td>
        <td style="background-color: #C6E0FF;">
            <img src="img/Edição.png" alt="Icone de edição" class="Editar action-btn" onclick="editarViagem(this)">
            <img src="img/Excluir.png" alt="Icone de excluir" class="Excluir action-btn" onclick="excluirViagem(this)">
        </td>
    `;

    // Enviar dados para o backend
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value; 
        const email = document.getElementById('email').value;
        const origem = document.getElementById('origem').value;
    
        // Criar um objeto com os dados do formulário
        const data = {
            cpf: cpf,
            aniver: aniver,
            email: email,
            senha: senha
        };
    
        try {
            // Configurações da requisição
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Converte os dados para JSON
            };
    
            const response = await fetch('http://localhost:8080/api/new', requestOptions);
    
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            const result = await response.text(); // Lê a resposta como texto
    
            // Ação após o cadastro
            alert(result); // Mostra a mensagem retornada pela API
            console.log('Dados do usuário:', result);
            
    
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Ocorreu um erro ao cadastrar. Tente novamente mais tarde.');
        }
    });
}



// Função para editar a viagem
function editarViagem(button) {
    const linha = button.parentElement.parentElement;
    const nome = linha.cells[0].innerText;
    const telefone = linha.cells[1].innerText;
    const cpf = linha.cells[2].innerText;
    const email = linha.cells[3].innerText;
    const origem = linha.cells[4].innerText;
    const destino = linha.cells[5].innerText;
    const numeroVoo = linha.cells[7].innerText;

    const novoNome = prompt("Editar Nome:", nome);
    if (novoNome) linha.cells[0].innerText = novoNome;

    const novoTelefone = prompt("Editar Telefone:", telefone);
    if (novoTelefone) linha.cells[1].innerText = novoTelefone;

    const novoCpf = prompt("Editar CPF:", cpf);
    if (novoCpf) linha.cells[2].innerText = novoCpf;

    const novoEmail = prompt("Editar Email:", email);
    if (novoEmail) linha.cells[3].innerText = novoEmail;

    const novaOrigem = prompt("Editar Origem:", origem);
    if (novaOrigem) linha.cells[4].innerText = novaOrigem;

    const novoDestino = prompt("Editar Destino:", destino);
    if (novoDestino) linha.cells[5].innerText = novoDestino;

    const novoNumeroVoo = prompt("Editar Número de Voo:", numeroVoo);
    if (novoNumeroVoo) linha.cells[7].innerText = novoNumeroVoo;
}

// Função para excluir a viagem
function excluirViagem(button) {
    const linha = button.parentElement.parentElement;
    const nome = linha.cells[0].innerText;
    if (confirm(`Tem certeza que deseja excluir a viagem de ${nome}?`)) {
        linha.remove();
        alert(`Viagem de ${nome} excluída com sucesso!`);
    }
}

// Chama a função para criar o modal ao carregar a página
window.onload = function() {
    criarModal();
};

  function applyFilter() {
            // Obtém o valor do campo de pesquisa
            let filter = document.getElementById('searchInput').value.toUpperCase();
            let table = document.getElementById('userTable');
            let rows = table.getElementsByTagName('tr');

            // Itera pelas linhas da tabela (exceto o cabeçalho)
            for (let i = 1; i < rows.length; i++) {
                let td = rows[i].getElementsByTagName('td')[0]; // Primeira coluna (Nome)
                if (td) {
                    let name = td.textContent || td.innerText;
                    // Exibe ou oculta a linha com base no filtro
                    if (name.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }

        function resetFilter() {
            // Limpa o campo de pesquisa
            document.getElementById('searchInput').value = '';
            let table = document.getElementById('userTable');
            let rows = table.getElementsByTagName('tr');

            // Exibe todas as linhas
            for (let i = 1; i < rows.length; i++) {
                rows[i].style.display = '';
            }
        }
