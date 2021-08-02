let token = '';
let formsView = document.querySelector(".forms");
if(document.querySelector(".forms")){
     
}
let logoutButton = document.getElementById('logout');
let conta = document.getElementById("minha-conta");

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
    let loginServer =  document.getElementById("login-register").value;
    let emailServer = document.getElementById("email-register").value ;
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
        }
    }   
}

if (document.querySelector("#nomeMyInfo")){
    let nomeUser = document.querySelector("#nomeMyInfo");
    console.log(nomeUser.innerHTML);
    nomeUser.innerHTML = "meu nome";
}

function signIn(){
    if(document.querySelector(".forms")){
        formsView.classList.add('form-disabled');
    }
    conta.classList.add("is-active");
    logoutButton.classList.add("is-active");
    let userSignIn = localStorage.getItem('LOGIN-SESSION');
    let user = document.getElementById('user');
    user.innerHTML = userSignIn;      
}

function singOut(){
    localStorage.clear();
    conta.classList.remove("is-active");
    logoutButton.classList.remove("is-active");
    let user = document.getElementById('user');
    user.innerHTML = "";
    if (document.querySelector(".forms")){
        formsView.classList.add('form-enable');
    }
    window.open("http://localhost:3000/index.html","_self")
}

