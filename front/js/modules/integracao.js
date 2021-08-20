let token = '';
let formsView = document.querySelector(".forms");
let logoutButton = document.getElementById('logout');
let conta = document.getElementById("minha-conta");
let userConta = document.getElementById("conta-user");
let clienteId = '';




var cliente = {
    "usuario": {
      "id": null,
      "nome": null,
      "login": null,
      "email": null,
      "senha": null
    },
    "endereco": null,
    "id": null
  };

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

   
    
    



if (localStorage.getItem('TOKEN-SESSION')){
   signIn();
   if (window.location.href == "http://localhost:3000/pagina-minha-conta.html" || window.location.href == "http://localhost:3000/pagina-minha-conta-config.html" || window.location.href == "http://localhost:3000/index.html" ){
    userData();
   }
   
}

const logout = () => {
    token = '';
}
function dataGet(url, token){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.send();
    console.log(request.responseText);
    return request.responseText;
}
function userData() {
    let urlServer = "http://localhost:8181/clientes/getCliente";
    let token = localStorage.getItem('TOKEN-SESSION');
    let data = dataGet(urlServer, token);
    let response = JSON.parse(data);

    console.log(response.usuario.adm);
    if(response.usuario.adm){
        conta.href="page-admin.html";
    }

    let loginUser = document.getElementById('login-config');
    let nomeUser = document.getElementById('nome-config');
    let emailUser = document.getElementById('email-config');
    let enderecoUser = document.getElementById('endereco-config');
    
    loginUser.innerHTML = "Login: " +response.usuario.login;
    nomeUser.innerHTML =  "Nome: " + response.usuario.nome;
    emailUser.innerHTML= "Email: " + response.usuario.email;
    enderecoUser.innerHTML= "Endereço: " + response.endereco; 

    cliente.endereco = response.endereco;
    cliente.id= response.id;
    cliente.usuario.id=response.usuario.id;
    cliente.usuario.email=response.usuario.email;
    cliente.usuario.nome=response.usuario.nome;
    cliente.usuario.login=response.usuario.login;
    console.log(cliente);

    

}
function registerPost(url, body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    request.onload = function(){
    token = this.responseText
    localStorage.setItem("TOKEN-SESSION", token);
    }   
    return request.responseText;
}
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
function loginUser(){
    event.preventDefault();
    let url = "http://localhost:8181/login";
    let login =  document.getElementById('login-user').value;
    let senha = document.getElementById('password-login').value;
    localStorage.setItem('LOGIN-SESSION', login);
    localStorage.setItem('SENHA-SESSION', senha);
    let body = {'login' : login,
        'senha' : senha,
    }
    console.log(body);
    registerPost(url, body);

    if(token !== ''){
        if(document.querySelector(".forms")){
            formsView.classList.add("form-disabled");
            signIn()
            window.location.reload(true); 
        }
    }   

   
}

function signIn(){
    if(document.querySelector(".forms")){
        formsView.classList.add('form-disabled');
    }
    conta.classList.add("is-active");
    logoutButton.classList.add("is-active");
    userConta.classList.add("is-active");
    let userSignIn = localStorage.getItem('LOGIN-SESSION');
    let user = document.getElementById('user');
    user.innerHTML = userSignIn;
}

function singOut(){
    localStorage.clear();
    conta.classList.remove("is-active");
    logoutButton.classList.remove("is-active");
    userConta.classList.remove("is-active");
    let user = document.getElementById('user');
    user.innerHTML = "";
    if (document.querySelector(".forms")){
        formsView.classList.add('form-enable');
    }
    window.open("http://localhost:3000/index.html","_self")
}



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

