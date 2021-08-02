let token = '';
let formsView = document.querySelector(".forms");
if(document.querySelector(".forms")){
     
}
let logoutButton = document.getElementById('logout');
let conta = document.getElementById("minha-conta");
let userConta = document.getElementById("conta-user");



if (localStorage.getItem('TOKEN-SESSION')){
   signIn();
   if (window.location.href == "http://localhost:3000/pagina-minha-conta.html"){
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
    return request.responseText;
}
function userData() {
    let urlServer = "http://localhost:8181/clientes/getCliente";
    let token = localStorage.getItem('TOKEN-SESSION');
    let data = dataGet(urlServer, token);
    let response = JSON.parse(data);
    
    let loginUser = document.getElementById('login-client');
    let nomeUser = document.getElementById('nome-client');
    let emailUser = document.getElementById('email-client');
    let enderecoUser = document.getElementById('endereco-client');
    
    loginUser.innerHTML = "Login: " +response.usuario.login;
    nomeUser.innerHTML =  "Nome: " + response.usuario.nome;
    emailUser.innerHTML= "Email: " + response.usuario.email;
    enderecoUser.innerHTML= "Endereço: " + response.endereco; 

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
    console.log(nomeServer);
    let loginServer =  document.getElementById("login-register").value;
    console.log(loginServer);
    let emailServer = document.getElementById("email-register").value;
    console.log(emailServer);
    let senhaServer = document.getElementById("password-register").value;
    console.log(senhaServer);
    let enderecoServer = document.getElementById("adress-register").value;
    console.log(enderecoServer);
  
   
    
   
    

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
    registerPost(url, body);

    if(token !== ''){
        if(document.querySelector(".forms")){
            formsView.classList.add("form-disabled");
            signIn()
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

