//CREATE - POST
function registerUser(){
    event.preventDefault();
    let urlServer = "http://localhost:8181/clientes/usuarioCadastro";
    let nomeServer = document.getElementById("name-register").value;
    let loginServer =  document.getElementById("login-register").value;
    let emailServer = document.getElementById("email-register").value;
    let senhaServer = document.getElementById("password-register").value;
    let enderecoServer = document.getElementById("adress-register").value;

    let bodyServer = {"endereco": enderecoServer,
        "usuario": {
        "adm": "false",
        "email": emailServer,
        "login": loginServer,
        "nome": nomeServer,
        "senha": senhaServer,
        }    
    }  
    registerPost(urlServer, bodyServer);
    alert("Usuario Cadastrado!");  

}
//READ - GET
function dataGet(url, token){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.send();
    console.log(request.responseText);
    return request.responseText;
}
//UPDATE - PUT
function changeData() {

    let configName = document.getElementById("nome-config");
    let configEmail = document.getElementById("email-config");
    let configAddress = document.getElementById("endereco-config");

    let changeName = document.getElementById("change-name").value;
    let changeEmail = document.getElementById("change-email").value;
    let changeAddress = document.getElementById("change-address").value;


    configName.innerHTML = "Nome: " + changeName;
    configEmail.innerHTML = "Email: " + changeEmail;
    configAddress.innerHTML = "Endereço: " + changeAddress;

    var data = JSON.stringify({
        "usuario": {
          "id": cliente.usuario.id,
          "nome": changeName,
          "email": changeEmail
        },
        "endereco": changeAddress,
        "id": cliente.id
      });

      let token = localStorage.getItem('TOKEN-SESSION');
const url = `http://localhost:8181/clientes/editar`;
var data = JSON.stringify({
    "usuario": {
      "id": cliente.usuario.id,
      "nome": changeName,
      "email": changeEmail
    },
    "endereco": changeAddress,
    "id": cliente.id
  });

console.log("change"+data);
let request = new XMLHttpRequest();
request.open("PUT", url, false);
request.setRequestHeader("Authorization", "Bearer "+token);
request.setRequestHeader("Content-Type", "application/json");
request.send(data);

console.log("change"+data);
   
}
//DELETE 
function deleteCliente(){
    var data = clienteId;

    let token = localStorage.getItem('TOKEN-SESSION');
    const params = new URLSearchParams({ clienteId: cliente.id});
    const query = params.toString(); // Output: foo=1&bar=2
    const url = `http://localhost:8181/clientes/deletar?${query}`;


    console.log("id:"+clienteId);
    console.log(token);
    let request = new XMLHttpRequest();
    request.open("DELETE", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.send();
    console.log(request.responseText);
    
}
