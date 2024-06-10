const exibeContatos = () => {
    const tabela = document.getElementById('idTabelaContatos'); //pega a tabela
    const tbody = tabela.querySelector('tbody'); //pega o corpo da tabela
 
    tbody.innerHTML =
        `<tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Contato</th>
            <th>Editar</th>
            <th>Excluir</th>
        </tr>`;
 
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
 
    contatos.forEach((contato, index) => {
        const conteudoContato =
            `<tr>
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>${contato.telefone}</td>
                <td><button class="btnEditar" onclick="editaContato(${index})"><i class="fa fa-edit"></i></button></td>
                <td><button class="btnExcluir" onclick="deletaContato(${index})"><i class="fa fa-trash"></i></button></td>
            </tr>`;
 
        const row = tbody.insertRow();
        row.innerHTML = conteudoContato;
    });
 
}
 
const addContato = (event) => {
    event.preventDefault();
    let form = document.getElementById('idContatoForm');
    let nome = document.getElementById('idNome').value.trim();
    let sobrenome = document.getElementById('idSobrenome').value.trim();
    let telefone = document.getElementById('idTel').value.trim();
    let tipoTel = document.getElementById('idTelTipo').value;
    let email = document.getElementById('idEmail').value.trim();
    let camposVazios = [];
 
    if(nome == "") {
        camposVazios.push("Nome");
    }
 
    if(sobrenome == "") {
        camposVazios.push("Sobrenome");
    }
 
    telefone == "" ? camposVazios.push("Telefone") : '';
 
    tipoTel == "" ? camposVazios.push("Tipo de telefone") : '';
   
    email == "" ? camposVazios.push("Email") : "";  
 
    if(nome == "" || sobrenome == "" || telefone == "" || tipoTel == "" || email == ""){
       
        alert("Por favor, preencha todos os campos! " + camposVazios);
    }else {
        const contato = { //criando um objeto para armazenar os dados
            nome: nome,
            sobrenome: sobrenome,
            telefone: telefone,
            tipoTel: tipoTel,
            email: email
        }
       
        //buscar os contatos já salvos OU criar um array vazio
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
       
        contatos.push(contato); //adiciona um novo CONTATO dentro da lista CONTATOS
        localStorage.setItem('contatos', JSON.stringify(contatos));
 
        form.reset();
        exibeContatos();
    }
 
}
 
//função para cancelar e limpar o formulário
const cancelaForm = (event) => {
    event.preventDefault(); //impede o comportamento do botão, enviar o formulario
    document.getElementById('idContatoForm').reset(); //limpa o formulario
}
 
const deletaContato = (index) => {
    //pega a lista de contatos
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
   
    //removo o item da lista CONTATOS pelo index, o numero 1 significa que ele deve  
    //remover apenas 1 elemento da lista
    contatos.splice(index, 1);
 
    localStorage.setItem('contatos', JSON.stringify(contatos));
    exibeContatos();
}
 
const editaContato = (index) => {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const contato = contatos[index];
 
    document.getElementById('idNome').value = contato.nome;
    document.getElementById('idSobrenome').value = contato.sobrenome;
    document.getElementById('idTel').value = contato.telefone;
    document.getElementById('idTelTipo').value = contato.telTipo;
    document.getElementById('idEmail').value = contato.email;
 
    const atualizaContato = (event) => {
        event.preventDefault();
 
        contato.nome = document.getElementById('idNome').value.trim();
        contato.sobrenome = document.getElementById('idSobrenome').value.trim();
        contato.telefone = document.getElementById('idTel').value.trim();
        contato.telTipo = document.getElementById('idTelTipo').value.trim();
        contato.email = document.getElementById('idEmail').value.trim();
 
        const upContato = JSON.stringify(contatos);
        localStorage.getItem('contatos', upContato);

        exibeContatos();
        document.getElementById('idContatoForm').reset();
 
        document.querySelector('.btnSalvar').removeEventListener('click', atualizaContato);
        document.querySelector('.btnSalvar').addEventListener('click', addContato);
    }
    document.querySelector('.btnSalvar').removeEventListener('click', addContato );
        document.querySelector('.btnSalvar').addEventListener('click', atualizaContato);
}
    const Buscacontato= () => {
        const BarraPesquisa = document.getElementById('idPesquisa').value.trim().toLowerCase();
        const tabela = document.getElementById('idTabelaContatos');
        const linhas = tabela.getElementsByTagName('tr');
        const quantidadeLinhas = linhas.length;

        for (let i = 0; i < quantidadeLinhas; i++){
            const celulas = linhas[i].getElementsByTagName('td');
            const quantidadeCelulas = celulas.length;
            let busca = false;

            for(let j = 0; j < quantidadeCelulas; j++){
                const textoCelulas = celulas[j].textContent.toLocaleLowerCase();
                if(textoCelulas.includes(BarraPesquisa)){
                    busca = true;
                    break;
                }
            }
            busca ? linhas[i].style.display = '' : linhas[i].style.display = 'none';
        }
    }
//função que vai inicializar a apliação
const init = () => {
    document.querySelector('.btnSalvar').addEventListener('click', addContato);
    document.querySelector('.btnCancelar').addEventListener('click', cancelaForm);
    document.getElementById('idPesquisa').addEventListener('input', Buscacontato);
    exibeContatos();
}
 
init(); //inicializo a aplicação