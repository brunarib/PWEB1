let token = '';
let formsView = document.querySelector(".forms");
let logoutButton = document.getElementById('logout');
let conta = document.getElementById("minha-conta");
let userConta = document.getElementById("conta-user");

if(document.getElementById("#change-name")){
    let changeName = document.getElementById("#change-name").value;
    let changeEmail = document.getElementById("#change-email").value;
    let changeAddress = document.getElementById("#change-address").value;
    let changeSend = document.getElementById("#change-send")
    let configName = document.getElementById("nome-config");
    let configEmail = document.getElementById("#change-address");
    let configAddress = document.getElementById("#change-address");

    function changeData() {
        event.preventDefault();
        configName.innerHTML = "Nome: " + changeName;
        configEmail.innerHTML = "Email: " + changeEmail;
        configAddress.innerHTML = "Endereço: " + changeAddress;
    }

    changeSend.addEventListener('submit', changeData);

}



if (localStorage.getItem('TOKEN-SESSION')){
   signIn();
   if (window.location.href == "http://localhost:3000/pagina-minha-conta.html" || window.location.href == "http://localhost:3000/index.html" ){
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

